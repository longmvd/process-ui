Ơ
<template>
  <div class="w-full h-full" id="user-page">
    <div class="page-container">
      <div class="content__header">
        <div class="content__header--left">
          <div class="page-title">{{ Title.USER }}</div>
        </div>
        <div class="content__header--right">
          <base-button
            buttonClass="btn--pri flex-m pad-left-12 fw-500"
            :components="[
              { class: 'icon-24 svg-icon icon-plus mgr-4' },
              { content: Title.ADD },
            ]"
          />
        </div>
      </div>
      <div class="content__main">
        <div class="table-filter">
          <base-input
            wrapperClass="table-search mgr-8"
            iconClass="svg-icon icon-search"
            :placeholder="Title.SEARCH_FILTER"
          />
          <base-input
            wrapperClass="table-search mgr-8"
            iconClass="svg-icon icon-search"
            :placeholder="Title.SEARCH_FILTER"
          />
          <base-input
            wrapperClass="table-search mgr-8"
            iconClass="svg-icon icon-search"
            :placeholder="Title.SEARCH_FILTER"
          />
          <base-input
            wrapperClass="table-search mgr-8"
            iconClass="svg-icon icon-search"
            :placeholder="Title.SEARCH_FILTER"
          />
          <base-button
            buttonClass="btn--square bg-white mgl-auto"
            :components="[{ class: 'icon-24 svg-icon icon-setting' }]"
          />
        </div>
        <div id="user-table">
          <base-table />
        </div>
        <div class="paging">
          <div class="paging-navigation">
            <div class="page-total flex">
              {{ Title.PAGE_TOTAL }}
              <b style="padding: 0px 6px">{{ 40 }}</b>
            </div>
            <div class="page-size-selector flex">
              <DxDropDownBox class="select-size-dropdown" />
              <div class="page-info">Từ 1 đến 15 bản ghi</div>
            </div>
            <div class="page-next-preview flex-c-m">
              <base-button
                buttonClass="btn--round bg-none paging-btn flex-c-m"
                :components="[
                  { class: 'icon-24 svg-icon icon-chevron-left disabled' },
                ]"
              />
              <base-button
                buttonClass="btn--round bg-none paging-btn flex-c-m"
                :components="[{ class: 'icon-24 svg-icon icon-chevron-right' }]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { Title } from "@/i18n";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import BaseInput from "@/components/ui/input/BaseInput.vue";
import BaseTable from "@/components/ui/table/BaseTable.vue";

export default {
  name: "UserPage",
  components: {
    BaseButton,
    BaseInput,
    BaseTable,
    DxDropDownBox,
  },
  data() {
    return {
      Title,
    };
  },
};
</script>

<style>
.content__header {
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-title {
  font-weight: 700;
  font-size: 20px;
}
.content__main {
  background: var(--white-color);
  overflow: auto;
}
.table-filter {
  min-height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.table-search {
  min-width: 260px;
}

#user-table {
  overflow: hidden;
}

.page-container .paging {
  border-top: none;
  padding: 10px 0 !important;
  height: 56px;
  z-index: 8;
  position: relative;
  margin: 0 10px 8px 10px;
  background-color: #f9fafc !important;
}

.paging-navigation {
  display: flex;
  color: var(--text-color);
}

.page-total {
  flex: 1;
  line-height: 40px;
  margin-left: 16px;
}
.page-size-selector {
  display: flex;
  align-items: center;
}

.select-size-dropdown {
  width: 50px;
  height: 40px;
}
.page-info {
  height: 40px;
  line-height: 40px;
  padding: 0 24px;
}
.page-next-preview {
  width: 70px;
  height: 40px;
  display: flex;
  margin-right: 16px;
}
</style>
