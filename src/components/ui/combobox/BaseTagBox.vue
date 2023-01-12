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
      <DxTagBox
        :width="width"
        :value="value"
        :height="height"
        :showScrollbar="showScrollbar"
        :show-multi-tag-only="showMultiTagOnly"
        :data-source="dataSource"
        :value-expr="valueExpr"
        :display-expr="displayExpr"
        :no-data-text="noDataText"
        :placeholder="placeholder"
        :selection-mode="selectionMode"
        :maxDisplayedTags="maxDisplayedTags"
        :maxSearchResults="maxSearchResults"
        @focusOut="validate"
        @value-changed="valueChanged"
        :multiline="true"
      />
      <!-- <i class="icon-24 dx-dropdowneditor-icon drop-down-icon"></i> -->
    </div>
    <span v-if="!isValid" class="err-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
/* eslint-disable */
import DxTagBox from "devextreme-vue/tag-box";
export default {
  name: "BaseTagBox",
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
    inputWrapperClass: String,
    noDataText: String,
    width: String,
    maxDisplayedTags: Number,
    maxSearchResults: Number,
    id: String,
    label: String,
    rules: Array,
    height: Number,
    showMultiTagOnly: Boolean,
    showScrollbar: Boolean,
    value: [String, Object, Array],
  },
  components: {
    DxTagBox,
  },
  emits: ["valueChanged"],
  data() {
    return {
      isValid: true,
      errorMessage: "",
      selectedValue: null,
    };
  },
  methods: {
    /**
     * Validate
     *  Author: MDLONG(30/12/2022)
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
     * sự kiện liệu thay đổi
     *  Author: MDLONG(30/12/2022)
     */
    valueChanged(e) {
      this.selectedValue = e.value;
      this.isValid = true;
      this.$emit("valueChanged", e);
    },

    /**
     * Kiểm tra để trống
     * Author: MDLONG(30/10/2022)
     * @param {*} event
     */
    /**
     * Kiểm tra để trống
     * Author: MDLONG(30/10/2022)
     * @param {*} event
     */
    checkRequired(message) {
      let isValid = false;
      let value = this.selectedValue;
      if (value) {
        isValid = value.length > 0 ? true : false;
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

.drop-down-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}

.el-wrapper.error .dx-dropdowneditor {
  border-color: var(--error-color) !important;
}
</style>
