<template>
  <div @click="toggleCheck">
    <label
      class="checkbox-container ms-checkbox custom-checkbox"
     :for="name"
    >
      <input
        type="checkbox"
        :disabled="isDisabled"
        class="ms-checkbox--input"
        :value="modelValue"
        :checked="checked"
        :name="name"
        @change="$emit('update:modelValue', $event.target.value)"
      />
      <span
        :class="{
          'icon-square-check-primary': checked,
          'icon-square-uncheck': !checked,
          disabled: isDisabled,
        }"
        class="checkmark"
        
      ></span>
      <span class="con-slot-label"
        ><div :title="label" >
          {{ label }}
        </div></span
      >
    </label>
  </div>
</template>

<script>
export default {
  props: {
    //Trạng thái check box
    isDisabled: Boolean,
    label: String,
    name: String,
    modelValue: [String, Object]
  },
  emits: ['update:modelValue'],
  methods: {
    /**
     * toggle check
     * Author: MDLONG(29/12/2022)
     * @param {event} e 
     */
   toggleCheck(e){
    e.preventDefault();
    this.checked = !this.checked
   },

   setCheck(value){
    this.checked = value
   }

  },
  data() {
    return {
      checked: false,
    }
  },
};
</script>

<style scoped>
.custom-checkbox {
  /* margin-top: -25px; */
}
.ms-checkbox--input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.ms-checkbox .ms-checkbox--input {
  height: inherit;
}
input:disabled {
  color: #d7dce3 !important;
}
.checkmark {
  position: absolute;
  left: 0;
  height: 26px;
  width: 22px;
}
.disabled {
  opacity: 0.5 !important;
}
.ms-checkbox .checkmark {
  top: 0;
}
.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 1px 0 0 32px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100%;
}

.con-slot-label {
    text-overflow: ellipsis!important;
    display: -webkit-box!important;
    -webkit-box-orient: vertical!important;
    font-weight: 400;
}
.con-slot-label {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
}
.con-slot-label:hover {
    color: var(--primary-color)!important;
}

.ms-checkbox:focus .checkmark:not(.disabled),
.ms-checkbox:focus .icon-square-check-primary.checkmark,
.ms-checkbox:hover .checkmark:not(.disabled),
.ms-checkbox:hover .icon-square-check-primary.checkmark {
  border-radius: 50%;
  background-color: var(--primary-color) !important;
}
</style>
