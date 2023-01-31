<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__left">
        <div v-if="false" class="footer__nav">
          <a
            v-for="(item, idx) in footerNav"
            :key="idx"
            :href="item.url"
            target="_blank"
            class="footer__nav-link"
          >
            {{ item.label }}
          </a>
        </div>
        <div class="copyright">
          <p class="copyright__text">
            JSC "SharkRace" registered in Lithuania (No. 305956133) Vilnius, Eišiškių Sodų 18-oji, g. 11
            <br><br>© {{ year }} SharkRace. All Rights Reserved
          </p>
        </div>
      </div>
      <div class="footer__right">
        <div
          v-if="support"
          class="support"
        >
          <a
            :href="support.url"
            class="btn btn-support"
            v-text="support.label"
          />
        </div>
        <div class="socials">
          <a
            v-for="(item, icon, idx) in SOCIALS"
            :key="idx"
            :href="item.url"
            target="_blank"
            class="socials-item"
            :title="icon"
          >
            <img :src="require(`assets/img/social_icons/${icon}.svg`)">
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { SOCIALS } from "~/global";

export default {
  name: "SiteFooter",
  data () {
    return {
      footerNav: [
        { label: "Support", url: "https://sharkrace.com/#popup:contact" },
        { label: "Terms & conditions", url: "https://sharkrace.com/terms-conditions" },
        { label: "WhitePaper", url: "https://drive.google.com/file/d/1C8tACRYbfBgGEFSiyNyst34seejGUKwg/view?usp=sharing" }
      ]
    };
  },
  computed: {
    SOCIALS () {
      Object.filter = (obj, predicate) =>
        Object.assign(...Object.keys(obj)
          .filter(key => predicate(obj[key]))
          .map(key => ({ [key]: obj[key] })));

      return Object.filter(SOCIALS, item => !!item);
    },
    year () {
      return new Date().getFullYear().toString();
    },
    support () {
      return this.footerNav.find(e => e.label === "Support");
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.footer {
  color: #fff;
  margin-top: auto;
  padding: 20px 0;
  background: var(--color-primary);

  .container {
    text-align: center;

    @include respond-before("lg") {
      display: flex;
      text-align: left;
      align-items: center;
    }
  }

  &__left {

  }

  &__right {
    margin-left: auto;
    margin-top: 30px;

    @include respond-before("lg") {
      margin-top: 0;
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include respond-before("pre-md") {
      flex-direction: row;
    }

    @include respond-before("lg") {
      justify-content: flex-start;
    }

    &-link {
      color: #fff;
      text-align: center;
      margin-bottom: 10px;

      @include respond-before("pre-md") {
        text-align: left;
        margin-bottom: 0;
      }

      &:not(:last-child) {
        &:after {
          display: none;

          @include respond-before("pre-md") {
            content: '|';
            display: inline-block;
            margin: 0 20px;
          }
        }
      }
    }
  }

  .socials {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
    justify-content: center;

    @include respond-before("lg") {
      margin-top: 0;
      justify-content: flex-end;
    }

    &-item {
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 5px 15px;

      @include respond-before("sm") {
        margin: 0 5px;
      }
      @include respond-before("md") {
        margin: 0 10px;
      }
      @include respond-before("lg") {
        &:hover {
          img {
            transform: scale(1.125);
          }
        }
      }

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }

      img {
        max-width: 25px;
        transition: transform .15s ease-in-out;

        @include respond-before("xs") {
          max-width: 30px;
        }
        @include respond-before("sm") {
          //max-width: 40px;
        }
      }
    }
  }
}

.copyright {
  &__text {
    line-height: 1.55em;
    font-size: 12px;
  }
}

.support {
  margin-left: auto;

  @include respond-before("md") {
    margin-right: 30px;
  }
}

.btn-support {
  color: #fff;
  font-size: 12px;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 12px;
}

</style>
