<template>
  <div class="w-full h-full" id="user-page">
    <div class="page-container">
      <div class="content__header" id="content-header">
        <div class="content__header--left">
          <div @click="log(tempColumn)" class="page-title">
            {{ Title.USER }}
          </div>
        </div>
        <div class="content__header--right">
          <base-button
            @click="showAddUserPopup"
            buttonClass="btn--pri flex-m pad-left-12 fw-500"
            :components="[
              { class: 'icon-24 svg-icon icon-plus mgr-4' },
              { content: Title.ADD },
            ]"
          />
        </div>
      </div>
      <div class="content__main">
        <div class="table-filter">
          <base-input
            wrapperClass="table-search mgr-12"
            iconClass="svg-icon icon-search"
            :placeholder="Title.SEARCH_FILTER"
            @update:model-value="doSearch"
          />
          <BaseSelectBox
            wrapperClass="mgr-12"
            :placeholder="Title.SELECT_ROLE"
            icon-class="svg-icon-process icon-role-setting-user role-icon"
            display-expr="RoleName"
            valueExpr="RoleID"
            :value="paging.RoleID"
            :data-source="roles"
            :noDataText="Title.NO_DATA"
            selection-mode="single"
            @valueChanged="valueChanged($event, 'RoleID')"
          />

          <BaseTagBox
            width="227"
            wrapper-class="mgr-12"
            :data-source="jobPositions"
            :show-scrollbar="true"
            :show-multi-tag-only="false"
            :noDataText="Title.NO_DATA"
            value-expr="JobPositionID"
            display-expr="JobPositionName"
            :value="paging.JobPositionIDs"
            :placeholder="Title.SELECT_JOBPOSITION"
            icon-class="svg-icon-process icon-job-position pos-icon"
            @valueChanged="valueChanged($event, 'JobPositionIDs')"
          />
          <BaseSelectBox
            width="227"
            icon-class="svg-icon-process icon-organization-control pos-icon"
            :noDataText="Title.NO_DATA"
            :data-source="departments"
            :placeholder="Title.SELECT_DEPARTMENT"
            value-expr="DepartmentID"
            display-expr="DepartmentName"
            :value="paging.DepartmentID"
            @valueChanged="valueChanged($event, 'DepartmentID')"
          />
          <div class="table-setting mgl-auto">
            <base-button
              buttonClass="btn--square bg-white pad-right-0"
              :components="[{ class: 'icon-24 svg-icon icon-setting' }]"
              @click="toggleTableSetting"
            />

            <div id="table-setting-form"></div>
            <DxPopover
              content-template="popup-content"
              :hide-on-outside-click="true"
              :visible="isShowTableSetting"
              :show-title="false"
              title="T??y ch???nh c???t"
              width="316"
              height="auto"
              :resize-enabled="true"
              shading-color="transparent"
            >
              <DxPosition
                of=".table-setting"
                my="bottom"
                at="right bottom"
                offset="5 -40"
              />
              <template #popup-content>
                <header>
                  <div class="setting-header">
                    <div class="setting-title">
                      {{ Title.CUSTOM_COLUMN }}
                    </div>
                    <div class="close">
                      <base-button
                        @click="toggleTableSetting"
                        buttonClass="btn--round bg-white change-color-btn flex-c-m"
                        :components="[
                          { class: 'icon-24 svg-icon icon-close-2' },
                        ]"
                      />
                    </div>
                  </div>
                </header>
                <main>
                  <div class="list-group-wrap list-content">
                    <DxList
                      :data-source="tempColumn"
                      :noDataText="Title.NO_DATA"
                      :repaint-changes-only="true"
                      v-model:selected-item-keys="selectedColumns"
                      :search-enabled="true"
                      :search-expr="['caption']"
                      display-expr="caption"
                      value-expr="visible"
                      key-expr="id"
                      item-template="table-list"
                      placeholder="T??m ki???m"
                      :height="280"
                      ref="SettingColumn"
                    >
                      <DxSearchEditorOptions :placeholder="Title.SEARCH" />

                      <DxItemDragging
                        :on-reorder="onItemReordered"
                        :allow-reordering="true"
                      />
                      <template #table-list="{ data }">
                        <div class="flex-m cur-point">
                          <input
                            type="checkbox"
                            class="c1 mgr-8"
                            :id="'tableColumn-' + data.id"
                            v-model="data.isVisible"
                            :disabled="
                              data.field == 'UserCode' ||
                              data.field == 'UserName'
                            "
                          />
                          <label
                            class="flex-1 mgr-4 cur-point"
                            :for="'tableColumn-' + data.id"
                            ><span class="mgl-12">{{
                              data.caption
                            }}</span></label
                          >
                        </div>
                      </template>
                    </DxList>
                  </div>
                </main>
                <footer>
                  <div class="command-wrap">
                    <base-button
                      @click="restoreColumn"
                      id="get-default"
                      buttonClass="btn--extra flex-m fw-500 mgr-12 pad-0-8"
                      :components="[{ content: Title.RESTORE_DEFAULT }]"
                    />
                    <base-button
                      id="apply-setting"
                      @click="applyNewOrder"
                      buttonClass="btn--pri flex-m fw-500"
                      :components="[{ content: Title.APPLY }]"
                    />
                  </div>
                </footer>
              </template>
            </DxPopover>
          </div>
        </div>
        <div id="user-table">
          <base-table
            :columns="userColumn"
            :dataSource="users"
            @delete-row="handleDeleteUser"
            @edit-row="handleEditUser"
          />
          <base-loading v-show="isLoading" />
        </div>
        <div class="paging">
          <div class="paging-navigation">
            <div class="page-total flex">
              {{ Title.PAGE_TOTAL }}
              <b style="padding: 0px 6px">{{ paging.TotalRecord }}</b>
            </div>
            <div class="page-size-selector flex">
              <base-combobox
                :config="pageSizeOptionConfig"
                @onSelect="resizePage"
              ></base-combobox>
              <div class="page-info">
                T???
                <span
                  ><b>{{ startFrom }}</b></span
                >
                ?????n
                <span
                  ><b>{{ endAt }}</b></span
                >
                b???n ghi
              </div>
            </div>
            <div class="page-next-preview flex-c-m">
              <base-button
                @click="prePage"
                buttonClass="btn--round bg-none change-color-btn flex-c-m"
                :components="[
                  {
                    class:
                      paging.PageNumber == 1
                        ? 'icon-24 svg-icon icon-chevron-left disabled'
                        : 'icon-24 svg-icon icon-chevron-left',
                  },
                ]"
              />
              <base-button
                @click="nextPage"
                buttonClass="btn--round bg-none change-color-btn flex-c-m"
                :components="[
                  {
                    class:
                      paging.PageNumber == paging.TotalPage
                        ? 'icon-24 svg-icon icon-chevron-right disabled'
                        : 'icon-24 svg-icon icon-chevron-right',
                  },
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <add-user-popup ref="addUserPopup" @addUsers="handleAddUsers" />
  <edit-user-popup ref="editUserPopup" />
  <message-popup ref="messagePopup" />
  <DxToast
    ref="toast"
    v-model:visible="message.visible"
    width="auto"
    min-width="200"
    :height="42"
    :type="message.type"
    :message="message.text"
  >
    <DxPosition my="top" at="top" of="#content-header" />
  </DxToast>
</template>

<script>
/* eslint-disable */
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { DxPopup, DxPosition } from "devextreme-vue/popup";
import { DxPopover } from "devextreme-vue/popover";
import DxList, {
  DxItemDragging,
  DxItem,
  DxSearchEditorOptions,
} from "devextreme-vue/list";
import { DxTagBox } from "devextreme-vue/tag-box";
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxToast } from "devextreme-vue/toast";
import { Message, Title, UserColumn } from "@/i18n";
import BaseLoading from "@/components/ui/loading/BaseLoading.vue";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import BaseInput from "@/components/ui/input/BaseInput.vue";
import BaseTable from "@/components/ui/table/BaseTable.vue";
import BaseCombobox from "@/components/ui/combobox/BaseCombobox.vue";
import AddUserPopup from "@/components/ui/popup/AddUserPopup.vue";
import EditUserPopup from "@/components/ui/popup/EditUserPopup.vue";
import MessagePopup from "@/components/ui/popup/MessagePopup.vue";
import BaseSelectBox from "../components/ui/combobox/BaseSelectBox.vue";
import BaseTagBox from "@/components/ui/combobox/BaseTagBox";
import * as request from "@/services";
import { ErrorCode, State, Status, StatusCode } from "@/enums";
export default {
  name: "UserPage",
  components: {
    BaseLoading,
    BaseButton,
    BaseInput,
    BaseTable,
    DxDropDownBox,
    DxPopup,
    DxPopover,
    DxPosition,
    DxList,
    DxItemDragging,
    DxItem,
    DxSearchEditorOptions,
    DxTagBox,
    DxSelectBox,
    DxToast,
    BaseCombobox,
    AddUserPopup,
    BaseSelectBox,
    BaseTagBox,

    // DxButton,
    EditUserPopup,
    MessagePopup,
  },
  computed: {
    /**
     * B???t ?????u t???
     * Author: MDLONG(02/01/2023)
     */
    startFrom() {
      try {
        return this.users?.length == 0
          ? 0
          : (this.paging.PageNumber - 1) * this.paging.PageSize + 1;
      } catch (error) {
        console.log(error);
        return 0;
      }
    },

    /**
     * K???t th??c t???i
     * Author: MDLONG(02/01/2023)
     */
    endAt() {
      try {
        return this.paging.PageNumber * this.paging.PageSize >
          this.paging.TotalRecord
          ? this.paging.TotalRecord
          : this.paging.PageNumber * this.paging.PageSize;
      } catch (error) {
        console.log(error);
        return 0;
      }
    },

    SettingColumn() {
      return this.$refs.SettingColumn.instance;
    },
  },

  data() {
    return {
      Title,
      //state
      isShowTableSetting: false,
      isPageSizeSelectOpened: false,
      isShowAddUserPopup: true,
      isLoading: false,
      timeOutLoading: null,

      message: {
        visible: false,
        type: "success",
        text: "Th??nh c??ng",
      },

      users: [],
      jobPositions: [],
      roles: [],
      departments: [],
      // data
      selectedUser: {
        UserCode: "",
        UserName: "",
        DepartmentID: "",
        DepartmentName: "",
        JobPositionName: "",
        JobPositionID: "",
        Email: "",
        RoleIDs: [],

        Status: 1,
      },
      selectedColumns: [],
      userColumn: null,
      tempColumn: null,
      defaultColumn: null,
      paging: {
        PageSize: 15,
        PageNumber: 1,
        TotalRecord: 0,
        TotalPage: 0,
        Filter: "",
        JobPositionIDs: null,
        DepartmentID: "",
        RoleID: "",
        Desc: true,
      },

      conditionQueries: [],

      pageSizeOptionConfig: {
        id: "paging",
        name: "paging",
        comboboxClass: "hover-white-color",
        inputType: "text",
        disabled: "",
        tempSelectedIDs: [],
        options: [
          { id: 1, value: 15 },
          { id: 2, value: 25 },
          { id: 3, value: 50 },
          { id: 4, value: 100 },
        ],
        defaultKey: "value",
        defaultValue: 15,
        optionClass: "combobox__option max-height-200 combobox__option-paging",
        width: "76px",
      },
    };
  },

  methods: {
    /**
     * B???t t???t c??i ?????t b???ng
     */
    toggleTableSetting() {
      this.isShowTableSetting = !this.isShowTableSetting;
    },

    /**
     * Hi???n th??? tab setting
     */
    showTableSetting() {
      this.isShowTableSetting = true;
    },

    /**
     * L???y d??? li???u t??? api
     * Author: MDLONG(01/01/2022)
     */
    async loadData() {
      this.loadUsers();
      this.loadDepartments();
      this.loadJobPositions();
      this.loadRoles();
    },

    /**
     * L???y ph??ng ban t??? api
     * Author: MDLONG(01/01/2022)
     */
    async loadDepartments() {
      try {
        this.departments = await request.getAllDepartment();
        this.departments?.unshift({
          DepartmentID: null,
          DepartmentName: Title.SELECT_DEPARTMENT,
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * L???y vai tr?? t??? api
     * Author: MDLONG(01/01/2022)
     */
    async loadRoles(setDefault = true) {
      try {
        this.roles = await request.getAllRole();
        if (setDefault)
          this.roles?.unshift({ RoleID: null, RoleName: Title.ALL });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Load user t??? api
     * Author: MDLONG(02/01/2022)
     */
    async loadUsers(option) {
      try {
        this.isLoading = true;
        let sendObject;
        if (option) {
          sendObject = this.standardizeFilter(option);
        } else {
          sendObject = this.standardizeFilter(this.paging);
        }
        let data = await request.getUserByFilter(sendObject);
        this.isLoading = false;
        //X??? l?? ???n loading

        this.users = data?.Data;
        this.paging.TotalRecord = data?.TotalRecord;
        this.paging.TotalPage = data?.TotalPage;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * L???y v??? tr?? t??? api
     * Author: MDLONG(01/01/2022)
     */
    async loadJobPositions() {
      this.jobPositions = await request.getAllJobPosition();
    },

    /**
     * ?????t l???i k??ch th?????c trang
     * Author: MDLONG(01/01/2022)
     */
    resizePage(selected) {
      this.paging.PageSize = selected.value;
      this.paging.PageNumber = 1;
      this.loadUsers();
    },

    /**
     * Trang k???
     * Author: MDLONG(01/01/2022)
     */
    nextPage() {
      if (this.paging.PageNumber < this.paging.TotalPage) {
        this.paging.PageNumber += 1;
        this.loadUsers();
      }
    },

    /**
     * Trang tr?????c
     * Author: MDLONG(01/01/2022)
     */
    prePage() {
      if (this.paging.PageNumber > 1) {
        this.paging.PageNumber -= 1;
        this.loadUsers();
      }
    },

    /**
     * T??m ki???m
     * Author:MDLONG(04/01/2023)
     * @param {*} value
     */
    doSearch(value) {
      if (value != undefined) {
        clearTimeout(this.delayTimer);
        this.paging.Filter = value;
        this.paging.PageNumber = 1;
        this.delayTimer = setTimeout(() => {
          this.loadUsers();
        }, 1000);
      }
    },
    /**
     * ???n hi???n form th??m user
     */
    showAddUserPopup() {
      try {
        this.$refs.addUserPopup.show();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * L???y c???t
     * Author: MDLONG(01/01/2022)
     */
    getColumn() {
      console.log(this.selectedColumns);
      console.log(this.columns);
    },
    /**
     *
     * @param {*} event
     */
    setPosition(event) {
      this.toggleTableSetting();
      this.target = event;
    },
    /**
     * Thay ?????i k??ch th?????c trang
     * @param {} e
     */
    changePageSize(e) {
      this.pageSize = e.addedItems[0];
      this.isPageSizeSelectOpened = false;
    },

    /**
     * X??? l?? x??a ng?????i d??ng
     * Author: MDLONG(06/01/2023)
     * @param {Object} user
     */
    async handleDeleteUser(user) {
      try {
        this.displayDeleteMessage(user);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * X??? l?? s???a ng?????i d??ng
     * Author: MDLONG(02/01/2022)
     * @param {*} user
     */
    async handleEditUser(user) {
      try {
        let popup = this.$refs.editUserPopup;
        this.selectedUser = await request.getUserByID(user);
        popup.setUser(this.selectedUser);
        popup.show();
        popup.saveData = this.editUser(this.selectedUser, popup);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * X??? l?? response khi th??m m???i user
     * Author: MDLONG(03/01/2023)
     * @param {*} response
     */
    handleAddUsers(response) {
      try {
        let status = response?.status;
        let data = response?.data;
        let messagePopup = this.$refs.messagePopup;
        let addUserPopup = this.$refs.addUserPopup;
        switch (status) {
          case StatusCode.CREATED:
            addUserPopup.hide();
            this.showMessage({
              type: "success",
              text: Message.ADD_SUCCESS.format(data),
            });
            this.loadUsers({
              ...this.paging,
              SortColumn: "CreatedDate",
            });
            break;
          case StatusCode.BAD_REQUEST:
            handleAddUserBadRequest(data, messagePopup, addUserPopup);
            break;
          case StatusCode.SERVER_INTERNAL_ERROR:
            messagePopup.show({
              title: Message.ADD_FAILED,
              content: Message.SERVER_ERROR,
              primaryButton: {
                title: Title.CLOSE,
                class: " ",
                action: messagePopup.hide,
              },
              extraButton: {
                isShow: false,
              },
            });
            addUserPopup.togglePopup();
            break;
        }
      } catch (error) {
        console.log(error);
      }

      /**
       * X??? l?? badRequest th??m user
       * @param {*} data
       * @param {*} messagePopup
       */
      function handleAddUserBadRequest(data, messagePopup, addUserPopup) {
        let error = data;
        let errorCode = error.ErrorCode;
        let message = error.UserMsg;
        let moreInfo = error.MoreInfo;
        switch (errorCode) {
          case ErrorCode.Duplicated:
            let dupCode = moreInfo?.UserCode?.join(", ");
            let dupEmail = moreInfo?.Email?.join(", ");

            let dupCodeMsg = dupCode
              ? `- ${Title.DUPLICATED_USER_CODE}${dupCode}<br>`
              : "";
            let dupEmailMsg = dupEmail
              ? `- ${Title.DUPLICATED_EMAIL}${dupEmail}`
              : "";
            let errMessage =
              `${Message.DETAILS}<br>` + dupCodeMsg + dupEmailMsg;

            messagePopup.show({
              title: message,
              content: errMessage,
              primaryButton: {
                title: Title.CLOSE,
                class: " ",
                action: handleErrorInput(
                  moreInfo.UserCode || [],
                  moreInfo.Email || [],
                  addUserPopup.distinctField,
                  messagePopup
                ),
              },
              extraButton: {
                isShow: false,
              },
            });
            break;
          case ErrorCode.Failed:
            addUserPopup.hide();
            messagePopup.show({
              title: message,
              content: Message.TRY_AGAIN,
              primaryButton: {
                title: Title.CLOSE,
                class: " ",
                action: messagePopup.hide,
              },
              extraButton: {
                isShow: false,
              },
            });
            break;
        }
      }

      /**
       * X??? l?? ?? l???i
       * Author: MDLONG(04/01/2023)
       */
      function handleErrorInput(
        duplicatedUserCode,
        duplicatedEmail,
        fields,
        popup
      ) {
        return () => {
          try {
            popup.hide();
            let duplicatedValue = [...duplicatedUserCode, ...duplicatedEmail];
            let userCodeFrequency = {};
            let emailFrequency = {};
            let focusFirst = true;
            //g??n cho t???n su???t usercode v?? email ?????u = 2
            for (let value of duplicatedUserCode) {
              userCodeFrequency[value] = 2;
            }

            for (let value of duplicatedEmail) {
              emailFrequency[value] = 2;
            }

            for (let field of fields) {
              // n???u c??c tr?????ng input ch???a gi?? tr??? b??? tr??ng th?? g???i h??m checkDuplicated
              if (duplicatedValue.includes(field.value)) {
                if (field.input.classList.contains("UserCode")) {
                  field.checkDuplicated(
                    Message.DUPLICATE_USER_CODE,
                    userCodeFrequency
                  );
                } else if (field.input.classList.contains("Email")) {
                  field.checkDuplicated(
                    Message.DUPLICATE_EMAIL,
                    emailFrequency
                  );
                }
                if (!field.isValid) {
                  if (focusFirst) {
                    field.focus();
                    focusFirst = false;
                  }
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
      }
    },

    /**
     * x??? l?? s??? ki???n thay ?????i d??? li???u c???a combobox
     * Author: MDLONG(02/01/2022)
     * @param {*} e
     * @param {*} field
     */
    valueChanged(e, field) {
      this.paging.PageNumber = 1;
      this.paging[field] = e.value;
      this.loadUsers();
    },

    /**
     * Hi???n th??? message h???i tr?????c khi x??a
     * Author: MDLONG(01/01/2022)
     */
    displayDeleteMessage(user) {
      let popup = this.$refs.messagePopup;
      popup.show({
        title: Title.DELETE,
        content: Title.DELETE_QUESTION.format(user.UserName),
        primaryButton: {
          title: Title.DELETE,
          class: "red",
          action: this.deleteUser(user, popup),
        },
        extraButton: {
          isShow: true,
          action: popup.hide,
        },
      });
    },

    /**
     * X??a user
     * Author: MDLONG(01/01/2022)
     * @param {*} user
     * @param {*} popup
     */
    deleteUser(user, popup) {
      return async () => {
        try {
          popup.togglePopup();
          let response = await request.deleteUser(user);
          let status = response.status;
          this.handleStatusResponse(status, 'DELETE');
          await this.loadUsers();
          if (this.users.length == 0) {
            if (this.paging.PageNumber != 1) {
              this.paging.PageNumber = 1;
              this.loadUsers();
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
    },

    /**
     * S???a user
     * Author: MDLONG(01/01/2022)
     * @param {*} user
     * @param {*} popup
     */
    editUser(user, popup) {
      return async () => {
        try {
          if (!popup.disabled) {
            this.updateUserRole(popup.selectedRoleIDs);
            let response = await request.editUser(user);
            let status = response.status;
            this.handleStatusResponse(status, 'EDIT');
            popup.togglePopup();
            this.loadUsers();
          }
        } catch (error) {
          console.log(error);
        }
      };
    },

    /**
     * X??? l?? hi???n th??? message khi nh???n response
     * Author: MDLONG(04/01/2023)
     * @param {*} status
     */
    handleStatusResponse(status, mode) {
      switch (status) {
        case StatusCode.OK:
          this.showMessage({ type: "success", text: Message[`${mode}_SUCCESS`]});
          break;
        case StatusCode.BAD_REQUEST:
          this.showMessage({ type: "error", text: Message[`${mode}_FAILED`] });
          break;
        case StatusCode.SERVER_INTERNAL_ERROR:
          this.showMessage({ type: "error", text: Message.SERVER_ERROR });
          break;
      }
    },

    /**
     * Hi???n th??? message
     * MDLONG(04/01/2023)
     * @param {*} option
     */
    showMessage(option) {
      let message = this.message;
      message.type = option.type;
      message.text = option.text;
      message.visible = true;
    },

    /**
     * C???p nh???t vai tr?? user
     * Author: MDLONG(04/01/2023)
     * @param {*} selectedRoleIDs
     */
    updateUserRole(selectedRoleIDs) {
      try {
        let userRoles = this.selectedUser?.Roles;
        let oldRoleIDs = this.selectedUser?.Roles.map((role) => role.RoleID);
        let newRoleIDs = selectedRoleIDs;
        for (let role of userRoles) {
          //n???u danh s??ch role id m???i ch???a role id c???a th?? kh??ng l??m g??
          if (newRoleIDs.includes(role.RoleID)) {
            if (!role.IsNew) {
              role.State = State.NoAction;
            } else {
              role.State = State.Add;
            }
          } else {
            // n???u danh s??ch m???i kh??ng ch???a role c?? th?? c???n x??a
            if (!role.IsNew) {
              role.State = State.Delete;
            } else {
              //n???u role c?? kh??ng ch???a t??n l?? nh???ng role ???????c th??m v??o tr??n giao di???n ko c?? trong db n??n kh??ng c???n x??t
              role.State = State.NoAction;
            }
          }
        }
        for (let roleID of newRoleIDs) {
          //n???u id role m???i kh??ng c?? trong danh s??ch role c?? th?? th??m v??o danh s??ch role c??
          let userRole = this.getRoleByID(this.roles, roleID);
          if (!oldRoleIDs.includes(roleID)) {
            userRoles.push({
              RoleID: roleID,
              RoleName: userRole?.RoleName,
              State: State.Add,
              IsNew: true,
            });
          } else {
            //n???u ch???a
            if (userRole.IsNew) {
              userRole.State = State.Add;
            }
          }
        }
        this.setRoleNames(this.selectedUser);
        // console.log(this.selectedUser)
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * L???y vai tr?? theo id
     * Author:MDLONG(01/01/2023)
     * @param {Object} user
     * @param {*} RoleID
     */
    getRoleByID(roles, RoleID) {
      for (let role of roles) {
        if (role.RoleID == RoleID) {
          return role;
        }
      }
      return null;
    },

    /**
     * Set t??n vai tr??
     * @param {*} user
     */
    setRoleNames(user) {
      user.RoleNames = user.Roles.filter(
        (role) => role.State == State.Add || (role.State == 0 && !role.IsNew)
      )
        .map((role) => role.RoleName)
        .join("; ");
    },

    /**
     * ??p d???ng c???t m???i
     */
    applyNewOrder() {
      this.userColumn = structuredClone(this.tempColumn);
      this.saveToLocal("userColumn", this.userColumn);
    },

    restoreColumn() {
      this.tempColumn = structuredClone(this.defaultColumn);
      this.SettingColumn.reload();
      this.applyNewOrder();
    },

    /**
     * L???y th??ng tin c???t t??? local storage
     * Author: MDLONG(06/01/2023)
     */
    getUserColumn() {
      let userColumn = this.getObjectFromLocal("userColumn");
      if (!userColumn) {
        this.saveToLocal("userColumn", UserColumn);
        this.getUserColumn();
      }
      this.userColumn = userColumn;
      this.tempColumn = structuredClone(userColumn);
    },

    /**
     * Kh??i ph???c m???c ?????nh
     */
    getDefaultColumn() {
      const defaultColumn = localStorage.getItem("defaultColumn");
      if (defaultColumn) {
        this.defaultColumn = JSON.parse(defaultColumn);
      } else {
        this.saveToLocal("defaultColumn", UserColumn);
        this.getDefaultColumn();
      }
    },

    /**
     * L??u ?????i t?????ng v??o local storage
     * @param {String} name
     * @param {Object} object
     */
    saveToLocal(name, object) {
      localStorage.setItem(name, JSON.stringify(object));
    },

    /**
     * L???y ?????i t?????ng t??? local storage
     * @param {String} name
     * @param {Object} object
     */
    getObjectFromLocal(name) {
      const stringObj = localStorage.getItem(name);
      let localObj = null;
      if (stringObj) {
        localObj = JSON.parse(stringObj);
      }
      return localObj;
    },

    /**
     * X??? l?? thay ?????i c???t
     * @param {*} e 
     */
    onItemReordered(e) {
      if (
        e.fromIndex === 0 ||
        e.fromIndex === 1 ||
        e.toIndex === 0 ||
        e.toIndex === 1
      ) {
        return;
      } else {
        this.reorderColumn(e);
        this.SettingColumn.reload();
      }
    },
    /**
     * Thay ?????i th??? t??? c???t
     * @param {*} e
     */
    reorderColumn(e) {
      try {
        // l??u l???i c???t c???n di chuy???n
        let moveColumn = this.tempColumn[e.fromIndex];
        //x??a c???t mu???n di chuy???n ra kh???i m???ng
        this.tempColumn.splice(e.fromIndex, 1);
        //th??m c???t l???i v??o m???ng ??? v??? tr?? c???n
        this.tempColumn.splice(e.toIndex, 0, moveColumn);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Chu???n h??a d??? li???u g???i l??n server
     * Author: MDLONG(11/01/2022)
     * @param {*} paging
     */
    standardizeFilter(paging) {
      try {
        let sendObject = {
          PageNumber: paging.PageNumber,
          PageSize: paging.PageSize,
          SortColumn: paging.SortColumn,
          Desc: paging.Desc,
        };
        let conditionQueries = [];
        for (let [key, value] of Object.entries(paging)) {
          if (value) {
            switch (key) {
              case "Filter":
                conditionQueries.push({
                  Relationship: "AND",
                  SubQuery: [
                    {
                      Relationship: "",
                      Column: "UserCode",
                      Operator: "LIKE",
                      Value: value,
                      SubQuery: null,
                    },
                    {
                      Relationship: "OR",
                      Column: "UserName",
                      Operator: "LIKE",
                      Value: value,
                      SubQuery: null,
                    },
                    {
                      Relationship: "OR",
                      Column: "Email",
                      Operator: "LIKE",
                      Value: value,
                      SubQuery: null,
                    },
                    {
                      Relationship: "OR",
                      Column: "RoleNames",
                      Operator: "LIKE",
                      Value: value,
                      SubQuery: null,
                    },
                  ],
                });
                break;
              case "DepartmentID":
                conditionQueries.push({
                  Relationship: "AND",
                  Column: "d.DepartmentID",
                  Operator: "=",
                  Value: value,
                  SubQuery: null,
                });
                break;
              case "JobPositionIDs":
                conditionQueries.push({
                  Relationship: "AND",
                  Column: "j.JobPositionID",
                  Operator: "IN",
                  Value: value.join(","),
                  SubQuery: null,
                });
                break;
              case "RoleID":
                conditionQueries.push({
                  Relationship: "AND",
                  Column: "r.RoleID",
                  Operator: "=",
                  Value: value,
                  SubQuery: null,
                });
                break;
            }
          }
        }

        return {
          ...sendObject,
          conditionQueries,
        };
      } catch (error) {
        console.log(error);
      }
    },

    log() {
      console.log(this.tempColumn);
    },
  },

  created() {
    this.getUserColumn();
    this.getDefaultColumn();
    this.loadData();
  },
};
</script>

<style>
.content__header {
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-title {
  font-weight: 700;
  font-size: 20px;
}
.content__main {
  background: var(--white-color);
  overflow: auto;
  border-radius: var(--border-radius);
}
.table-filter {
  min-height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.table-search {
  min-width: 240px;
}

#user-table {
  overflow: hidden;
  position: relative;
}

.page-container .paging {
  border-top: none;
  padding: 10px 0 !important;
  height: 56px;
  z-index: 1;
  position: relative;
  margin: 0 10px 8px 10px;
  background-color: #f9fafc !important;
}

.paging-navigation {
  display: flex;
  color: var(--text-color);
}

.page-total {
  flex: 1;
  line-height: 40px;
  margin-left: 16px;
}
.page-size-selector {
  display: flex;
  align-items: center;
}

.select-size-dropdown {
  width: 50px;
  height: 40px;
}
.page-info {
  height: 40px;
  line-height: 40px;
  padding: 0 24px;
}
.page-next-preview {
  width: 70px;
  height: 40px;
  display: flex;
  margin-right: 16px;
}

.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 12px;
}

.list-group-wrap .dx-list {
  border: none;
  padding: 0 16px 12px;
}

.setting-title {
  font-weight: 700;
  font-size: 18px;
}
.table-setting {
  position: relative;
}

#table-setting-form {
}

#table-setting-popup {
  position: absolute;
}

.command-wrap {
  display: flex;
  justify-content: flex-end;
  background: #f1f5f9;
  align-items: center;
  min-height: 60px;
  height: 60px;
  padding: 12px 20px 12px 0;
  border-radius: 0 0 4px 4px;
}

.list-group-wrap {
  padding-left: 16px;
  border-bottom: 1px solid var(--border-color);
  height: 100px;
}

.role-select {
  padding-left: 34px;
}

.pos-icon {
  position: absolute;
  top: 46%;
  transform: translateY(-50%);
  left: 8px;
  z-index: 1;
}

.role-icon {
  position: absolute;
  top: 49%;
  transform: translateY(-50%);
  left: 8px;
  z-index: 1;
}
/*
  dx
*/
.dx-list .dx-empty-message,
.dx-list-item {
  border-top: none;
  color: #333;
}

.dx-popover-arrow {
  display: none;
}

.dx-datagrid-content .dx-datagrid-table {
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  max-width: 10px;
}

.dx-list-item-after-bag.dx-list-reorder-handle-container:nth-child(3) {
  visibility: hidden;
}
.dx-item:nth-child(1) .dx-list-item-after-bag.dx-list-reorder-handle-container,
.dx-item:nth-child(2) .dx-list-item-after-bag.dx-list-reorder-handle-container {
  visibility: hidden;
}
.list-group-wrap {
  padding-left: 0px;
}

@media only screen and (max-height: 768px) {
  .list-content {
    height: 250px;
  }
}
@media only screen and (max-height: 1080px) {
  .list-content {
    height: calc(100% - 168px);
  }
}
</style>
