<template>
  <div
    class="el-wrapper"
    :class="[{ error: !isValid }, { 'have-icon': iconClass }, wrapperClass]"
  >
    <label
      v-if="label"
      :for="id"
      class="el__label"
      :class="[labelClass, { ' have-tooltip': tooltip }]"
      :tooltip="tooltip"
      :title="tooltip"
      >{{ label }}
      <span v-if="isRequired" style="color: var(--error-color)">*</span></label
    >
    <div class="relative" :class="inputWrapperClass">
      <i :class="'icon-24 ' + iconClass" v-if="iconClass"></i>
      <DxSelectBox
        :data-source="dataSource"
        :value-expr="valueExpr"
        :display-expr="displayExpr"
        :placeholder="placeholder"
        :width="width"
        :value="value"
        :selectedItem="selectedItem"
        :selection-mode="selectionMode"
        :noDataText="noDataText"
        @value-changed="valueChanged"
        @focusOut="validate"
        ref="selectBoxRef"
      />
    </div>
    <span v-if="!isValid" class="err-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
/* eslint-disable */
import { DxSelectBox } from "devextreme-vue/select-box";
export default {
  name: "BaseSelectBox",
  props: {
    dataSource: {
      type: Array,
      Object,
      String,
    },
    iconClass: {
      type: String,
    },
    wrapperClass: String,
    //giá trị chọn
    valueExpr: [String, Number, Object],
    //giá trị hiển thị
    displayExpr: [String, Number, Object],
    placeholder: String,
    selectionMode: String,
    isRequired: Boolean,
    labelClass: String,
    tooltip: String,
    inputWrapperClass: String,
    label: String,
    width: String,
    noDataText: String,
    rules: Array,
    value: [Object, String],
    selectedItem: [Object, String],
  },
  components: {
    DxSelectBox,
  },
  emits: ["valueChanged"],
  computed: {},
  data() {
    return {
      isValid: true,
      selectedValue: null,
      errorMessage: "",
    };
  },
  computed: {
    selectBox: function () {
      return this.$refs.selectBoxRef.instance;
    },
  },
  methods: {
    /**
     * Focus select box
     * Author: MDLONG(04/01/2023)
     */
    focus() {
      this.selectBox.focus();
    },
    /**
     * Validate dữ liệu
     * Author: MDLONG(31/12/2023)
     * @param {*} e
     */
    validate() {
      try {
        this.errorMessage = "";
        let isValid = true;
        if (this.rules) {
          for (let rule of this.rules) {
            if (rule?.hasOwnProperty("required")) {
              isValid = this.checkRequired(rule["required"]);
              if (!isValid) break;
            }
          }
        }
        this.isValid = isValid;
      } catch (error) {
        console.log("error: ", error);
      }
      return this.errorMessage;
    },

    /**
     * Xử lý khi dữ liệu thay đổi
     * Author: MDLONG(31/12/2023)
     * @param {*} e
     */
    valueChanged(e) {
      this.selectedValue = e;
      this.isValid = true;
      this.$emit("valueChanged", e);
    },

    /**
     * Kiểm tra để trống
     * Author: MDLONG(31/12/2022)
     * @param {*} event
     */
    checkRequired(message) {
      let isValid = false;
      let value = this.selectedValue;
      if (value) {
        if (value.hasOwnProperty("previousValue")) {
          isValid = value.value ? true : false;
        } else {
          isValid = true;
        }
      }
      if (!isValid) this.errorMessage = message;
      return isValid;
    },
  },
};
</script>

<style scoped>
.have-icon .dx-dropdowneditor {
  position: relative;
  padding-left: 28px;
}
.el-wrapper.error .dx-dropdowneditor {
  border-color: var(--error-color) !important;
}
</style>
