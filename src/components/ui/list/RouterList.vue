<template>
  <div class="list-wrapper">
    <ul class="list">
      <router-link
        v-for="item in items"
        :key="item.id"
        :to="item.to"
        class="list__item"
        :class="[item.itemClass, { 'router-link-exact-active': isSelected(item) }]"
        @click="selectItem(item)"
      >
        <i :class="item.iconClass"></i>
        <div :class="item.nameClass">{{ item.name }}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RouterList",
  props: {
    //các item của list
    items: Array,
    defaultValue: [String, Number],
  },
  data() {
    return { selectedItem: { id: "" } };
  },
  computed: {},
  methods: {
    /**
     * Chọn Item
     * Author: MDLONG(25/12/2022)
     * @param {*} item
     */
    selectItem(item) {
      try {
        this.selectedItem = item;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Đặt giá trị mặc định cho list
     * Author: MDLONG(25/12/2022)
     * @param {*} defaultValue
     * @param {string} mode
     */
    setDefault(defaultValue, mode = "id") {
      try {
        switch (mode) {
          case "id":
            for (let item of this.items) {
              if (item.id === defaultValue) {
                this.selectedItem = item;
                break;
              }
            }
            break;
          case "index":
            for (let index in this.items) {
              if (index === defaultValue) {
                this.selectedItem = this.items[index];
                break;
              }
            }
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * lấy item được chọn
     * Author: MDLONG(25/12/2022)
     */
    isSelected(item) {
      return item.id === this.selectedItem.id;
    },
  },
  
  created() {
    this.setDefault(this.defaultValue);
  },
};
</script>
<style scoped>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list__item {
  cursor: pointer;
}
</style>
