<template>
  <div class="sharks-gallery">
    <div class="site-header-text site-header-text--mobile">
      Rarity Gallery
    </div>

    <div class="bar bar--top">
      <div class="bar__pagination">
        <ui-pagination
          v-model="selectedPage"
          :all-items="json.length"
          :page-items="pageItems"
          :max-buttons="maxButtons"
        />
      </div>
      <div class="bar__search">
        <div class="search">
          <input
            v-model="input"
            class="search__input"
            type="number"
            min="1"
            step="1"
            :max="json.length"
            inputmode="numeric"
            @input="onInput"
          >
          <span class="search__label">
            FIND SHARK ID
          </span>
        </div>
      </div>
    </div>

    <div
      :key="json.length+'_'+selectedPage"
      class="gallery"
    >
      <div
        v-for="(item, i) of json.slice(selectedPage*pageItems,selectedPage*pageItems+Math.min(json.length, pageItems)+1)"
        :id="'shark'+Number(item[2]+1)"
        :key="i"
        :class="['gallery__item', {'gallery__item--selected': Number(input) === Number(item[2] + 1)}]"
        :style="{width: `${size}px`, height: `${size}px`}"
      >
        <shark-preview-combine
          :id="item[2]+1"
          :key="selectedPage*pageItems + i"
          :code="item[0]"
          :rarity="item[1]"
          :index="selectedPage*pageItems + i+1"
          @onLoad="onLoadImage"
        />
      </div>
    </div>

    <div class="bar bar--bottom">
      <div class="bar__pagination">
        <ui-pagination
          v-model="selectedPage"
          :all-items="json.length"
          :page-items="pageItems"
          :max-buttons="maxButtons"
        />
      </div>
      <div class="bar__search">
        <div class="search">
          <input
            v-model="input"
            class="search__input"
            type="number"
            min="1"
            step="1"
            :max="json.length"
            inputmode="numeric"
            @input="onInput"
          >
          <span class="search__label">
            FIND SHARK ID
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SharkPreviewCombine from "~/components/shark-preview-combine";
import UiPagination from "~/components/ui/ui-pagination";

export default {
  name: "Sharks",
  components: { UiPagination, SharkPreviewCombine },
  layout: "public",
  data () {
    return {
      json: [],
      loaded: 0,
      scroll: 0,
      input: "",
      size: 164,
      selectedPage: 0,
      pageItems: 100,
      maxButtons: 4,
      maxLineCount: 10,
      windowWidth: 2000,
      windowHeight: 2000
    };
  },
  destroyed () {
    window.removeEventListener("resize", this.onUpdate);
    window.removeEventListener("scroll", this.onUpdate);
  },
  mounted () {
    this.onUpdate();
    window.addEventListener("resize", this.onUpdate);
    window.addEventListener("scroll", this.onUpdate);
    this.$axios.$get("/starter-pack.json").then(this.onJSONLoad);
  },
  methods: {
    onInput () {
      if (this.input >= 20001) {
        this.input = 20001;
      }
      const index = this.json.findIndex(x => Number(x[2] + 1) === Number(this.input));
      if (index === -1) {
        this.selectedPage = 0;
      } else {
        this.selectedPage = Math.floor(index / this.pageItems);
      }
      console.log("input", this.input);
    },
    onUpdate () {
      this.scroll = window.pageYOffset;
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.maxLineCount = Math.floor(this.windowWidth / this.size);
      this.maxColumnCount = Math.floor(this.windowHeight / this.size);
      this.pageItems = this.maxLineCount * this.maxColumnCount - 1;
    },
    onLoadImage () {
      this.loaded++;
    },
    onJSONLoad (array) {
      // const src = event.target.response;
      // const last = array.indexOf("]", array.length - 50);
      // const crop = src.substring(1, last + 1);
      this.json = array.map((x, i) => [x[0], x[1], i]).sort((a, b) => a[1] > b[1] ? -1 : 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
}

.sharks-gallery {
  padding: 0 15px;
}

/* Плитки акул */
.gallery {
  display:flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(180deg, #3655dc 18.75%, #1c349a 100%);

  @include respond-before("md") {
  }
  @include respond-before("lg") {
    padding: 5px;
  }
  @media (min-width: 992px) {
    padding: 0;
  }
  @include respond-before("xl") {
    padding: 10px 5px;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

    @include respond-before("xs") {
      @include respond-to("sm") {
        width: 160px !important;
        height: 160px !important;

        &::v-deep {
          .shark-preview-combine,
          canvas {
            width: 150px !important;
            height: 150px !important;
          }
        }
      }
    }

    @include respond-to("xs") {
      width: 130px !important;
      height: 130px !important;

      &::v-deep {
        .shark-preview-combine,
        canvas {
          width: 120px !important;
          height: 120px !important;
        }
      }
    }

    &--selected {
      animation: zoom-in-out 1s ease-in-out forwards;
      background: rgba(var(--color-secondary-rgb), .8);
      border: 2px solid rgba(var(--color-secondary-rgb), .8);
      box-shadow: 0 0 16px rgba(var(--color-secondary-rgb), 0.78);
    }

    &.zoom {
      background: red;
    }
  }
}

@keyframes zoom-in-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/* Панель с пагинацией и поиском */
.bar {
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  background: linear-gradient(180deg, #3655dc 18.75%, #1c349a 100%);

  @include respond-before("xs") {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &--top {
    margin-bottom: 15px;
  }

  &--bottom {
    margin-top: 15px;
  }

  &__pagination {
    @include respond-to("xs") {
      margin-bottom: 10px;
    }
  }

  &__search {
    margin-left: auto;
  }
}
.search {
  &__label {
    font-weight: 500;

    @include respond-to("sm") {
      font-size: 12px;
    }
  }

  &__input {
    max-width: 100px;
    text-align: center;
    padding: 5px 8px;
    color: #fff;
    border: 1px solid rgba(var(--color-secondary-rgb), .5);
    background: transparent;
    border-radius: 5px;
    margin-right: 10px;
    appearance: none;

    @include respond-to("sm") {
      margin-right: 2px;
    }

    &:focus {
      border-color: var(--color-secondary);
      box-shadow: 0 0 3px 1px rgb(11 245 254 / 60%);
    }
  }
}
</style>
