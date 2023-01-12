<template>
  <div class="sidebar">
    <router-list :items="SidebarItem" :defaultValue="defaultItemId" />
  </div>
</template>

<script>
import RouterList from "../ui/list/RouterList.vue";
import { SidebarItem } from "@/i18n";
export default {
  name: "ProcessSidebar",
  components: { RouterList },
  data() {
    return {
      SidebarItem,
      defaultItemId: 0,
    };
  },
};
</script>

<style></style>
