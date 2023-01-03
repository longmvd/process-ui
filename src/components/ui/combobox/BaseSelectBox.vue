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
        ref="selectBox"
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
    label:String,
    width:String,
    noDataText:String,
    rules: Array,
    value: [Object, String],
    selectedItem: [Object, String]
  },
  components: {
    DxSelectBox,
  },
  emits: ["valueChanged"],
  data() {
    return {
      isValid: true,
      selectedValue: null,
      errorMessage:"",
      
    };
  },
  methods: {

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

    valueChanged(e) {
      this.selectedValue = e
      this.isValid = true
      this.$emit("valueChanged", e);
    },

    /**
     * Kiểm tra để trống
     * Author: MDLONG(30/10/2022)
     * @param {*} event
     */
     checkRequired(message) {
      let value = this.selectedValue;
      if (value) {
        return true;
      }
      this.errorMessage = message;
      return false;
    },
  },
};
</script>

<style scoped>
.have-icon .dx-dropdowneditor {
  position: relative;
  padding-left: 28px;
}
.el-wrapper.error .dx-dropdowneditor{
    border-color: var(--error-color)!important
}
</style>
