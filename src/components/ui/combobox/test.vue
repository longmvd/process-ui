<template>
    <div class="el-wrapper" :class="[{ error: !isValid }, wrapperClass]">
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
        <DxSelectBox :data-source="dataSource" />
        <i :class="'icon-24 input-icon ' + iconClass" v-if="iconClass"></i>
      </div>
      <span class="err-message">{{ errorMessage }}</span>
    </div>
  </template>
  <script>
  import { DxSelectBox } from "devextreme-vue/select-box";
  export default {
    name: "MsSelectBox",
    props: {
      dataSource: {
        type: Array,
      },
    },
    components: {
      DxSelectBox,
    },
  };
  </script>
  
  <style></style>
  