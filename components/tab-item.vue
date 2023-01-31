<template>
  <div :class="['tab-item', { 'tab-item--selected' : selected }, { 'tab-item--disabled' : disabled }]">
    <div class="tab-item__img">
      <img src="" :data-src="imageUrl" alt="">
    </div>
    <div class="tab-item__name">
      {{ tabLabel }}
    </div>
  </div>
</template>

<script>
import { LAYERS } from "~/global";

export default {
  name: "TabItem",
  props: {
    tab: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageUrl () {
      return `/categories/${this.tab.category}.png`;
    },
    tabLabel () {
      return LAYERS.find(item => item.category === this.tab.category)?.label ?? "";
    }
  }
};
</script>

<style scoped lang="scss">
.tab-item {
  $self: &;
  text-align: center;
  border-radius: 80px 80px 0 0;
  padding: 5px 5px 0;
  background: linear-gradient(180deg, #101F64 0%, #203696 77.04%);

  &:not(#{$self}--disabled) {
    cursor: pointer;
  }

  &--disabled {
    opacity: .9;
    filter: grayscale(20%);
    pointer-events: none;
  }

  &--selected {
    cursor: default !important;
  }

  &:hover:not(#{$self}--disabled),
  &--selected {
    background: var(--color-primary);
  }

  &__img {
    position: relative;
    background: #fff;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @include respond-before("pre-md") {
      width: 60px;
    }
    @include respond-before("md") {
      width: 50px;
    }
    @include respond-before("lg") {
      width: 60px;
    }
    @include respond-before("xl") {
      width: 70px;
    }

    &:before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

  &__name {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    height: 45px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;

    @include respond-before("sm") {
      height: 54px;
      font-size: 12px;
    }
  }
}
</style>
