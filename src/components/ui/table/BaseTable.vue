<template>
  <div>
    <DxDataGrid
      :data-source="data"
      :allow-column-resizing="true"
      :show-column-lines="false"
      :show-row-lines="true"
      class="custom-height"
      @cell-prepared="onCellPrepared"
      @row-prepared="onRowPrepared"
      :column-auto-width="true"
      
    >
      <DxColumn
        v-for="(column, index) in columns"
        :key="index"
        class="table-header"
        :min-width="column.minWidth"
        :data-field="column.field"
        :caption="column.caption"
        :cell-template="column.cellTemplate"
        :height="48"
        v-model:visible="column.visible"
        
      />
      <DxScrolling column-rendering-mode="virtual" mode="infinite" />

      <DxPaging :page-size="10" :enabled="false" />

      <template #avatar-cell="{ data }">
        <div class="flex-m">
          <BaseAvatar class="mgr-12" :username="data.displayValue" />
          <div :title="data.displayValue">{{ data.displayValue }}</div>
        </div>
      </template>
      <template #title-tooltip="{ data }">
        <div class="flex-m">
          <div :title="data.displayValue" class="wrap-text">{{ data.displayValue }}</div>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<script>
/* eslint-disable */
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxScrolling,
} from "devextreme-vue/data-grid";
import BaseAvatar from "../avatar/BaseAvatar.vue";
export default {
  name: "BaseTable",
  props: {
    api: String,
  },
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxScrolling,
    BaseAvatar,
  },
  data() {
    return {
      isEmailVisible: false,
      columns: [
        { width: 200, field: "UserID", caption: "ID", cellTemplate:"title-tooltip", visible:true },
        { width: 200, field: "UserCode", caption: "Mã nhân viên", cellTemplate:"title-tooltip", visible:true },
        {
          width: 200,
          field: "UserName",
          caption: "Tên nhân viên",
          cellTemplate: "avatar-cell",
        },
        { width: 200, field: "DepartmentName", caption: "Phòng ban", cellTemplate:"title-tooltip" },
        { width: 200, field: "JobPositionName", caption: "Vị trí", cellTemplate:"title-tooltip" },
        { width: 200, field: "Email", caption: "Email", cellTemplate:"title-tooltip" },
        { width: 200, field: "Roles", caption: "Vai trò", cellTemplate:"title-tooltip" },
      ],
      data: [
        {
          UserID: "1",
          UserCode: "NV0001",
          UserName: "Mai Đại Nghĩa",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "2",
          UserCode: null,
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: undefined,
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "3",
          UserCode: "NV0003",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: null,
          Status: 1,
        },
        {
          UserID: "4",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "5",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "6",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "7",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "8",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "9",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "10",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "11",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "12",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "13",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "14",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "15",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "16",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "17",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "18",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "19",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "20",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "21",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "22",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "23",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "24",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
        {
          UserID: "25",
          UserCode: "NV02342",
          UserName: "Mai Đại Long",
          DepartmentName: "Trung tâm sản xuất",
          JobPositionName: "Kế toán",
          Email: "maidailong@gmail.com",
          Roles: [
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị ứng dụng",
            },
            {
              RoleID: "dnifn-3432dsfs-dsfsf-dsffcf",
              RoleName: "Quản trị hệ thống",
            },
          ],
          Status: 1,
        },
      ],
    };
  },
  methods: {
    /**
     * Lấy dữ liệu từ API
     * Author: MDLONG(25/12/2022)
     */
    loadData() {},

    onCellPrepared(e) {
      console.log(e);
      if (e.rowType === "header") {
        e.cellElement.classList.add("table-header");
      }
      e.cellElement.classList.add("custom-cell");
    },

    onRowPrepared(e) {
      // console.log(e);
      e.rowElement.classList.add("custom-row");
    },
    test(rowData) {
      return `<h1>${rowData.value}</h1>`;
    },
  },
};
</script>

<style>
.h-300 {
  height: 300px;
}

.adaptiveRowStyle {
  background-color: #cce6ff;
  font-size: 12pt;
  padding: 16px;
}

.table-header {
  font-weight: 700;
  letter-spacing: 0.14px;
  color: #171b2a;
  position: relative;
}

.table-header::before {
  content: "";
  position: absolute;
  top: 30%;
  left: 0;
  background-color: var(--border-color);
  width: 1px;
  height: 20px;
  z-index: 1;
}

.custom-cell {
  padding: 0 16px !important;
  height: 48px !important;
  vertical-align: middle !important;
}

.custom-row {
}
.custom-height{
  height: calc(100vh - calc(var(--header-height) + var(--remain-height)))!important;
}

</style>
