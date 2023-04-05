<template>
  <div
    class="shark-preview-combine"
    :style="{ background: randColor }"
  >
    <canvas :id="code" :height="150" :width="150" />
  </div>
</template>
<script>
import { blur } from "~/assets/js/blur";
import { LAYERS } from "~/global";

export default {
  name: "SharkPreviewCombine",
  props: {
    code: {
      type: String,
      default: "0_0_0_0_0_0_0_0_0_0_0_0"
    },
    id: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    traitsInLoading: {
      type: Number,
      default: 0
    },
    rarity: {
      type: Number,
      default: 0
    }
  },
  computed: {
    randColor () {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
      }
      return color + "44";
    },
    filesNames () {
      return this.code.split("_").map((x, i) => this.fileName(i + 1, x));
    }
  },
  mounted () {
    this.load();
  },
  methods: {
    async getImage (x) {
      if (window[x.key]) {
        return window[x.key];
      }
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.src = x.url;
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
      });
      window[x.key] = img;
      return img;
    },

    formatFolder (num) {
      return Number(num) < 10 ? "0" + num : "" + num;
    },

    fileName (category, trait) {
      const CHAR = ([3, 6, 10].includes(Number(category)) ? "B" : "S");
      return CHAR + this.formatFolder(trait) + "_L" + this.formatFolder(category) +
        ".png";
    },

    async load () {
      const canvas = document.getElementById(this.code);
      let context = canvas.getContext("2d");

      const ids = this.code.split("_");
      const urls = LAYERS.map((x, i) => x.ids.map(y => !ids[i]
        ? null
        : {
            layer: y,
            key: y + "_" + ids[i],
            url: "/api/trait/image/150/" + ([3, 6, 10].includes(y) ? "B" : "S") +
              this.formatFolder(ids[i]) + "_L" + this.formatFolder(y) + ".png"
          }))
        .reduce((a, b) => [...a, ...b], [])
        .filter(x => x)
        .sort((a, b) => a.layer < b.layer ? -1 : 1);

      const promises = [];
      for (const x of urls) {
        promises.push(this.getImage(x));
      }

      const images = await Promise.all(promises);

      for (const image of images) {
        // context.imageSmoothingEnabled = true;
        // context.filter = "blur(2px)";
        context.drawImage(image, 0, 0);
        // context.filter = "blur(0px)";
      }
      context = blur(context, 2);
      context.font = "11px Tahoma";
      context.fillStyle = "white";
      context.fillText("#" + this.id, 10, 20);
      context.save();
      context.textAlign = "end";
      context.fillText("" + this.index, 140, 20);
      context.save();
      context.textAlign = "start";
      context.font = "15px Tahoma";
      context.rotate(19);
      context.fillText("RARITY #" + this.rarity.toFixed(2), 35, 120);
      this.$emit("onLoad");
    }
  }
};
</script>
<style lang="scss" scoped>
.shark-preview-combine {
  width: 150px;
  height: 150px;
  overflow: hidden;

  &,
  canvas {
    border-radius: 15px;
  }
}
</style>
