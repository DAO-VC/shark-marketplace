<template>
  <div class="container">
    <h1 class="m-b-40 text-center">
      Generator
    </h1>

    <div class="generator-box">
      <div class="m-b-10">
        <label for="title" class="m-b-10 display-block">
          Заголовок = название категории
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          @input="folder = title"
        >
      </div>
      <div v-if="false" class="m-b-15">
        <label for="folder" class="m-b-10 display-block">
          Название папки
        </label>
        <input
          id="folder"
          v-model="folder"
          type="text"
        >
      </div>
      <div class="m-b-20">
        <span class="inline-labels">
          <label for="randomRarity" class="checkbox">
            <input
              id="randomRarity"
              v-model="randomRarity"
              type="checkbox"
            >
            Рандомный Rarity
          </label>

          <label for="randomPrice" class="checkbox">
            <input
              id="randomPrice"
              v-model="randomPrice"
              type="checkbox"
            >
            Рандомная цена
          </label>
        </span>
      </div>
      <p>
        <button
          class="btn btn-solid"
          :disabled="!title"
          @click="generate"
          v-text="'Generate'"
        />
      </p>
      <pre v-html="output" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageGenerator",
  layout: "public",
  data () {
    return {
      output: [],
      title: "Outfit Right hand",
      folder: "outfit-right-hand",
      randomRarity: false,
      randomPrice: false,
      list: [
        "S52_L11.png",
        "S01_L11.png",
        "S05_L11.png",
        "S11_L11.png",
        "S17_L11.png",
        "S19_L11.png",
        "S27_L11.png",
        "S69_L11.png",
        "S74_L11.png",
        "S91_L11.png"
      ]
    };
  },
  computed: {
    filteredList () {
      return this.list.map(e => e.slice(0, -4));
    }
  },
  methods: {
    generateRandomNumber (min = 0, max = 0.1, toFixed = 4) {
      return (Math.random() * (max - min) + min).toFixed(toFixed);
    },

    generate () {
      this.output = [];
      this.filteredList.map((e, idx) => {
        this.output.push({
          id: e,
          title: `${this.title} ${idx + 1}`,
          category: this.title.toLowerCase(),
          rarity: this.randomRarity ? this.generateRandomNumber(10, 100, 0) : 0,
          price: this.randomPrice ? this.generateRandomNumber(0.001, 0.01) : 0,
          symbol: "busd"
        });

        return e;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.generator-box {
  margin: auto;
  max-width: 600px;
}
input {
  padding: 10px;
  color: #000;
  width: 100%;
  margin-bottom: 10px;
}

.checkbox {
  user-select: none;

  input {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    vertical-align: baseline;
  }
}

.inline-labels {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  label {
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
