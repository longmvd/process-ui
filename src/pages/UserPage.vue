<template>
  <div class="w-full h-full" id="user-page">
    <div class="page-container">
      <div class="content__header">
        <div class="content__header--left">
          <div class="page-title">{{ Title.USER }}</div>
        </div>
        <div class="content__header--right">
          <base-button
            @click="toggleAddUserPopup"
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
            wrapperClass="table-search mgr-8"
            iconClass="svg-icon icon-search"
            :placeholder="Title.SEARCH_FILTER"
            @update:model-value="doSearch"
          />
          <BaseSelectBox
            wrapperClass="mgr-8 mgl-8"
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
            wrapper-class="mgr-8 mgl-8"
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
            icon-class="svg-icon-process icon-job-position pos-icon"
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
              title="Tùy chỉnh cột"
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
                      :data-source="columns"
                      :noDataText="Title.NO_DATA"
                      :show-selection-controls="true"
                      :repaint-changes-only="true"
                      :selection-mode="selectionMode"
                      :select-all-mode="selectAllMode"
                      v-model:selected-item-keys="selectedColumns"
                      :search-enabled="true"
                      :search-expr="['text']"
                      @item-reordered="onItemReordered"
                      key-expr="id"
                    >
                      <DxItemDragging
                        data="columns"
                        :allow-reordering="true"
                        :on-drag-start="onDragStart"
                      />
                    </DxList>
                  </div>
                </main>
                <footer>
                  <div class="command-wrap">
                    <base-button
                      buttonClass="btn--extra flex-m fw-500 mgr-12 pad-0-8"
                      :components="[{ content: Title.RESTORE_DEFAULT }]"
                    />
                    <base-button
                      @click="getColumn"
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
            :columns="UserColumn"
            :dataSource="users"
            @delete-row="deleteUser"
            @edit-row="editUser"
          />
          <base-loading v-show="isLoading"/>
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
                Từ <span>{{ paging.PageSize }}</span> đến
                <span>{{ paging.TotalRecord }}</span> bản ghi
              </div>
            </div>
            <div class="page-next-preview flex-c-m">
              <base-button
                @click="prePage"
                buttonClass="btn--round bg-none change-color-btn flex-c-m"
                :components="[
                  { class: paging.PageNumber == 1?
                    'icon-24 svg-icon icon-chevron-left disabled':
                    'icon-24 svg-icon icon-chevron-left' },
                ]"
              />
              <base-button
              @click="nextPage"
                buttonClass="btn--round bg-none change-color-btn flex-c-m"
                :components="[{ class: paging.PageNumber == paging.TotalPage?
                  'icon-24 svg-icon icon-chevron-right disabled':
                  'icon-24 svg-icon icon-chevron-right'}]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <add-user-popup ref="addUserPopup" />
  <edit-user-popup ref="editUserPopup" :user="selectedUser" />
  <message-popup ref="messagePopup" />
</template>

<script>
/* eslint-disable */
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { DxPopup, DxPosition } from "devextreme-vue/popup";
import { DxPopover } from "devextreme-vue/popover";
import DxList, { DxItemDragging } from "devextreme-vue/list";
import { DxTagBox } from "devextreme-vue/tag-box";
import { DxSelectBox } from "devextreme-vue/select-box";
// import { DxButton } from 'devextreme-vue/button';
import { Title, UserColumn } from "@/i18n";
import BaseLoading from '@/components/ui/loading/BaseLoading.vue'
import BaseButton from "@/components/ui/button/BaseButton.vue";
import BaseInput from "@/components/ui/input/BaseInput.vue";
import BaseTable from "@/components/ui/table/BaseTable.vue";
import BaseCombobox from "@/components/ui/combobox/BaseCombobox.vue";
import AddUserPopup from "@/components/ui/popup/AddUserPopup.vue";
import MsCheckbox from "@/components/ui/input/MsCheckbox.vue";
import EditUserPopup from "@/components/ui/popup/EditUserPopup.vue";
import MessagePopup from '@/components/ui/popup/MessagePopup.vue';
import BaseSelectBox from "../components/ui/combobox/BaseSelectBox.vue";
import BaseTagBox from "@/components/ui/combobox/BaseTagBox";
import * as request from "@/services";
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
    DxTagBox,
    DxSelectBox,
    BaseCombobox,
    AddUserPopup,
    MsCheckbox,
    BaseSelectBox,
    BaseTagBox,

    // DxButton,
    EditUserPopup,
    MessagePopup,
  },
  data() {
    return {
      Title,
      //state
      isShowTableSetting: false,
      isPageSizeSelectOpened: false,
      isShowAddUserPopup: true,
      isLoading: false,
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
        RoleIDs: [
          "6a9df853-16b5-44d5-97da-0783be03d1d6",
          "98fc2f3e-0757-48b4-9a6f-9bd17bffadb6",
          "2a7de239-e9f3-4922-b75f-8de32b7f37cf",
        ],

        Status: 1,
      },
      selectedColumns: [],

      UserColumn,
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
     * Bật tắt cài đặt bảng
     */
    toggleTableSetting() {
      this.isShowTableSetting = !this.isShowTableSetting;
    },

    showTableSetting() {
      this.isShowTableSetting = true;
    },

    async loadData() {
      this.loadUsers();
      this.loadDepartments();
      this.loadJobPositions();
      this.loadRoles();
    },

    async loadDepartments(){
      this.departments = await request.getAllDepartment();
      this.departments.unshift({
        DepartmentID: "",
        DepartmentName: Title.SELECT_DEPARTMENT,
      });
    },

    async loadRoles(){
      this.roles = await request.getAllRole();
      this.roles.unshift({ RoleID: null, RoleName: Title.ALL });
    },

    async loadUsers(){
      this.isLoading = true
      let data = await request.getUserByFilter(this.paging);
      this.isLoading = false
      this.users = data.Data;
      this.paging.TotalRecord = data.TotalRecord;
      this.paging.TotalPage = data.TotalPage;
    },

    async loadJobPositions(){
      this.jobPositions = await request.getAllJobPosition();
    },

    resizePage(selected){
      this.paging.PageSize = selected.value
      this.paging.PageNumber = 1
      this.loadUsers()
    },

    nextPage(){
      if (this.paging.PageNumber < this.paging.TotalPage) {
        this.paging.PageNumber += 1
        this.loadUsers()
      }
    },

    /**
     * trang kế
     * Author: MDLONG(01/01/2022)
     */
    prePage(){
      if (this.paging.PageNumber > 1) {
        this.paging.PageNumber -= 1
        this.loadUsers()
      }
    },

    doSearch(value) {
      clearTimeout(this.delayTimer);
      this.paging.Filter = value;
      this.paging.PageNumber = 1;
      this.delayTimer = setTimeout(() => {
        this.loadUsers();
      }, 1000);
    },
    /**
     * Ẩn hiện form thêm user
     */
    toggleAddUserPopup() {
      try {
        this.$refs.addUserPopup.togglePopup();
      } catch (error) {
        console.log(error);
      }
    },

    onItemReordered(e) {
      const itemData = e.itemData;
      const itemDomNode = e.itemElement;
      const from = e.fromIndex;
      const to = e.toIndex;
      console.log(e);
      console.log(this.columns);
      // Handler of the "itemReordered" event
    },
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
     * Thay đổi kích thước trang
     * @param {} e
     */
    changePageSize(e) {
      this.pageSize = e.addedItems[0];
      this.isPageSizeSelectOpened = false;
    },

    deleteUser(data) {
      console.log(data);
    },

    editUser(data) {
      this.selectedUser = data;
      console.log(this.$refs.editUserPopup.togglePopup());
      console.log(data);
    },

    valueChanged(e, field) {
      this.paging[field] = e.value;
      this.loadUsers();
    },
  },
  created() {
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
}

.table-search {
  min-width: 260px;
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
