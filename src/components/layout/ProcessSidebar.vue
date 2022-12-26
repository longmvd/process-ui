<template>
  <div class="sidebar">
    <base-list :items="SidebarItem"
      :defaultValue="defaultItemId"
     />
  </div>
</template>

<script>
import BaseList from "../ui/list/BaseList.vue";
import { SidebarItem } from "@/i18n";
export default {
  name: "ProcessSidebar",
  components: { BaseList },
  data() {
    return {
      SidebarItem,
      defaultItemId: 0
    };
  },
};
</script>

<style></style>
