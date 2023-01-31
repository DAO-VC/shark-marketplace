<template>
  <div class="dev-component">
    <p>
      <button class="btn btn-solid" @click="clearStore">
        Clear
      </button>
    </p>
    <p>
      Network:
      <strong
        class="color-success"
        v-text="$isTestnet ? 'Testnet' : 'Mainnet'"
      />
    </p>
  </div>
</template>

<script>
export default {
  name: "DevComponent",
  methods: {
    clearStore () {
      this.$store.commit("sharks/resetSharks");
    }
  }
};
</script>

<style lang="scss" scoped>
.dev-component {
  position: fixed;
  bottom: 10%;
  right: 10px;
  padding: 20px;
  background: #1e1e1e;
  font-size: 14px;
  z-index: 99999999999;
  border-radius: var(--border-radius);
  color: #fff;

  p {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
