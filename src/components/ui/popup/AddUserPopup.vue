<template>
  <div class="overlay" v-if="isShow">
    <div class="add-user-popup">
      <header class="popup__header">
        <div class="header-title">{{ Title.ADD_USER }}</div>
        <base-button
          @click="hide"
          buttonClass="btn--round bg-white change-color-btn flex-c-m"
          :components="[{ class: 'icon-24 svg-icon icon-close-2' }]"
        >
        </base-button>
      </header>
      <main class="popup__content flex-1">
        <div class="table-wrapper relative">
          <table>
            <thead>
              <tr>
                <th
                  class="custom-cell table-header"
                  v-for="column in UserColumnAdd"
                  :key="column.id"
                  :width="column.width"
                >
                  {{ column.caption
                  }}<span
                    v-if="column.required"
                    style="color: var(--error-color)"
                    >&nbsp;*</span
                  >
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in users"
                :key="user.id"
                class="user-row"
              >
                <td class="h-70 text-right">{{ index + 1 }}</td>
                <td v-for="field in Object.keys(user)" :key="field">
                  <BaseSelectBox
                    :data-source="departments"
                    value-expr="DepartmentID"
                    display-expr="DepartmentName"
                    width="200"
                    :value="user[field]"
                    @value-changed="getSelected($event, user, field)"
                    :rules="[{ required: Message.REQUIRED }]"
                    v-if="field === 'DepartmentID'"
                    ref="userField"
                  >
                  </BaseSelectBox>
                  <BaseSelectBox
                    v-else-if="field === 'JobPositionID'"
                    :data-source="jobPositions"
                    value-expr="JobPositionID"
                    display-expr="JobPositionName"
                    width="200"
                    :value="user[field]"
                    @value-changed="getSelected($event, user, field)"
                    :rules="[{ required: Message.REQUIRED }]"
                    ref="userField"
                  >
                  </BaseSelectBox>
                  <BaseTagBox
                    v-else-if="field === 'RoleIDs'"
                    :data-source="roles"
                    width="250"
                    value-expr="RoleID"
                    :value="user[field]"
                    display-expr="RoleName"
                    @value-changed="getSelected($event, user, field)"
                    :rules="[{ required: Message.REQUIRED }]"
                    ref="userField"
                  >
                  </BaseTagBox>
                  <BaseSelectBox
                    v-else-if="field === 'Status'"
                    :data-source="UserStatus"
                    width="200"
                    value-expr="VALUE"
                    display-expr="TEXT"
                    :rules="[{ required: Message.REQUIRED }]"
                    @value-changed="getSelected($event, user, field)"
                    ref="userField"
                  ></BaseSelectBox>
                  <base-input
                    v-else-if="field === 'Email'"
                    v-model="user[field]"
                    class="mw-200"
                    :isRequired="true"
                    :inputClass="field"
                    :rules="[
                      { required: Message.REQUIRED },
                      {
                        maxLength: Message.MAX_LENGTH.format(LimitLength.EMAIL),
                        cLength: LimitLength.EMAIL,
                      },
                      { email: Message.INVALID_EMAIL },
                      {
                        duplicated: Message.DUPLICATE_EMAIL,
                        frequency: emailFrequency,
                      },
                    ]"
                    ref="userField"
                  ></base-input>
                  <base-input
                    v-else-if="field === 'UserCode'"
                    v-model="user[field]"
                    class="mw-120"
                    :isRequired="true"
                    :rules="[
                      { required: Message.REQUIRED },
                      {
                        maxLength: Message.MAX_LENGTH.format(
                          LimitLength.USER_CODE
                        ),
                        cLength: LimitLength.USER_CODE,
                      },
                      {
                        duplicated: Message.DUPLICATE_USER_CODE,
                        frequency: userCodeFrequency,
                      },
                    ]"
                    :inputClass="field"
                    ref="userField"
                  ></base-input>
                  <base-input
                    v-else
                    v-model="user[field]"
                    class="mw-200"
                    :isRequired="true"
                    :rules="[
                      { required: Message.REQUIRED },
                      {
                        maxLength: Message.MAX_LENGTH.format(
                          LimitLength.USER_NAME
                        ),
                        cLength: LimitLength.USER_NAME,
                      },
                    ]"
                    ref="userField"
                  ></base-input>
                </td>
                <td class="row-action bg-none">
                  <div class="flex-c-m button-group row-action">
                    <base-button
                      @click="deleteRow(index)"
                      v-if="users.length > 1"
                      buttonClass="btn--round bg-none flex-c-m change-color-btn-dark"
                      :components="[
                        { class: 'icon-24 svg-icon-process icon-delete' },
                      ]"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex-m add-row-wrap">
          <div @click="addNewRow" class="flex-m cur-point">
            <div
              class="icon-24 svg-icon-process icon-plus-blue scale-0.5"
            ></div>
            <div class="mt2">{{ Title.ADD }}</div>
          </div>
        </div>
      </main>
      <footer class="popup__footer">
        <div class="popup-btn-group">
          <base-button
            @click="hide"
            buttonClass="btn--extra mgr-12"
            :components="[{ content: Title.CANCEL }]"
          />
          <base-button
            @click="saveData"
            buttonClass="btn--pri"
            :components="[{ content: Title.SAVE }]"
          />
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Title, UserColumnAdd, UserStatus, Message } from "@/i18n";
import { LimitLength } from "@/enums";
import {
  DxDataGrid,
  DxEditing,
  DxColumn,
  DxLookup,
  DxRequiredRule,
} from "devextreme-vue/data-grid";
import DxTagBox from "devextreme-vue/tag-box";
import DxSelectBox from "devextreme-vue/select-box";
import BaseButton from "../button/BaseButton.vue";
import BaseInput from "../input/BaseInput.vue";
import BaseSelectBox from "../combobox/BaseSelectBox.vue";
import BaseTagBox from "../combobox/BaseTagBox";
import * as request from "@/services";
export default {
  components: {
    BaseButton,
    BaseInput,
    DxDataGrid,
    DxEditing,
    DxColumn,
    DxLookup,
    DxRequiredRule,
    DxSelectBox,
    DxTagBox,
    BaseSelectBox,
    BaseTagBox,
  },
  name: "AddUserPopup",
  props: {},
  computed: {
    userField() {
      return this.$refs.userField;
    },
  },
  data() {
    return {
      isShow: false,
      isValid: true,
      focusFirstCode: true,
      focusElement: null,
      Title,
      Message,
      UserColumnAdd,
      UserStatus,
      LimitLength,
      distinctField: [],
      emailFrequency: {},
      userCodeFrequency: {},
      jobPositions: [],
      departments: [],
      users: [],
      newUserCode: "",
      roles: [],
    };
  },

  emits: ["addUsers"],
  methods: {
    /**
     * ???n hi???n popup
     * Author: MDLONG(27/12/2022)
     */
    togglePopup() {
      this.initForm();
      this.isShow = !this.isShow;
    },

    /**
     * Hi???n popup
     * Author: MDLONG(27/12/2022)
     */
    show() {
      this.initForm();
      this.isShow = true;
    },

    hide() {
      this.isShow = false;
    },

    /**
     * Th??m d??ng m???i
     * Author: MDLONG(27/12/2022)
     */
    addNewRow() {
      const userFieldNum = 7;
      const focusIndex = this.users.length * userFieldNum;
      this.users.push({
        UserCode: this.generateNewUserCode(),
        UserName: "",
        DepartmentID: "",
        JobPositionID: "",
        Email: "",
        RoleIDs: [],
        Status: 1,
      });
      this.focusInput(focusIndex);
    },

    /**
     * load d??? li???u
     * Author: MDLONG(27/12/2022)
     */
    async loadData() {
      this.roles = await request.getAllRole();
      this.jobPositions = await request.getAllJobPosition();
      this.departments = await request.getAllDepartment();
      this.newUserCode = await request.getNewUserCode();
    },

    /**
     * L??u d??? li???u
     * Author: MDLONG(27/12/2022)
     */
    async saveData() {
      this.validate();
      if (this.isValid) {
        let users = this.setRoleNameForUser();
        let response = await request.addUser(users);
        this.$emit("addUsers", response);
      }
    },

    /**
     * Validate form
     * MDLONG(27/12/2022)
     */
    validate() {
      try {
        this.isValid = true;
        let focusFirst = true;
        let distinctField = [];
        let emailFields = [];
        let userCodeFields = [];

        //v???a validate v???a l???y ra c??c tr?????ng kh??ng cho ph??p tr??ng gi?? tr???
        for (let field of this.userField) {
          field.validate();

          //l???y ra tr?????ng usercode v?? email
          if (field.input) {
            // n???u tr?????ng n??o l?? input
            if (this.isUserCodeField(field)) {
              userCodeFields.push(field);
              distinctField.push(field);
            } else if (this.isEmailField(field)) {
              emailFields.push(field);
              distinctField.push(field);
            }
          }

          // focus tr?????ng l???i
          if (!field.isValid) {
            this.isValid = false;
            if (focusFirst) {
              field.focus();
              focusFirst = false;
            }
          }
        }

        //n???u kh??ng c?? tr?????ng n??o ????? tr???ng m???i th???c hi???n validate tr??ng
        if (this.isValid) {
          this.distinctField = distinctField;
          let userCodeFrequency = this.getFrequency(userCodeFields);
          let emailFrequency = this.getFrequency(emailFields);
          for (let field of this.distinctField) {
            if (this.isUserCodeField(field)) {
              field.checkDuplicated(
                Message.DUPLICATE_USER_CODE,
                userCodeFrequency
              );
            } else if (this.isEmailField(field)) {
              field.checkDuplicated(Message.DUPLICATE_EMAIL, emailFrequency);
            }

            if (!field.isValid) {
              this.isValid = false;
              if (focusFirst) {
                // console.log(input.parentNode.focus())
                field.focus();
                focusFirst = false;
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * l???y t???n su???t xu???t hi???n
     * Author: MDLONG(06/01/2022)
     * @param {*} fields 
     */
    getFrequency(fields) {
      const map = {};
      try {
        // ?????m gi?? tr??? tr??ng
        for (let field of fields) {
          if (!map[field.value]) {
            map[field.value] = 1;
          } else {
            map[field.value]++;
          }
        }
      } catch (error) {
        console.log(error);
      }
      return map;
    },

    /**
     * Ki???m tra tr?????ng l?? email
     * @param {*} field
     */
    isEmailField(field) {
      return field.input.classList.contains("Email");
    },

    /**
     * tr?????ng user code
     * @param {*} field 
     */
    isUserCodeField(field) {
      return field.input.classList.contains("UserCode");
    },

    /**
     * g??n gi?? tr??? ???????c ch???n cho tr?????ng
     * Author: MDLONG(27/12/2022)
     */
    getSelected(e, object, field) {
      try {
        object[field] = e.value;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * X??a d??ng
     * Author: MDLONG(27/12/2022)
     * @param {*} index
     */
    deleteRow(index) {
      this.users = this.users.filter((value, i) => index != i);
      // this.users.splice(index, 1);
    },

    /**
     * Kh???i t???o form
     * Author: MDLONG(27/12/2022)
     */
    async initForm() {
      await this.loadData();
      this.users = [
        {
          UserCode: this.newUserCode,
          UserName: "",
          DepartmentID: "",
          JobPositionID: "",
          Email: "",
          RoleIDs: [],
          Status: 1,
        },
      ];
      this.focusInput(0);
      this.emailFrequency = [];
      this.userCodeFrequency = [];
    },

    /**
     * Set t??n vai tr?? cho user
     * Author: MDLONG(10/01/2023)
     */
    setRoleNameForUser() {
      try {
        let users = structuredClone(this.users);
        users.forEach((user) => this.setRoleNames(user));
        return users;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * L???y t??n vai tr??
     * Author: MDLONG(10/01/2023)
     */
    setRoleNames(user) {
      user.RoleNames = this.roles
        .filter((role) => user.RoleIDs.includes(role.RoleID))
        .map((role) => role.RoleName)
        .join("; ");
    },

    /**
     * focus v??o input
     * @param {*} indexOfInput -- v??? tr?? c???a input
     */
    focusInput(indexOfInput) {
      try {
        this.$nextTick(() => this.$refs.userField[indexOfInput].focus());
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sinh code m???i
     */
    generateNewUserCode() {
      let code = +this.newUserCode.replace(/\D/g, "") + 1 + "";
      while (code.length < 4) {
        code = "0" + code;
      }
      this.newUserCode = `NV${code}`
      return this.newUserCode
    },
  },
};
</script>

<style scoped>
@import url(@/css/components/popup.css);

.add-user-popup {
  min-width: 500px;
  max-width: 992px;
  height: calc(100vh - 8px);
  background: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.table-header:not(:first-child):not(:last-child)::before {
  content: "";
  position: absolute;
  top: 30%;
  left: 0;
  background-color: var(--border-color);
  width: 1px;
  height: 20px;
  z-index: 1;
}

table {
  border-collapse: separate;
  border-spacing: 0;
  border: unset;
  width: 100%;
}

table tr td,
th {
  text-align: left;
}

table tr {
  height: 48px;
}

table tbody tr:hover td {
  /* background-color: #F8F8F8; */
  background-color: var(--row-table-bgc) !important;

  cursor: pointer;
}

table tbody tr.selected td {
  background-color: #eef8ec;
}

table th,
table td {
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
}
table th:last-child,
table th:first-child {
  /* background-color: var(--table-h-bgcolor); */
  z-index: 1;
}

table td:last-child,
table td:first-child {
  background-color: var(--white-color);
}

table th:first-child,
table td:first-child {
  position: sticky;
  left: 0px;
  z-index: 1;
}
table th:first-child {
  z-index: 3;
}

table th {
  /* border-right: 1px solid var(--border-color); */
  background-color: var(--primary-background-color);
  z-index: 2;
}

/* table td{
    border-right: 1px dotted var(--border-color);
} */

td:last-child,
th:last-child {
  border-right: none;
}

tr:last-child td {
  border-bottom: none;
}

table thead th {
  position: sticky;
  top: 0px;
}

table tbody tr {
  background-color: #ffffff;
}

.c1 {
  accent-color: #409330;
  outline: none;
  width: 16px;
  height: 16px;
}

.edit-cell {
  height: 64px;
}

.table-wrapper {
  max-height: calc(100vh - var(--header-height) - 140px);
  max-width: 100%;
  overflow: auto;
  background-color: white;
  border-radius: var(--border-radius);
}

.paging {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid var(--border-color);
  background-color: var(--white-color);
  position: sticky;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

.paging__left {
  /* background-color: #CCE4FF; */
}

.paging__right {
  display: flex;
  /* background-color: antiquewhite; */
}

.paging__right > div + div {
  margin-left: 16px;
}

.paging__page-limit {
  display: flex;
  align-items: center;
}

.paging__page-range {
  display: flex;
  align-items: center;
}

.paging__page-button {
  display: flex;
  align-items: center;
}

.paging__page-button button {
  border: unset;
  font-size: 14px;
  padding: 0;
  background-color: var(--white-color);
}

.paging__page-button button + button {
  margin-left: 16px;
}

.paging .combobox {
  margin: 0 16px 0;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.empty-data {
  position: sticky;
  left: 50%;
  padding: 0;
  transform: translate(-50%, -16%);
  background: unset !important;
  height: calc(100vh - var(--header-height) - 200px);
  border: none !important;
}

.add-row-wrap {
  font-weight: 500;
  color: var(--primary-color);
  align-items: center;
  margin-top: 12px;
}
.user-row:hover .button-group {
  visibility: visible;
}

.user-row .button-group {
  min-width: 50px !important;
  width: 50px !important;
}
</style>
