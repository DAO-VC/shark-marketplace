<template>
  <div class="cart-item" :data-id="item.id">
    <button
      class="cart-item__remove"
      title="Remove"
      @click="$emit('remove', { folder: item.category, trait: item.trait })"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.3604 14.1537L14.1423 15.3719L4.30426 5.53388L5.52241 4.31573L15.3604 14.1537ZM15.385 5.54686L5.54699 15.3849L4.30426 14.1421L14.1423 4.30413L15.385 5.54686Z"
          fill="white"
        />
      </svg>
    </button>
    <div class="cart-item__top">
      <div class="cart-item__fig">
        <img
          v-for="(img, key) in images"
          :key="key"
          data-not-lazy
          :src="img.url"
          :alt="item.category"
        >
      </div>
      <div class="cart-item__content">
        <div class="cart-item__title">
          {{ item.category }} #{{ item.trait }}
        </div>
        <div class="cart-item__info">
          <div>
            Price: <strong>{{ priceSHRK.toLocaleString("en-US", $LOCALESTRING_CRYPTO(2, 4)) }} SHRK</strong>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="false"
      class="cart-item__btn"
      @click="$emit('buy', item.id)"
    >
      Buy item
    </button>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    priceSHRK:{
      type: Number,
      required: true,
      default: NaN
    },
    item: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    }
  },
  computed: {
    images () {
      return this.item?.images?.x150 ?? {};
    }
  }
};
</script>

<style scoped lang="scss">
.cart-item {
  background: #0b1956;
  border-radius: 20px;
  position: relative;

  &__remove {
    position: absolute;
    top: 10px;
    right: 10px;

    &:hover {
      svg path {
        fill: var(--color-secondary);
      }
    }
  }

  &__top {
    display: flex;
    padding: 10px 10px 0;
  }

  &__fig {
    width: 70px;
    //margin-bottom: -10px;
    position: relative;

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
    }
  }

  &__content {
    width: calc(100% - 70px + 7px);
    margin-left: 7px;
    margin-bottom: 2px;
  }

  &__title {
    text-transform: uppercase;
    color: var(--color-secondary);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 7px;
  }

  &__info {
    font-size: 14px;
    color: rgba(#fff, .8);

    @include respond-before("lg") {
      display: flex;
    }

    strong {
      color: #fff;
      font-size: 16px;
      text-transform: uppercase;
      display: inline-block;
      margin-left: 10px;

      @include respond-before("md") {
        display: block;
        margin-left: 0;
      }
      @include respond-before("lg") {
        display: inline-block;
        margin-left: 4px;
      }
      @include respond-before("xl") {
        margin-left: 10px;
      }
    }
  }

  &__btn {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    color: #095875;
    font-size: 18px;
    font-weight: 700;
    padding: 9px;
    background: linear-gradient(267.41deg, #0bf5fe 30.63%, #1fa4d7 97.84%);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0 0 20px 20px;

    &:hover {
      background: var(--color-secondary);
    }
  }
}
</style>
