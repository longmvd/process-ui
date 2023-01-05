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
      isShow: true,
      primaryButton: {
        isShow: true,
        class:'',
        title: Title.DELETE,
        action: {},
      },
      extraButton: {
        isShow: false,
        class:'',
        title: Title.CANCEL,
        action: this.togglePopup,
      },
      extraSubButton: {
        isShow: false,
        class:'',
        title: "",
        action: {},
      },
      messageTitle: "Xóa người dùng",
      messageContent:
        "Bạn có chắc chắn muốn xóa <b>Bùi Quang Đức</b> khỏi ứng dụng AMIS Quy trình không?",
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
     * Đặt nội dung cho message
     * @param {String} title
     * @param {String} content
     */
    setContent(title, content) {
      this.MessageTitle = title;
      this.MessageContent = content;
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
