<template>
  <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.52801 18.1588L2.41399 11.0051L0 13.4325L9.52801 23.0137L30 2.42746L27.586 0L9.52801 18.1588Z"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
  name: "UiIconDone",
  props: {
    fill: {
      type: String,
      default: "#363636"
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
