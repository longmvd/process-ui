<template>
  <div class="overlay" v-if="isShow">
    <div class="message-popup">
      <header class="popup__header">
        <div class="header-title">{{ messageTitle }}</div>
        <base-button
          @click="togglePopup"
          buttonClass="btn--round bg-white change-color-btn flex-c-m"
          :components="[{ class: 'icon-24 svg-icon icon-close-2' }]"
        >
        </base-button>
      </header>
      <main class="popup__content flex-1">
        <div v-html="messageContent" class="message-content"></div>
      </main>
      <footer class="popup__footer">
        <div class="popup-btn-group">
          <base-button
            v-if="extraButton.isShow"
            @click="extraButton.action"
            :buttonClass="'btn--extra mgr-12' + extraButton.class"
            :components="[{ content: extraButton.title }]"
          />
          <base-button
            v-if="extraSubButton.isShow"
            @click="extraSubButton.action"
            :buttonClass="'btn--extra mgr-12' + extraSubButton.class"
            :components="[{ content: extraSubButton.title }]"
          />
          <base-button
            @click="primaryButton.action"
            :buttonClass="'btn--pri ' + primaryButton.class"
            :components="[{ content: primaryButton.title }]"
          />
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { Title } from "@/i18n";
import BaseButton from "../button/BaseButton.vue";
export default {
  name: "MessageUserPopup",
  components: {
    BaseButton,

  },
  props: {
    user: {
      type: Object,
    },
  },
  computed: {
    disabled() {
      return this?.selectedRoles?.length === 0 ? true : false;
    },
  },
  data() {
    return {
      Title,
      isShow: false,
      primaryButton: {
        isShow: true,
        class:'',
        title: Title.DELETE,
        action: this.togglePopup,
      },
      extraButton: {
        isShow: false,
        class:'',
        title: Title.CANCEL,
        action: this.hide,
      },
      extraSubButton: {
        isShow: false,
        class:'',
        title: "",
        action: {},
      },
      messageTitle: "",
      messageContent:
        "",
    };
  },
  methods: {
    /**
     * Ẩn hiện popup
     * Author: MDLONG(27/12/2022)
     */
    togglePopup() {
      this.isShow = !this.isShow;
    },

    /**
     * Hiển thị popup
     */
    show(config){
      if(config){
        this.messageTitle = config.title;
        this.messageContent = config.content;
        this.configButton(this.primaryButton, config.primaryButton)
        this.configButton(this.extraButton, config.extraButton)
        this.configButton(this.extraSubButton, config.extraSubButton)
      }
      this.isShow = true
    },

    /**
     * Ẩn popup
     * Author: MDLONG(01/01/2022)
     */
    hide(){
      this.isShow = false;
    },

    /**
     * Đặt nội dung cho message
     * @param {String} title
     * @param {String} content
     */
    setContent(title, content) {
      this.messageTitle = title;
      this.messageContent = content;
    },
    
    /**
     * Thiết lập nút
     * Author: MDLONG(04/01/2023)
     **/
    configButton(button, config){
      if(config){
          if(config.action){
            button.action = config.action
          }
          if(config.title){
            button.title = config.title
          }
          if(config.class){
            button.class = config.class
          }
          if(config.isShow != undefined){
            button.isShow = config.isShow
          }
        }
    },

  },
};
</script>
<style scoped>
.message-popup {
  width: 524px;
  min-width: 500px;
  background-color: var(--white-color);
  border-radius: var(--border-radius-6);
}
</style>
