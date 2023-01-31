<template>
  <div class="container">
    <div class="box text-center">
      <h1 class="m-b-40">
        {{ $t("404_TITLE") }}
      </h1>
      <div class="lh-135 m-b-50">
        {{ error.message }}
      </div>
      <nuxt-link :to="localePath('index')" class="btn btn-solid btn-solid--secondary">
        {{ $t("GO_HOME") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageError404",
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
