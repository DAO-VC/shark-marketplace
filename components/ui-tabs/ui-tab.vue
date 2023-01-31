<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>

<script>
export default {
  name: "UiTab",
  props: {
    name: {
      type: String,
      default: "",
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false
    };
  },
  mounted () {
    this.isActive = this.selected;
  }
};
</script>

<style scoped>

</style>
