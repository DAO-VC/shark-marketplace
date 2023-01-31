<template>
  <div v-click-outside="close" class="dropdown">
    <div
      :class="['dropdown__toggle', {'dropdown__toggle--open' : menuShow}]"
      @click="toggleUserBarMenu"
    >
      <slot name="selected" />

      <svg
        v-if="false"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M8 2.47163L7.05666 1.52832L4 4.58498L0.943344 1.52832L4.35604e-07 2.47163L4 6.47163L8 2.47163Z"
            fill="#b5b5b5"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="8" height="8" fill="white" transform="translate(8) rotate(90)" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <transition name="dropdown">
      <div
        v-if="menuShow"
        class="dropdown__content"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UiDropdown",
  data () {
    return {
      menuShow: false
    };
  },
  beforeDestroy () {
    document.removeEventListener("click", this.close);
  },
  mounted () {
    document.addEventListener("click", this.close);
  },
  methods: {
    toggleUserBarMenu () {
      this.menuShow = !this.menuShow;
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.menuShow = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  font-size: 16px;

  &__toggle {
    //color: var(--color-primary);
    cursor: pointer;
    user-select: none;
    //padding: 15px 26px;
    //border-radius: 12px;
    //border: 1px solid var(--color-dark);
    //transition: background-color .2s ease-in-out;

    &--open {
      //background-color: var(--color-dark);
    }
  }

  &__content {
    transition: top 150ms ease, opacity 150ms ease;
    z-index: 5;
    padding: 15px 20px;
    position: absolute;
    background: var(--color-dark);
    right: 0;
    width: 220px;
    border-radius: 12px;
    top: 100%;
    opacity: 1;

    @include respond-before("md") {
      top: calc(100% + 11px);
    }

    &.dropdown-enter-active,
    &.dropdown-leave-active {
      top: 150%;
      opacity: 0;
    }
  }
}
</style>
