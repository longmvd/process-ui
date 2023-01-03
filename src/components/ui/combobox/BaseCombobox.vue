<template>
  <div class="el-wrapper">
    <label :for="config.id" class="el__label" v-if="config.label">
      {{ config.label }}
      <span v-if="config.required" style="color: var(--error-color)">*</span>
    </label>
    <div
      class="combobox"
      :class="config.comboboxClass"
      :style="'width: ' + config.width"
      v-if="config.options"
    >
      <input
        ref="input"
        :type="config.inputType"
        class="input combobox__input fw-600"
        :class="{'bg-white': config.disabled==''}"
        :id="config.id"
        :disabled="config.disabled"
        :value="selectedItem.value"
      />
      <button @click="toggleOptionList" class="combobox__button" ref="button">
        <i class="icon-24 svg-icon icon-chevron-down"></i>
      </button>
      <ul :class="config.optionClass" v-show="showItems">
        <li
          v-for="(option, index) in config.options"
          :key="index"
          class="option__item"
          :class="{ selected: selectedIndex == index }"
          :id="index"
          @click="selectOption(option, $event)"
        >
          {{ option.value }}
          <i class="icon-24 svg-icon icon-check-selected" v-if="selectedIndex == index"></i>
        </li>
      </ul>
    </div>
    <span class="err-message"></span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "BaseCombobox",
  props: {
    config: {
      type: Object,
    },
    parent: {
      type: Object,
    },
    data: {
      type: Object,
    },
    defaultValue: {
      type: Object,
    },
  },
  emits: ["onSelect"],
  data() {
    return {
      showItems: false,
      items: [],
      selectedIndex: -1,
      selectedItem: {},
    };
  },
  methods: {
    /**
     * Ẩn hiện option combobox
     * Author: MDLONG(30/10/2022)
     */
    toggleOptionList: function () {
      this.showItems = !this.showItems;
    },

    /**
     * Ẩn option combobox
     * Author: MDLONG(30/10/2022)
     */
    hideOptionList: function (e) {
      if (!this.$el.contains(e.target)) {
        this.showItem = false;
      }
    },

    /**
     * Xử lý chọn option
     * Author: MDLONG(30/10/2022)
     * @param {event} e
     */
    selectOption(data, e) {
      this.showItems = false;
      this.selectedItem = data;
      this.selectedIndex = e.target.id;
      this.$emit("onSelect", this.selectedItem);
    },

    /**
     * Đặt giá trị default
     * Author: MDLONG(30/10/2022)
     */
    setDefault(selected) {
      try {
        this.selectedItem = selected;
        if (selected === -1) {
          this.selectedItem = {};
        } else {
          this.selectedItem = this.items[this.selectedItem];
          this.isValid = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Đặt giá trị mặc định bằng key
     * Author: MDLONG(20/11/2022)
     * @param {string} key-- tên key của object
     * @param {string} value -- giá trị của key đó
     */
    setDefaultByKey(key, value) {
      try {
        if (this.items.length === 0) {
          this.items = this.config.options;
        }
        this.items.forEach((item, index) => {
          if (item[key] === value) {
            this.selectedItem = item;
            this.selectedIndex = index;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ẩn option khi click outside
     * Author: MDLONG(30/10/2022)
     */
    outsideHideOption: function () {
      window.addEventListener("click", this.hideOptionList);
    },
  },
  mounted() {
    this.setDefaultByKey(this.config?.defaultKey, this.config.defaultValue)
    this.outsideHideOption();
  },
  unmounted() {
    // Xóa sự kiện
    window.removeEventListener("click", this.hideOptionList);
  },
};
</script>
<style>
@import url(@/css/components/combobox.css);
</style>
