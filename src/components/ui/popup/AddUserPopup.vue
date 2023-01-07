<template>
  <div class="overlay" v-if="isShow">
    <div class="add-user-popup">
      <header class="popup__header">
        <div class="header-title">{{ Title.ADD_USER }}</div>
        <base-button
          @click="togglePopup"
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
                    placeholder="Chọn phòng ban"
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
                    placeholder="Chọn vai trò"
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
                    placeholder="Chọn trạng thái"
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
                      { email: Message.INVALID_EMAIL },
                    ]"
                    ref="userField"
                  ></base-input>
                  <base-input
                    v-else-if="field === 'UserCode'"
                    v-model="user[field]"
                    class="mw-120"
                    :isRequired="true"
                    :rules="[{ required: Message.REQUIRED }]"
                    :inputClass="field"
                    ref="userField"
                  ></base-input>
                  <base-input
                    v-else
                    v-model="user[field]"
                    class="mw-200"
                    :isRequired="true"
                    :rules="[{ required: Message.REQUIRED }]"
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
  data() {
    return {
      isShow: false,
      isValid: true,
      focusElement: null,
      Title,
      Message,
      UserColumnAdd,
      UserStatus,
      jobPositions: [],
      departments: [],
      users: [
        {
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentID: "",
          JobPositionID: "",
          Email: "maidailong@gmail.com",
          RoleIDs: [],
          Status: 1,
        },
      ],
      roles: [],
    };
  },
  emits:['addUsers'],
  methods: {
    /**
     * Ẩn hiện popup
     * Author: MDLONG(27/12/2022)
     */
    togglePopup() {
      this.initForm()
      this.isShow = !this.isShow;
    },

    addNewRow() {
      this.users.push({
        UserCode: "",
        UserName: "",
        DepartmentID: "",
        JobPositionID: "",
        Email: "",
        RoleIDs: [],
        Status: 1,
      });
    },

    //event
    initNewRow(e) {
      console.log(e.component.getDataSource());
    },

    async loadData() {
      this.roles = await request.getAllRole();
      this.jobPositions = await request.getAllJobPosition();
      this.departments = await request.getAllDepartment();
    },

    async saveData() {
      this.validate();
      if(this.isValid){
        // let validateResponse = await request.
        let response = await request.addUser(this.users)
        this.$emit('addUsers', response)
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
        for (let field of this.$refs.userField) {
          field.validate();
          let input = field.$el.querySelector("input");
          if(input.type =='hidden'){
            input = field.$el.querySelectorAll("input")[1];
          }
          //lấy ra trường usercode và email
          if (
            field.$el.querySelector(".UserCode") ||
            field.$el.querySelector(".Email")
          ) {
            distinctField.push(field);
          }
          if (!field.isValid) {
            this.isValid = false;
            if (focusFirst) {
              // console.log(input.parentNode.focus())
              input.focus();
              focusFirst = false;
            }
          }
        }
        //nếu không có trường nào để trống mới thực hiện validate trùng
        if (this.isValid) {
          let userCodes = [];
          let emails = [];
          //lấy ra thẻ input của field
          for (let field of distinctField) {
            let userCodeInput = field.$el.querySelector(".UserCode");
            let emailInput = field.$el.querySelector(".Email");

            if (userCodeInput) {
              userCodes.push({
                element: userCodeInput,
                value: userCodeInput.value,
                parent: field,
              });
            }
            if (emailInput) {
              emails.push({
                element: emailInput,
                value: emailInput.value,
                parent: field,
              });
            }
          }

          //validate và lấy ra trường lỗi cần focus
          let validCode = this.checkDuplicate(
            userCodes,
            Message.DUPLICATE_USER_CODE
          );
          let validEmail = this.checkDuplicate(emails, Message.DUPLICATE_EMAIL);
          this.isValid = validCode && validEmail
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra giá trị trùng
     * Author: MDLONG(28/12/2022)
     * @param {*} elements
     * @param {*} message
     */
    checkDuplicate(elements, message) {
      const map = {};
      // đếm giá trị trùng
      for (let element of elements) {
        if (!map[element.value]) {
          map[element.value] = 1;
        } else {
          map[element.value]++;
        }
      }
      let isValid = true;
      let focusElement = null;

      //biến lưu trường muốn focus
      for (let element of elements) {
        if (map[element.value] > 1) {
          element.parent.errorMessage = message;
          element.parent.isValid = false;
          if (!this.focusElement) {
            focusElement = element.element;
          }
          isValid = false;
        }
      }
      focusElement?.focus();
      return isValid;
    },

    getSelected(e, object, field) {
      try {
        object[field] = e.value;
      } catch (error) {
        console.log(error);
      }
    },

    deleteRow(index) {
      this.users = this.users.filter((value, i) => index != i);
      // this.users.splice(index, 1);
    },

    initForm(){
      this.users = [{
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentID: "",
          JobPositionID: "",
          Email: "maidailong@gmail.com",
          RoleIDs: [],
          Status: 1,
        },]
    },

    log(x) {
      console.log(x);
    },
  },
  created() {
    this.loadData();
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
