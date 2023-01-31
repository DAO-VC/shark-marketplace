<template>
  <div v-if="show" class="cookies-banner-wrap">
    <div class="cookies-banner">
      <div class="cookies-banner__text">
        {{ $t("COOKIES_BANNER") }}
      </div>
      <div class="cookies-banner__act">
        <button
          class="btn btn-solid btn-small"
          @click="cookiesAccept"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookiesBanner",
  data () {
    return {
      show: false,
      cookieName: "cookieAccepted"
    };
  },
  mounted () {
    const cookies = this.$cookies.get(this.cookieName);
    this.show = cookies === undefined;
  },
  methods: {
    cookiesAccept () {
      this.show = false;
      this.$cookies.set(this.cookieName, true, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cookies-banner-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 15px;
}

.cookies-banner {
  background-color: var(--body-bg);
  box-shadow: 0 4px 16px rgb(162 162 175 / 16%);
  padding: var(--input-padding-x);
  border-radius: 7px;
  width: 100%;
  margin: auto;
  max-width: 600px;

  @include respond-before("md") {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__text {
    flex: 1;
    font-size: 14px;

    @include respond-before("md") {
      font-size: 16px;
      padding-left: 10px;
    }
  }

  &__act {
    @include respond-to("md") {
      margin-top: 15px;
      .btn {
        width: 100%;
        max-width: 100%;
      }
    }
    @include respond-before("md") {
      margin-left: 10px;
    }
  }
}
</style>
