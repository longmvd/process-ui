<template>
  <div class="header">
    <div class="header__left h-full flex-1">
      <div class="grid-app-menu"></div>
      <div class="header-logo">{{ Title.APP_NAME }}</div>
      <div class="navbar">
        <div
          class="navbar-item"
          v-for="(item, index) in NavbarItem"
          :key="index"
          @click="selectNavItem(item.id)"
          :class="{'active': getActiveNavItem(item.id)}"
        >
          <div class="navbar-item-title">{{ item.title }}</div>
          <div class="navbar-item-active"></div>
        </div>
        <div class="flex-m">
          <base-button
            buttonClass="btn--square "
            buttonId="navbar-three-dot"
            :components="[{ class: 'icon-24 svg-icon icon-three-dot' }]"
          />
          <base-button
            buttonClass="btn--pri flex-m fw-500"
            :components="[
              { class: 'icon-20 svg-icon-process mgr-4 icon-run-process' },
              { content: Title.RUN_PROCESS },
            ]"
          />
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
    <div class="header__right">
      <base-input
        wrapperClass="header-search mgr-8"
        iconClass="svg-icon icon-search"
        inputClass="no-change-border"
        :placeholder="Title.SEARCH"
      />
      <div class="header-notify"></div>
      <div class="header-user">
        <div class="header-avatar">
          <base-avatar username="Mai Đại Long" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Title, NavbarItem } from "@/i18n";
import BaseButton from "../ui/button/BaseButton.vue";
import BaseInput from "../ui/input/BaseInput.vue";
import BaseAvatar from "../ui/avatar/BaseAvatar.vue";

export default {
  components: { BaseButton, BaseInput, BaseAvatar },
  name: "ProcessHeader",
  data() {
    return {
      Title,
      NavbarItem,
      isActive: false,
      selectedNavItem: 0,
    };
  },
  computed:{
  },
  methods:{

    /**
     * Chọn item
     * Author: MDLONG(25/12/2022)
     * @param {*} id 
     */
    selectNavItem(id){
      try{
        this.selectedNavItem = id
      }catch(error){
        console.log(error)
      }
    },
    /**
     * lấy item được chọn
     * Author: MDLong(25/12/2022)
     * @param {*} id 
     */
    getActiveNavItem(id){
      return this.selectedNavItem === id
    }
  }
};
</script>

<style>

</style>
