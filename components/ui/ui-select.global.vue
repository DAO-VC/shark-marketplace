<template>
  <div
    ref="ui-select"
    v-click-outside="close"
    :class="[
      'ui-select',
      { 'ui-select--disabled' : disabled },
      { 'ui-select--open' : open },
      { 'ui-select--inside' : isInsideElement }
    ]"
    @click="open = !open"
    @close-select="open = false"
  >
    <div class="ui-select__container">
      <div class="ui-select__selected">
        <slot :option="value">
          {{ value }}
        </slot>
      </div>
      <div
        v-if="open"
        class="ui-select__list"
      >
        <div
          v-for="(option, idx) in options"
          :key="idx"
          class="ui-select__item"
          @click="select(option)"
        >
          <slot :option="option">
            {{ option }}
          </slot>
        </div>
      </div>
    </div>
    <!-- suffix -->
    <div
      v-if="suffix"
      class="ui-select__suffix"
      v-text="suffix"
    />
  </div>
</template>

<script>
export default {
  name: "UiSelect",
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Object],
      default () {
        return {};
      }
    },
    options: {
      type: Array,
      default () {
        return [];
      }
    },
    name: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  i18n: {
    messages: {
      "en-US": {
        SElECT: "Select..."
      },
      "ru-RU": {
        SElECT: "Выберите..."
      }
    }
  },
  data () {
    return {
      open: false,
      isInsideElement: false
    };
  },
  mounted () {
    // Если select находится внутри компонента ui-text-field в слоте #append
    if (this.$refs["ui-select"] && this.$refs["ui-select"].closest(".ui-input-text__append")) {
      this.isInsideElement = true;
    }
  },
  methods: {
    select (option) {
      this.$emit("input", option);
    },
    close () {
      this.open = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-select {
  $self: &;

  &:focus,
  &:hover {
    border-color: #fff;
  }

  &__suffix {
    font-size: 14px;
    color: var(--color-gray-light);
  }

  &__container {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    //width: 100%;
    border: 0 solid var(--color-gray);
    outline: none;
    background: transparent;
    transition: border-color 300ms ease;

    #{$self}--open & {
      //border-color: #fff;
    }
  }

  &__selected {
    //width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    overflow: hidden;
    background-image: url("data:image/svg+xml,%3Csvg width='22' height='19' viewBox='0 0 22 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 19L0.607698 0.617023L21.3923 0.617025L11 19Z' fill='%232A54A6'/%3E%3C/svg%3E%0A");
    background-position: right 10px top 50%;
    background-repeat: no-repeat;
    padding: 0 10px;
    padding-right: 40px;
    user-select: none;

    @include respond-before("md") {
      padding: 0 10px;
      padding-right: 50px;
      background-position: right 10px top 50%;
    }

    @include respond-to("sm") {
      background-size: 13px;
    }

    img,
    svg {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }

  &__list {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    right: 0;
    background: #e2e3e9; // var(--color-dark);
    z-index: 3;
    max-height: 300px;
    overflow-x: auto;
    padding-top: 10px;
    border-radius: 0 0 6px 6px;

    @include respond-before("md") {
      max-height: 400px;
    }
  }

  &__item {
    display: block;
    cursor: pointer;
    user-select: none;
    padding: 10px;

    @include respond-before("md") {
      padding: 10px;
    }

    img,
    svg {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }

    &:hover {
      background: #d4d5de; // var(--body-bg);
    }
  }

  &--disabled {
    pointer-events: none;
    cursor: default;
    opacity: .8;
    filter: grayscale(70%);
  }
}
</style>
