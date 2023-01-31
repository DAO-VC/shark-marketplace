<template>
  <div class="shark">
    <div :class="['shark-figure']">
      <video v-if="isVideoFormat" muted loop autoplay playsinline>
        <source :src="Url" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <img v-else src="" :data-src="Url" :alt="`SHARK #${item.id}`" @error="error">
    </div>
    <!-- <div class="shark-preview">
      <p class="shark-preview__txt">
        First, let's choose the body of the shark
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "SharkPreview",
  props: {
    item: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    },
    isLogged: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isVideoFormat () {
      return this.item.traits.find(item => item >= 200) !== undefined;
    },

    /** Ссылка на изображение собранной акулы */
    Url () {
      if (this.$offline) {
        return ""; // TODO: Offline
      }
      const fileName = this.item.traits.join("_");
      const extension = this.isVideoFormat
        ? "mp4"
        : "jpg";
      return `/api/nft/shark/image/${fileName}.${extension}`;
    }
  },
  methods: {
    /** Ошибка загрузки изображения */
    error () {
      console.log("send error 429...");
      this.$emit("error", true);
    }
  }
};
</script>

<style scoped lang="scss">
.shark {
  margin: 0 auto;

  &-figure,
  &-preview {
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 500px;
  }

  &-figure--no-body,
  &-preview {
    &:before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }

  &-figure {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    img, video {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      margin: auto;
      max-width: 100%;
    }
  }

  &-preview {
    &__txt {
      position: absolute;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 50px;
      opacity: 0.7;
      text-transform: uppercase;
      text-align: center;
      font-size: 1.4rem;
    }
  }

  /* Ассеты (приблуды) акулы */
  &-asset {
    position: absolute;
    top: 0;
    left: 0;

    &--body {
      position: relative;
      z-index: 2;
    }
  }
}
</style>
