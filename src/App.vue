<template>
  <div class="main">
    <process-header/>
    <process-container/>
  </div>
</template>

<script>
import ProcessHeader from '@/components/layout/ProcessHeader.vue'
import ProcessContainer from '@/components/layout/ProcessContainer.vue'
export default {
  name: 'App',
  components: {
    ProcessHeader,
    ProcessContainer
  },
  methods:{
    initString() {
      String.prototype.format = function () {
        let a = this;
        for (let k in arguments) {
          a = a.replace("{" + k + "}", arguments[k]);
        }
        return a;
      };
    },
  },
  created(){
    this.initString()
  }
}


</script>

<style>
@import url(./css/main.css);
</style>
