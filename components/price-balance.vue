<template>
  <div :class="['price', `price--${align}`]">
    <div class="price-row">
      <img src="~/assets/img/tokens/shrk.svg" class="price-row__icon" alt="">
      <span class="price-row__value">
        <template v-if="shrk > -1">
          {{ shrk.toLocaleString("en-US", $LOCALESTRING_CRYPTO(1, 3)) }}
        </template>
        <img v-else src="~/static/images/spinner.gif" style="height: 18px;" alt="">
        SHRK
      </span>
    </div>
    <div class="price-row price-row--small">
      <div class="price-highlight">
        <img src="~/assets/img/tokens/bnb.svg" class="price-row__icon" alt="">
        <span class="price-row__value">
          <template v-if="busd > -1">
            {{ busd.toLocaleString("en-US", $LOCALESTRING_CRYPTO(1, 3)) }}
          </template>
          <img v-else src="~/static/images/spinner.gif" style="height: 12px;" alt="">
          BUSD
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PriceBalance",
  props: {
    mode: {
      type: String,
      default: "balance",
      validator (value) {
        return ["balance", "price"].includes(value);
      }
    },
    busd: {
      type: [Number, String],
      default: 0
    },
    shrk: {
      type: [Number, String],
      default: 0
    },
    align: {
      type: String,
      default: "right",
      validator (value) {
        return ["left", "right"].includes(value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.price {

  &.mobile {

  }

  &.desktop {
    display: none;

    @include respond-before("md") {
      display: flex;
      flex-flow: column wrap;
      margin-right: 20px;
    }
  }

  &-row {
    $row: &;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;

    @include respond-before("lg") {
      font-size: 14px;
    }
    @include respond-before("xl") {
      font-size: 18px;
    }

    .price--left & {
      text-align: left;
    }

    .price--right & {
      text-align: right;
    }

    &__icon,
    &__value {
      display: inline-block;
      vertical-align: middle;
    }

    &__icon {
      width: 33px;
      margin-right: 9px;

      @include respond-before("md") {
        width: 21px;
        margin-right: 6px;
      }
    }

    &--small {
      #{$row}__icon {
        width: 14px;
        margin-right: 2px;
      }
    }
  }

  &-highlight {
    background: linear-gradient(90deg, #101f64 0%, #203696 77.04%);
    border-radius: 50px;
    padding: 3px 7px 3px 3px;
    color: #8bbaff;
    font-size: 12px;
    font-weight: 500;
    margin-top: 6px;
    line-height: 1em;
    display: inline-block;
  }

}
</style>
