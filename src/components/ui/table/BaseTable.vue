<template>
  <div>
    <DxDataGrid
      :data-source="dataSource"
      :allow-column-resizing="true"
      :show-column-lines="false"
      :no-data-text="Title.NO_DATA"
      :show-row-lines="true"
      class="custom-height"
      @cell-prepared="onCellPrepared"
      @row-prepared="onRowPrepared"
      :hover-state-enabled="true"
      :column-auto-width="true"
      :onCellClick="onCellClick"
      :loadPanel="{ enabled: false }"
    >
      <DxColumn
        v-for="(column, index) in columns"
        :allow-sorting="false"
        :key="index"
        :min-width="column.minWidth"
        :data-field="column.field"
        :caption="column.caption"
        :cell-template="column.cellTemplate"
        :height="48"
        :data-type="column.dataType"
        v-model:visible="column.isVisible"
      />
      <DxColumn class="row-action" :width="96" cell-template="button-group">
      </DxColumn>

      <DxPaging :enabled="false" />
      <!-- <DxScrolling column-rendering-mode="virtual" mode="infinite" /> -->
      <DxColumnChooser :enabled="false" mode="select" />

      <template #button-group="{ data }">
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
          <base-avatar
            class="mgr-12"
            :username="data.displayValue"
          ></base-avatar>
          <div :title="data.displayValue">{{ data.displayValue }}</div>
        </div>
      </template>

      <template #title-tooltip="{ data }">
        <div class="flex-m">
          <div :title="data.displayValue" class="wrap-text text-three-dots">
            {{ data.displayValue }}
          </div>
        </div>
      </template>

      <template #status-cell="{ data }">
        <div class="flex-m">
          <div
            :title="getStatus(data.displayValue).text"
            class="wrap-text text-three-dots flex-c-m"
          >
            <span
              class="dot"
              :class="getStatus(data.displayValue).iconClass"
            ></span>
            <span
              class="text-three-dots"
              :class="getStatus(data.displayValue).class"
              >{{ getStatus(data.displayValue).text }}</span
            >
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
import { getStatus } from "@/utils";
import { Title } from "@/i18n";
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
  emits: ["deleteRow", "editRow"],
  data() {
    return {
      Title,
      isEmailVisible: false,
    };
  },
  methods: {

    /**
     * X??? l?? ?? trong b???ng
     * Author: MDLONG(27/12/2022)
     * @param {event} e
     */
    onCellPrepared(e) {
      try{
        if (e.rowType === "header") {
          e.cellElement.classList.add("table-header");
        }
        e.cellElement.classList.add("custom-cell");
        if (e.columnIndex === e?.row?.cells?.length - 1) {
          e.cellElement.classList.add("row-action");
        }

      }catch(error){
        console.log(error)
      }
    },

    /**
     * Click header table
     * @param {*} e 
     */
    onCellClick(e){
      if (e.rowType == "header" && e.columnIndex < this.columns.length) {
        this.showIcon(e);
        this.$emit(
          "onClickHeaderTable",
          this.columns[e.columnIndex].field,
          this.showUp > -1 ? Enum.TypeSort.ASC : Enum.TypeSort.DESC
        );
      }
    },

    /**
     * X??? l?? h??ng trong b???ng
     * Author: MDLONG(27/12/2022)
     * @param {event} e
     */
    onRowPrepared(e) {
      e.rowElement.classList.add("custom-row");
    },

    /**
     * S??? ki???n s???a
     * Author: MDLONG(27/12/2022)
     * @param {*} data
     */
    editRow(data) {
      this.$emit("editRow", data.data);
    },

    /**
     * S??? ki???n x??a
     * Author: MDLONG(27/12/2022)
     * @param {*} data
     */
    deleteRow(data) {
      this.$emit("deleteRow", data.data);
    },

    /**
     * L???y t??n tr???ng th??i
     * @param {*} status
     */
    getStatus(status) {
      return getStatus(status);
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

.dx-data-row.dx-data-row.dx-state-hover .button-group {
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
  min-width: 80px;
  visibility: hidden;
}

.dx-datagrid-nodata {
  color: #999;
  font-size: 15px;
}

span.dx-datagrid-nodata {
  width: 155px !important;
  background: url(@/assets/img/EmptyRC1.3c8bf4c8.svg) -692px 16px no-repeat !important;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 200px;
}
</style>
