<template>
  <div>
    <div class="secret-room secret-room--top">
      Creation mode
    </div>
    <div class="secret-room secret-room--bottom">
      <button @click="download" v-html="visible ? 'Close &times;' : 'Get my shark data'" />

      <div v-if="visible" class="m-t-20">
        <p class="m-b-10 color-secondary">
          Скопируйте код из поля и сохраните в файл <b>sharks.json</b> или <b>sharks.txt</b> и отправьте его разработчику.
        </p>
        <textarea
          v-model="code"
          readonly=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecretRoom",
  data () {
    return {
      visible: false
    };
  },
  computed: {
    code () {
      return JSON.stringify({ data: this.sharks });
    },
    sharks () {
      return this.$store.getters["sharks/sharks"];
    }
  },
  methods: {
    download () {
      this.visible = !this.visible;
    }
  }
};
</script>

<style scoped lang="scss">
.secret-room {
  position: fixed;
  left: 10px;
  padding: 20px;
  background: #1e1e1e;
  max-width: 420px;
  font-size: 14px;
  z-index: 99999999999;
  border-radius: var(--border-radius);
  color: #fff;

  &--top {
    top: 10px;
    font-weight: bold;
    color: var(--color-secondary);
  }

  &--bottom {
    bottom: 10px;
  }

  textarea {
    width: 100%;
    height: 100px;
    border: 0;
    background: #333;
    padding: 5px;
    resize: none;
  }

  button {
    font-weight: 700;
  }
}
</style>
