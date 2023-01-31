<template>
  <div class="default">
    <site-header />
    <div class="site-content">
      <Nuxt ref="nuxt" />
    </div>
    <site-footer />
  </div>
</template>

<script>
import VGlobalMixin from "~/mixins";
import SiteHeader from "~/components/siteHeader.vue";
import SiteFooter from "~/components/siteFooter.vue";

export default {
  components: {
    SiteHeader,
    SiteFooter
  },
  mixins: [VGlobalMixin]
};
</script>

<style lang="scss" scoped>
</style>
