<template>
  <div
    v-if="referrer.indexOf('sharkrace.club')>-1"
    style="padding: 10px; text-align: center; margin-top: 200px; background: red;"
  >
    <div>
      WARNING! Domain sharkrace.club was stolen !!!!! All information there is fake. Go to official
      <a href="https://sharkrace.com">sharkrace.com</a>
    </div>
  </div>
  <div v-else class="public-layout">
    <site-header />
    <div class="site-content">
      <Nuxt ref="nuxt" />
    </div>
    <site-footer />
  </div>
</template>

<script>
import SiteHeader from "~/components/siteHeader.vue";
import SiteFooter from "~/components/siteFooter.vue";
import VGlobalMixin from "~/mixins";

export default {
  components: {
    SiteHeader,
    SiteFooter
  },
  mixins: [VGlobalMixin],
  data () {
    return {
      referrer: ""
    };
  },
  mounted () {
    this.referrer = document.referrer;
  }
};
</script>

<style lang="scss" scoped>

</style>
