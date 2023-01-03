<template>
  <div>
    <DxDataGrid
      :data-source="dataSource"
      :allow-column-resizing="true"
      :show-column-lines="false"
      :show-row-lines="true"
      class="custom-height"
      @cell-prepared="onCellPrepared"
      @row-prepared="onRowPrepared"
      :hover-state-enabled="true"
      :column-auto-width="true"
    >
      <DxColumn
        v-for="(column, index) in columns"
        :key="index"
        :min-width="column.minWidth"
        :data-field="column.field"
        :caption="column.caption"
        :cell-template="column.cellTemplate"
        :height="48"
        v-model:visible="column.visible"
      />
      <DxColumn class="row-action" :width="96" cell-template="button-group">
      </DxColumn>

      <DxScrolling column-rendering-mode="virtual" mode="infinite" />

      <DxPaging :page-size="10" :enabled="false" />

      <template #button-group="{data}">
        <div class="flex-m button-group">
          <base-button
            @click="editRow(data)"
            buttonClass="btn--round bg-none flex-c-m change-color-btn-dark"
            :components="[{ class: 'icon-24 icon-pencil' }]"
          />
          <base-button
            @click="deleteRow(data)"
            buttonClass="btn--round bg-none flex-c-m change-color-btn-dark"
            :components="[{ class: 'icon-24 svg-icon-process icon-delete' }]"
          />
        </div>
      </template>
      <template #avatar-cell="{ data }">
        <div class="flex-m">
          <BaseAvatar class="mgr-12" :username="data.displayValue" />
          <div :title="data.displayValue">{{ data.displayValue }}</div>
        </div>
      </template>
      <template #title-tooltip="{ data }">
        <div class="flex-m">
          <div :title="data.displayValue" class="wrap-text">
            {{ data.displayValue }}
          </div>
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
  DxButton,
  DxScrolling,
  DxColumnChooser,
} from "devextreme-vue/data-grid";
import BaseAvatar from "../avatar/BaseAvatar.vue";
import BaseButton from "../button/BaseButton.vue";
export default {
  name: "BaseTable",
  props: {
    api: String,
    columns: Array,
    dataSource: Array,
  },
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxScrolling,
    BaseAvatar,
    BaseButton,
    DxColumnChooser,
    DxButton,
  },
  emits:["deleteRow", "editRow"],
  data() {
    return {
      isEmailVisible: false,
      
    };
  },
  methods: {
    /**
     * Lấy dữ liệu từ API
     * Author: MDLONG(25/12/2022)
     */
    loadData() {},

    onCellPrepared(e) {
      if (e.rowType === "header") {
        e.cellElement.classList.add("table-header");
      }
      e.cellElement.classList.add("custom-cell");
      if (e.columnIndex === e?.row?.cells?.length - 1) {
        e.cellElement.classList.add("row-action");
      }
    },

    onRowPrepared(e) {
      e.rowElement.classList.add("custom-row");
      // e.cells[e.cells.length - 1].classList.add("row-action")
    },

    editRow(data){
      this.$emit("editRow", data.data)
      // console.log(data.data)
    },
    
    deleteRow(data){
      this.$emit("deleteRow", data.data)
      // console.log(data.data)
    },

    log(data) {
      console.log(data)
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

/* dx */

.dx-datagrid-table
  .dx-data-row.dx-state-hover:not(.dx-selection):not(.dx-row-inserted):not(
    .dx-row-removed
  ):not(.dx-edit-row):not(.dx-row-focused)
  > td:not(.dx-focused) {
  background-color: var(--row-table-bgc);
  color: #333;
}

tr.custom-row.dx-data-row.dx-row.dx-row-lines.dx-state-hover {
  background-color: var(--row-table-bgc);
}

.grid-container .dx-data-row.dx-state-hover > td {
  cursor: pointer;
  background-color: var(--row-table-bgc) !important;
}

.custom-cell {
  padding: 0 16px !important;
  height: 48px !important;
  vertical-align: middle !important;
}

.custom-row:hover {
}
.custom-height {
  height: calc(
    100vh - calc(var(--header-height) + var(--remain-height))
  ) !important;
}

.dx-data-row:hover .button-group {
  visibility: visible;
  background-color: var(--row-table-bgc);
}

.row-action {
  position: sticky;
  right: 0;
}

.button-group {
  height: 100%;
  width: 100%;
  visibility: hidden;
}
</style>
