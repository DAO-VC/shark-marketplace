<template>
  <div :class="['ui-tabs', {'ui-tabs--yellow': yellowStyle }, {'ui-tabs--menu-bordered': menuBordered }]" :style="cssVarCountTabs">
    <div class="ui-tabs-mobile">
      <div class="ui-tabs-mobile__current">
        {{ $t(activeTab) }}
      </div>
      <div class="ui-tabs-mobile__dropdown">
        <div
          class="ui-tabs-mobile__trigger"
          @click="toggleDropdown"
        >
          <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2Z"
              fill="var(--base-text)"
            />
            <path
              d="M12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2Z"
              fill="var(--base-text)"
            />
            <path
              d="M20 2C20 3.10457 19.1046 4 18 4C16.8954 4 16 3.10457 16 2C16 0.895431 16.8954 0 18 0C19.1046 0 20 0.895431 20 2Z"
              fill="var(--base-text)"
            />
          </svg>
        </div>
        <div
          v-if="showDropdown"
          v-click-outside="() => showDropdown = false"
          class="ui-tabs-mobile__list"
        >
          <div
            v-for="(tab, idx) in tabsFiltered"
            :key="idx"
            :class="['ui-tabs-menu__item', { 'ui-tabs-menu____item--active': tab.isActive }]"
            @click="selectTab(tab)"
          >
            {{ $t(tab.name) }}
          </div>
        </div>
      </div>
    </div>
    <div class="ui-tabs-menu">
      <div
        v-for="(tab, idx) in tabs"
        :key="idx"
        :title="tab.$attrs.title"
        :class="['ui-tabs-menu__item', { 'ui-tabs-menu__item--active': tab.isActive }]"
        :data-tabs-count="tabs.length"
        @click="selectTab(tab)"
      >
        {{ $t(tab.name) }}
      </div>
    </div>

    <div class="ui-tabs-details">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "UiTabs",
  props: {
    yellowStyle: {
      type: Boolean,
      default: false
    },
    menuBordered: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tabs: [],
      activeTab: null,
      showDropdown: false
    };
  },
  computed: {
    // Отфильтровали массив табов, исключив текущий таб
    tabsFiltered () {
      return this.tabs.filter(i => i.name !== this.activeTab);
    },
    cssVarCountTabs () {
      return {
        "--count-tabs": this.tabs.length
      };
    }
  },
  created () {
    this.tabs = this.$children;
  },
  mounted () {
    const activeTab = this.tabs.filter(i => i.selected);
    this.activeTab = activeTab[0].name;
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = (tab.name === selectedTab.name);
      });
      this.activeTab = selectedTab.name;
      this.showDropdown = false;
    },
    toggleDropdown () {
      this.showDropdown = !this.showDropdown;
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-tabs {
  $tabs: &;

  &-menu {
    display: none;

    @include respond-before("md") {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background-color: var(--color-dark);
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }

    &__item {
      //font-size: 16px;
      padding: 10px 20px;
      text-align: right;
      cursor: pointer;
      color: var(--color-gray-light);
      transition: border-color .2s ease-in-out, color .2s ease-in-out;

      @include respond-before("md") {
        padding: 18px;
        text-align: center;
        border-bottom: 1px solid transparent;
        width: calc(100% / var(--count-tabs));

        &:hover {
          color: var(--color-primary);
        }
      }
      @include respond-before("lg") {
        //font-size: 18px;
      }

      &--active {
        cursor: default;
        color: var(--color-primary);
        border-color: var(--color-primary);
      }
    }
  }

  &-details {
    overflow: hidden;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }

  &-mobile {
    display: flex;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    background-color: var(--color-gray-light);

    @include respond-before("md") {
      display: none;
    }

    &__trigger {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      font-size: 18px;
      line-height: 0;
      width: 65px;
      height: 100%;
      cursor: pointer;
      margin-left: auto;
      user-select: none;
    }

    &__current {
      flex: 1;
      font-size: 16px;
      padding: 18px;
      cursor: pointer;
      text-align: center;
      color: var(--base-text);
      border-bottom: 1px solid var(--color-primary);
      transition: border-color .2s ease-in-out;
    }

    &__dropdown {
      position: relative;
      z-index: 2;
    }

    &__list {
      position: absolute;
      top: 100%;
      right: 0;
      width: 220px;
      background-color: var(--color-gray-light);
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      padding: 10px 0;

      .ui-tabs-menu__item {
        border-radius: 0 !important;
        margin-right: 0 !important;
        margin-bottom: 0 !important;
      }
    }
  }

  // Желтые табы
  &--yellow {
    #{$tabs}-menu {
      background-color: var(--color-primary);
    }
    #{$tabs}-details {
      background-color: var(--color-primary);
      color: var(--base-text-invert);
    }
    #{$tabs}-menu__item {
      color: #90862f;

      &:hover {
        color: var(--base-text-invert);
      }

      &--active {
        color: var(--base-text-invert);
        border-color: var(--base-text-invert);
      }
    }

    #{$tabs}-mobile {
      background-color: var(--color-primary);
      border-bottom: 1px solid var(--base-text-invert);

      #{$tabs}-menu__item {
        color: var(--base-text-invert);
      }

      &__current {
        color: var(--base-text-invert);
        border: none;
      }

      &__trigger {
        svg path {
          fill: var(--base-text-invert);
        }
      }

      &__list {
        top: 101%;
        background-color: var(--color-primary);
        border: 1px solid var(--base-text-invert);
        border-top: 0;
      }
    }

    // Жёлтые табы + шапка с нижним бордюром
    &#{$tabs}--menu-bordered {
      #{$tabs}-menu {
        border-bottom: 1px solid #bdac0b;
      }
      #{$tabs}-menu__item {
        border-bottom-width: 2px;
        margin-bottom: -1px;
      }
    }
  }
}
</style>
