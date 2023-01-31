<template>
  <div class="site-content">
    <div class="container text-center">
      <div class="box">
        <h1 class="title">
          Error {{ error.statusCode }}
        </h1>
        <div class="desc" style="margin-bottom: 50px;">
          {{ error.message }}
        </div>
        <nuxt-link to="/" class="btn btn-solid">
          {{ $t("GO_HOME") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageError",
  props: {
    error: {
      type: Object,
      default () {
        return {};
      }
    }
  }
};
</script>

<style lang="scss"></style>
