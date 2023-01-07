<template>
  <div class="overlay" v-if="isShow">
    <div class="edit-user-popup">
      <header class="popup__header">
        <div class="header-title">{{ Title.EDIT_USER }}</div>
        <base-button
          @click="togglePopup"
          buttonClass="btn--round bg-white change-color-btn flex-c-m"
          :components="[{ class: 'icon-24 svg-icon icon-close-2' }]"
        >
        </base-button>
      </header>
      <main class="popup__content flex-1">
        <div>
          <div class="info-wrap">
            <div class="avatar mgr-8 flex-m">
              <base-avatar :username="user.UserName" imageClass="w-60"></base-avatar>
            </div>
            <div class="user-info">
              <div>
                <span>
                  <b>{{ user.UserName }}</b>
                </span>
                <span class="mgl-4"> ({{ user.UserCode }}) </span>
              </div>
              <div class="mgt-4 mgb-4">
                <span>{{ user.Email }}</span>
              </div>
              <div>
                <span>{{ user.JobPositionName }}</span>
                <span> - </span>
                <span>{{ user.DepartmentName }}</span>
              </div>
            </div>
          </div>
          <br />
          <div class="font-20 bold mgb-4">
            <span>
              <span>{{ Title.ROLE }}</span>
              <span class="required">*</span>
            </span>
          </div>
          <div class="role-wrap">
            <div class="user-role" v-for="role in roles" :key="role.RoleID">
              <label :for="role.RoleID" class="cur-point flex-m h-full">
                <input
                  type="checkbox"
                  class="c1 cur-point"
                  :value="role.RoleID"
                  v-model="selectedRoleIDs"
                  :id="role.RoleID"
                />
                <span class="role-label">{{ role.RoleName }}</span>
              </label>
            </div>
          </div>
        </div>
      </main>
      <footer class="popup__footer">
        <div class="popup-btn-group">
          <base-button
            buttonClass="btn--extra mgr-12"
            :components="[{ content: Title.CANCEL }]"
          />
          <base-button
            @click="saveData"
            buttonClass="btn--pri"
            :class="{ disabled: disabled }"
            :components="[{ content: Title.SAVE }]"
          />
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { Title } from "@/i18n";
import BaseAvatar from "../avatar/BaseAvatar.vue";
import BaseButton from "../button/BaseButton.vue";
// import MsCheckbox from '../input/MsCheckbox.vue';
import * as request from "@/services";
export default {
  name: "EditUserPopup",
  components: {
    BaseAvatar,
    BaseButton,
  },
  props: {
  },
  watch(){

  },
  computed: {
    disabled() {
      return this?.selectedRoleIDs?.length === 0 ? true : false;
    },
  },
  data() {
    return {
      Title,
      isShow: false,
      user: {},
      roles: [],
      saveData: {},
      selectedRoleIDs: [],
      // "6a9df853-16b5-44d5-97da-0783be03d1d6",
      // "98fc2f3e-0757-48b4-9a6f-9bd17bffadb6",
      // "2a7de239-e9f3-4922-b75f-8de32b7f37cf",
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
     * Hiển thị 
     * Author: MDLONG(27/12/2022)
     */
    show(){
      this.selectedRoleIDs = [...this.user?.Roles.map(role => role.RoleID)]
      this.isShow = true;
    },

    setUser(user){
      this.user = user
    },

    async loadData() {
      this.roles = await request.getAllRole();
    },
  },
  created() {
    this.loadData();
  },
};
</script>
<style scoped>
.edit-user-popup {
  background: var(--white-color);
  width: 600px;
  min-width: 500px;
  height: auto;
  border-radius: 6px;
}

.user-role {
  height: 34px;
  min-width: 50%;
  cursor: pointer;
}

.info-wrap {
  display: flex;
}

.role-wrap {
  display: flex;
  flex-wrap: wrap;
}
.user-role:hover {
  color: var(--primary-color);
}

.role-label {
  margin-left: 8px;
}
</style>
