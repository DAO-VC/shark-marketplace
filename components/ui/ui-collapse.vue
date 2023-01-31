<template>
  <div :class="['ui-collapse', { 'ui-collapse--open' : show }]">
    <slot name="trigger">
      <button
        class="btn btn-outline btn-icon ui-collapse__trigger"
        @click="toggleCollapse"
      >
        {{ $t(label) }}
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 1.47163L7.05666 0.52832L4 3.58498L0.943344 0.52832L4.35604e-07 1.47163L4 5.47163L8 1.47163Z"
            fill="#C5C5C5"
          />
        </svg>
      </button>
    </slot>

    <transition name="slide">
      <div v-show="show" class="ui-collapse__body m-t-20">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UiCollapse",
  props: {
    label: {
      type: String,
      default: "READMORE"
    }
  },
  data () {
    return {
      show: false
    };
  },
  methods: {
    toggleCollapse () {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-collapse {
  $self: &;

  &__trigger {
    &:hover {
      color: var(--color-primary);

      svg path {
        fill: var(--color-primary);
      }
    }

    #{$self}--open & {
      svg {
        transform: scale(-1, -1);
      }
    }
  }
}

.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 1000px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
