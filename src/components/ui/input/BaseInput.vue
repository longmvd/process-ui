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
      <input
        class="input"
        :class="[{ 'pad-left-40': iconClass }, inputClass]"
        :type="type"
        :placeholder="placeholder"
        :id="id"
        :name="name"
        :value="modelValue"
        :tabindex="tabindex"
        @input="$emit('update:modelValue', onInput($event))"
        @blur="validate"
        ref="inputRef"
      />
      <i :class="'icon-24 input-icon ' + iconClass" v-if="iconClass"></i>
    </div>
    <span v-if="!isValid" class="err-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
import { Message } from '@/i18n';
// import { MESSAGE } from '@/i18n/resources';
export default {
  props: {
    wrapperClass: String,
    //class của nhãn
    labelClass: String,
    //class của thẻ gói input
    inputWrapperClass: String,
    //class của thẻ input
    inputClass: String,
    iconClass: String,
    isRequired: Boolean,
    label: String,
    tooltip: String,
    type: String,
    placeholder: String,
    id: String,
    name: String,
    rules: Array,
    modelValue: String,
    tabindex: Number,
  },
  computed:{
    input(){
      return this.$refs.inputRef
    },

    value(){
      return this.modelValue
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      isValid: true,
      errorMessage: "",
      ruleList: [],
      frequencyValue:{},
    };
  },
  methods: {

    onInput(event) {
      this.isValid = true;
      return event.target.value;
    },
    /* eslint-disable */
    /**
     * validate input
     * Author: MDLONG(30/10/2022)
     */
    validate() {
      try {
        this.$emit("update:modelValue", this.modelValue?.trim());
        this.errorMessage = "";
        let isValid = true;
        if (this.rules) {
          for (let rule of this.rules) {
            if (rule?.hasOwnProperty("required")) {
              isValid = this.checkRequired(rule["required"]);
              if (!isValid) break;
            } else if (rule?.hasOwnProperty("email")) {
              isValid = this.checkEmail(rule["email"]);
              if (!isValid) break;
            } else if (rule?.hasOwnProperty("phone")) {
              isValid = this.checkPhone(rule["phone"]);
              if (!isValid) break;
            } else if (rule?.hasOwnProperty("minLength")) {
              isValid = this.checkMinLength(rule["minLength"], rule.cLength);
              if (!isValid) break;
            } else if (rule?.hasOwnProperty("maxLength")) {
              isValid = this.checkMaxLength(rule["maxLength"], rule.cLength);
              if (!isValid) break;
            // } else if (rule?.hasOwnProperty("duplicated")) {
            //   isValid = this.checkDuplicated(rule["duplicated"], this.frequencyValue);
            //   if (!isValid) break;
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
     * Kiểm tra email
     * Author: MDLONG(30/10/2022)
     * @param {*} event
     */
    checkEmail(message) {
      let value = this.modelValue;
      if (value) {
        // eslint-disable-next-line
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let msg = regex.test(value)
          ? undefined
          : message || "Vui lòng nhập email";
        this.errorMessage = msg;
        if (msg != undefined) return false;
        return true;
      }
      return true;
    },

    /**
     * Kiểm tra để trống
     * Author: MDLONG(30/10/2022)
     * @param {*} event
     */
    checkRequired(message) {
      let value = this.modelValue;
      if (value) {
        return true;
      }
      this.errorMessage = message;
      return false;
    },

    /**
     * Kiểm tra số điện thoại
     * Author: MDLONG(30/10/2022)
     * @param {string} message
     */
    checkPhone(message) {
      let value = this.modelValue;
      if (value) {
        const regex = /^[0-9]{10}$/;
        let msg = regex.test(value)
          ? undefined
          : message || "Vui lòng nhập email";
        this.errorMessage = msg;
        if (msg != undefined) return false;
        return true;
      }
      return true;
    },

    /**
     * Kiểm tra ký tự tối thiểu
     * Author: MDLONG(30/10/2022)
     * @param {string} message
     * @param {integer} min
     */
    checkMinLength(message, min) {
      let value = this.modelValue;
      if (value) {
        let msg =
          value.length >= min
            ? undefined
            : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        this.errorMessage = msg;
        if (msg != undefined) return false;
        return true;
      }
      return true;
    },

    /**
     * Kiểm tra trùng
     * Author: MDLONG(30/10/2022)
     * @param {string} message
     * @param {integer} min
     */
    checkDuplicated(message, frequency) {
      let value = this.modelValue;
      this.isValid = true;
      this.frequencyValue = frequency
      let freq = frequency[value]
      if (value && freq) {
        let msg = freq <= 1
            ? undefined
            : message || Message.DUPLICATED_VALUE;
        this.errorMessage = msg;
        if (msg != undefined) {
          this.isValid = false;
          return false
        };
        return true;
      }
      return true;
    },

    /**
     * Kiểm tra ký tự tối đa
     * Author: MDLONG(30/10/2022)
     * @param {string} message
     * @param {integer} min
     */
     checkMaxLength(message, max) {
      let value = this.modelValue;
      if (value) {
        let msg =
          value.length <= max
            ? undefined
            : message || `Tối đa không quá ${max} ký tự`;
        this.errorMessage = msg;
        if (msg != undefined) return false;
        return true;
      }
      return true;
    },

    /**
     * focus vào input
     * Author: MDLONG(30/10/2022)
     */
    focus() {
      this.input.focus();
    },
  },
};
</script>
<style>
.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 8px;
}
</style>
