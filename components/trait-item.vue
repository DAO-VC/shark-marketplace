<template>
  <div
    :class="[
      'item',
      {'item--selected': selected},
      {'item--favorites': isFav},
      {'item--disabled': disabled},
      {'item--blurred': isBlurred}
    ]"
    :data-id="item.id"
  >
    <span :class="['item__fig', {'item__fig--remove': isRemove}]">
      <!-- Иконка удаления -->
      <svg
        v-if="isRemove"
        class="item__remove"
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M44.449 22.2245C44.449 34.4987 34.4987 44.449 22.2245 44.449C9.95024 44.449 0 34.4987 0 22.2245C0 9.95024 9.95024 0 22.2245 0C34.4987 0 44.449 9.95024 44.449 22.2245ZM10.4572 15.1545L15.1709 10.4407L22.2415 17.5112L29.2952 10.4575L34.0089 15.1712L26.9552 22.2249L34.0261 29.2958L29.3123 34.0096L22.2414 26.9387L15.1539 34.0262L10.4402 29.3125L17.5277 22.225L10.4572 15.1545Z"
          fill="#c0c5df"
        />
      </svg>
      <!-- Трейт -->
      <template v-else>
        <!-- изображение трейта -->
        <img
          v-for="(img, key) in images"
          :key="key"
          data-not-lazy
          :src="'https://market-api.sharkrace.com' + img.url"
          alt=""
          :title="selected ? 'Remove item' : ''"
        >

        <!-- Одеть/Снять -->
        <button class="item-tools item-tools-toggle" @click="selectTrait">
          <svg
            width="32"
            height="40"
            viewBox="0 0 32 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0L10 2H0V6H6H26H32V2H22L20 0H12ZM2 10V36C2 38.2 3.8 40 6 40H26C28.2 40 30 38.2 30 36V10H2Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <!-- Favorite -->
        <button
          v-if="isLogged"
          :class="['item-tools', 'item-tools-favorites', 'item-favorites', {'item-favorites--active': isFav }]"
          :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
          @click="isFav ? removeFromFavorites() : addToFavorites()"
        >
          <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.6023 7.455C19.114 8.65266 16.7425 11.0019 13.441 14.1803L13.3614 14.257C12.5307 15.0576 11.7498 15.8103 11.209 16.3683C10.8835 16.6907 10.465 16.875 10 16.875C9.535 16.875 9.1165 16.6907 8.791 16.3683C8.20975 15.7925 7.41925 15.0094 6.559 14.1803C3.2575 10.9789 0.886 8.62962 0.39775 7.455C0.11875 6.76405 -0.0207504 6.02703 0.00249961 5.26699C0.0722496 2.77955 1.93225 0.614568 4.44325 0.107869C5.88066 -0.19016 7.24597 0.13075 8.53056 1.05349C9.03289 1.41432 9.52287 1.86718 10 2.41105C10.4771 1.86718 10.9671 1.41432 11.4694 1.05349C12.754 0.13075 14.1193 -0.19016 15.5568 0.107869C18.0678 0.614568 19.9277 2.77955 19.9975 5.26699C20.0208 6.02703 19.8813 6.76405 19.6023 7.455Z"
              fill="transparent"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.1507 2.06622C14.0583 1.83971 12.8794 2.16156 11.5035 3.73L10 5.44376L8.49655 3.73C7.12059 2.16156 5.94173 1.83971 4.84929 2.06622L4.83886 2.06838C3.20497 2.39809 2.04436 3.80207 2.00171 5.32305L2.00157 5.32814C1.98731 5.794 2.07066 6.25033 2.24581 6.69005C2.24845 6.69574 2.255 6.70936 2.26702 6.7314C2.28467 6.76377 2.31077 6.8082 2.34778 6.86555C2.42289 6.98195 2.52932 7.13063 2.67402 7.31455C2.96519 7.68466 3.36616 8.14061 3.88044 8.68754C4.90965 9.7821 6.29363 11.1371 7.94922 12.7425C8.72277 13.4881 9.43956 14.1959 9.99687 14.7477C10.5401 14.1984 11.2431 13.5209 11.956 12.8339L12.0539 12.7395C13.7091 11.146 15.0922 9.79736 16.1196 8.70482C16.6327 8.15909 17.0323 7.70329 17.322 7.33254C17.466 7.14834 17.5718 6.99914 17.6465 6.88208C17.6832 6.82441 17.7093 6.77952 17.7269 6.7466C17.742 6.71858 17.7487 6.70351 17.75 6.70044C17.928 6.25752 18.0128 5.79767 17.9984 5.32814L17.9983 5.32305C17.9556 3.80207 16.795 2.39806 15.1611 2.06835L15.1507 2.06622ZM19.6023 7.455C19.114 8.65266 16.7425 11.0019 13.441 14.1803L13.3614 14.257C12.5307 15.0576 11.7498 15.8103 11.209 16.3683C10.8835 16.6907 10.465 16.875 10 16.875C9.535 16.875 9.1165 16.6907 8.791 16.3683C8.20975 15.7925 7.41925 15.0094 6.559 14.1803C3.2575 10.9789 0.886 8.62962 0.39775 7.455C0.11875 6.76405 -0.0207504 6.02703 0.00249961 5.26699C0.0722496 2.77955 1.93225 0.614568 4.44325 0.107869C5.88066 -0.19016 7.24597 0.13075 8.53056 1.05349C9.03289 1.41432 9.52287 1.86718 10 2.41105C10.4771 1.86718 10.9671 1.41432 11.4694 1.05349C12.754 0.13075 14.1193 -0.19016 15.5568 0.107869C18.0678 0.614568 19.9277 2.77955 19.9975 5.26699C20.0208 6.02703 19.8813 6.76405 19.6023 7.455Z"
              fill="transparent"
            />
          </svg>
        </button>

        <!-- Animated flag -->
        <span v-if="isAnimated" class="item-tools item-tools-video" title="Animated">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.1642 5.5181L18.6799 4.83743L12.8451 9.03164C12.6264 9.18903 12.4976 9.44084 12.4976 9.71625C12.4976 9.98774 12.6264 10.2395 12.8451 10.4009L18.6799 14.5951C18.9338 14.7761 19.2697 14.8036 19.547 14.658C19.8243 14.5164 20 14.2252 20 13.9105V5.5181C20 5.20334 19.8243 4.91612 19.547 4.77054C19.2697 4.6289 18.9338 4.6525 18.6799 4.83349L19.1642 5.5181H18.3324V12.2816L14.7627 9.71625L19.6446 6.20271L19.1642 5.5181Z"
              fill="#0BF5FE"
            />
            <path
              d="M2.49951 4.68005H11.6657C12.1265 4.68005 12.4976 5.05776 12.4976 5.5181V13.9105C12.4976 14.3747 12.1226 14.7485 11.6657 14.7485H2.49951C2.03866 14.7485 1.66764 14.3708 1.66764 13.9105V5.5181C1.66764 5.05383 2.04257 4.68005 2.49951 4.68005V3C1.11697 3 0 4.12528 0 5.5181V13.9105C0 15.3033 1.11697 16.4286 2.49951 16.4286H11.6657C13.0482 16.4286 14.1652 15.3033 14.1652 13.9105V5.5181C14.1652 4.12528 13.0482 3 11.6657 3H2.49951V4.68005Z"
              fill="#0BF5FE"
            />
          </svg>
        </span>
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: "TraitItem",
  props: {
    item: {
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
  data () {
    return {
      loaded: false,
      list: [],
      imgs: []
    };
  },
  computed: {
    /** Это нулевой трейт? Нулевой === снять трейт с акулы */
    isRemove () {
      return this.item.id === 0 || this.item.trait === 0;
    },

    /** Изображения трейта(-ов) */
    images () {
      return this.$offline ? "" : this.item?.images?.x150 ?? {}; // TODO: Offline
    },

    /** В избранном */
    isFav () {
      const favTraits = this.$store.getters["favorites/traits"];
      return favTraits.includes(this.item.id);
    },

    /** Пользователь авторизован? */
    isLogged () {
      return !!this.$store.getters["user/signerAddress"];
    },

    /** Анимированный трейт */
    isAnimated () {
      return this.item.trait >= 200;
    },

    /** Размытый трейт (недоступный) */
    isBlurred () {
      return Object.prototype.hasOwnProperty.call(this.item, "blurred");
    }
  },
  methods: {
    /** Добавить в избранное */
    addToFavorites () {
      console.log("add");
      this.$store.commit("favorites/add", this.item.id);
    },

    /** Удалить из избранного */
    removeFromFavorites () {
      console.log("remove");
      this.$store.commit("favorites/remove", this.item.id);
    },

    /** Надеть/снять трейт */
    selectTrait () {
      this.$emit("select-trait", this.item);
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  $item: &;
  user-select: none;
  position: relative;

  &:not(#{$item}--disabled) {
    cursor: pointer;
  }

  &:hover:not(#{$item}--selected) #{$item}__fig {
    background-color: #132163;
  }

  &--selected #{$item}__fig {
    background: rgba(var(--color-secondary-rgb), .4);
    border: 2px solid rgba(var(--color-secondary-rgb), .8);
    box-shadow: 0 0 16px rgba(var(--color-secondary-rgb), 0.78);
  }

  &--disabled {
    cursor: default;
    //pointer-events: none;
  }

  &--blurred {
    cursor: default;
    pointer-events: none;

    img {
      filter: blur(10px);
    }
  }

  &__fig {
    position: relative;
    border-radius: 10px;
    background-color: #1d318b;
    transition: background-color .2s ease;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    &--remove {
      background-color: #ae5744;
    }

    &:before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    & > img,
    & > svg {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
    }
  }

  &__remove {
    width: 10vw;

    @include respond-before("sm") {
      width: 7vw;
    }
    @include respond-before("pre-md") {
      width: 6vw;
    }
    @include respond-before("md") {
      width: 4vw;
    }
    @include respond-before("lg") {
      width: auto;
    }
  }

  &__title {
    text-align: center;
    font-size: 14px;
    color: rgba(#fff, .7);
    margin-top: 10px;
    text-transform: uppercase;
  }

  &-tools {
    position: absolute;
    transition: opacity .2s ease-in-out;

    &-favorites {
      top: 7px;
      right: 7px;

      @include respond-before("md") {
        #{$item}:not(#{$item}--favorites) & {
          visibility: hidden;
          opacity: 0;
        }
        #{$item}:not(#{$item}--favorites):hover & {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    // Снять
    &-toggle {
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;

      svg {
        width: 22px;
        filter: drop-shadow(0 0 5px rgba(#c0c5df, 1));
        visibility: hidden;
        opacity: 0;

        #{$item}--selected & {
          visibility: visible;
          opacity: 1;
        }

        @include respond-before("md") {
          #{$item}--selected & {
            visibility: hidden;
            opacity: 0;
          }
          #{$item}--selected:hover & {
            visibility: visible;
            opacity: 1;
          }
        }


        path {
          fill: #f7763b;
        }
      }
    }

    // Иконка анимированного трейта
    &-video {
      top: 7px;
      left: 7px;
      margin: 0;
    }
  }

  &-favorites {
    $favorites: &;
    width: 16px;
    cursor: pointer;

    svg {
      max-width: 100%;
    }

    svg path {
      fill: var(--color-secondary);
    }

    &:not(#{$favorites}--active) svg path:nth-of-type(1) {
      fill: transparent;
    }
  }
}
</style>
