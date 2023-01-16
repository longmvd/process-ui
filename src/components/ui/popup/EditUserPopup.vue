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
          <br/>
          <div class="role-wrap">
            <div class="user-role" v-for="role in roles" :key="role.RoleID">
              <input
                type="checkbox"
                class="c1 cur-point"
                :value="role.RoleID"
                v-model="selectedRoleIDs"
                :id="role.RoleID"
              />
              <label :for="role.RoleID" class="cur-point flex-m h-full">
                <span class="role-label">{{ role.RoleName }}</span>
              </label>
            </div>
          </div>
        </div>
      </main>
      <footer class="popup__footer">
        <div class="popup-btn-group">
          <base-button
          @click="hide"
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
import { State } from '@/enums';
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
      this.loadData()
      this.selectedRoleIDs = [...this.user?.Roles.map(role => role.RoleID)]
      this.isShow = true;
    },

    /**
     * Ẩn popup
     * Author: MDLONG(27/12/2022)
     */
    hide(){
      this.isShow = false;
    },

    setUser(user){
      this.user = user
    },

    /**
     * Set tên vai trò
     * @param {*} user 
     */
    setRoleNames(user) {
      user.RoleNames = user.Roles
        .filter((role) => role.State == State.Add || (role.State == 0 && !role.IsNew))
        .map((role) => role.RoleName)
        .join("; ");
    },
    /**
     * Load dữ liệu từ api
     * Author: MDLONG(01/01/2023)
     */
    async loadData() {
      this.roles = await request.getAllRole();
    },
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


input[type=checkbox] + label {
  display: block;
  cursor: pointer;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label:before {
    box-sizing: border-box;
    content: "\2714";
    border: 2px solid #686c7b;
    border-radius: 0.2em;
    display: inline-block;
    width: 18px;
    height: 18px;
    padding-left: 0.22em;
    padding-bottom: 0.9em;
    margin-right: 0.2em;
    vertical-align: bottom;
    color: transparent;
    transition: .2s;
    font-size: 13px;
}

input[type=checkbox] + label:active:before {
  transform: scale(0);
}

input[type=checkbox]:checked + label:before {
  background-color: #0c9cdd;
  border: 0.1em solid #0c9cdd;
  color: #fff;
}

input[type=checkbox]:disabled + label:before {
  transform: scale(1);
  border: 0.1em solid #aaa;
}

input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  opacity: .5;
  border: 0.1em solid #0c9cdd;
}
</style>
