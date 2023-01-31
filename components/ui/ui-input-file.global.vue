<template>
  <div
    :class="[
      'ui-input-file',
      {
        'ui-input-file--disabled' : disabled,
        'ui-input-file--multiple' : multiple,
      }
    ]"
  >
    <label
      class="ui-input-file__label"
    >
      {{ labelString }}
      <input
        v-bind="$attrs"
        ref="input-file"
        :disabled="disabled"
        type="file"
        :multiple="multiple"
        tabindex="-1"
        @change="onChange"
      >
    </label>
    <ul
      v-if="errors.length"
      class="list m-t-10"
    >
      <li
        v-for="(error, i) in errors"
        :key="i"
        class="error-text"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>
<i18n>
{
  "en": {
    "LABEL": "Select file",
    "LABEL_MULTIPLE": "Select files",
    "LABEL_SELECTED": "Selected files:"
  },
  "ru": {
    "LABEL": "Выберите файл",
    "LABEL_MULTIPLE": "Выберите файлы",
    "LABEL_SELECTED": "Выбрано файлов:"
  }
}
</i18n>
<script>
export default {
  name: "UiInputFile",
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    maxSize: {
      type: [String, Number],
      default: ""
    }
  },
  data () {
    return {
      files: [],
      errors: []
    };
  },
  computed: {
    generateId () {
      return `input-file-${this.randomId()}`;
    },
    labelString () {
      if (this.files.length === 0) {
        return this.multiple ? this.$t("LABEL_MULTIPLE") : this.$t("LABEL");
      } else {
        return this.$t("LABEL_SELECTED") + " " + this.files.length;
      }
    }
  },
  methods: {
    randomId (max = 1000) {
      return Math.floor(Math.random() * max);
    },
    humanFileSize (size) {
      const i = Math.floor(Math.log(size) / Math.log(1000));
      return (size / Math.pow(1000, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
    },
    onChange (event) {
      this.errors = [];
      const files = this.$refs["input-file"].files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.maxSize) {
          let msg = this.$t("MAX_UPLOAD_FILE_SIZE");
          msg = msg.replace("MAXFILESIZE", this.humanFileSize(this.maxSize));
          this.errors.push(msg);
        } else {
          this.files.push(files[i]);
        }
      }
      this.$emit("change-input-file", event);
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-input-file {
  $self: &;

  &--disabled {
    opacity: .5;

    #{$self}__label {
      cursor: default;
    }
  }

  &__label {
    @include inputText;
    color: inherit;
    display: flex;
    position: relative;
    align-items: stretch;
    cursor: pointer;

    &:hover {
      border-color: #fff;
    }
  }

  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
}
</style>
