<template>
  <div class="container">
    <process-sidebar />
    <process-content />
  </div>
</template>

<script>
import ProcessContent from "./ProcessContent.vue";
import ProcessSidebar from "./ProcessSidebar.vue";

export default {
  name: "ProcessContainer",
  components: {
    ProcessContent,
    ProcessSidebar,
  },
};
</script>

<style>
.container{
    display: flex;
    height: calc(100vh - var(--header-height));
    background: var(--content-background-color);
}
</style>
