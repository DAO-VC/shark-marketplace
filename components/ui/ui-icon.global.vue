<template>
  <span class="ui-icon">
    <svg
      v-if="name === 'swap'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 2l5.5 5.49-1.42 1.41L8 5.81V21H6V5.81L2.92 8.9 1.51 7.49 7 2zM17 22l-5.5-5.5 1.42-1.41L16 18.18V3h2v15.18l3.09-3.09 1.41 1.41L17 22z"
        :fill="fill"
      />
    </svg>
    <svg
      v-else-if="name === 'done'"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="24"
      viewBox="0 0 30 24"
      fill="none"
    >
      <path
        d="M9.52801 18.1588L2.41399 11.0051L0 13.4325L9.52801 23.0137L30 2.42746L27.586 0L9.52801 18.1588Z"
        :fill="fill"
      />
    </svg>
  </span>
</template>

<script>
export default {
  name: "UiIcon",
  props: {
    name: {
      type: String,
      default: "done",
      validator (value) {
        return ["done", "swap", "add-to-favorites", "remove-favorites"].includes(
          value);
      }
    },
    fill: {
      type: String,
      default: "#363636"
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-icon {
  display: inline-block;

  svg {
    max-width: 100%;
  }
}
</style>
