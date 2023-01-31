<template>
  <div
    v-click-outside="closeUiSelect"
    :class="[
      'ui-input-text',
      { 'ui-input-text--floating': floating },
      { 'ui-input-text--is-focus': isFocus },
      { 'ui-input-text--focused': isFocused },
      { 'ui-input-text--append': hasAppend },
      { 'ui-input-text--disabled': disabled }
    ]"
  >
    <div class="ui-input-text__input">
      <input
        v-bind="$attrs"
        :value="value"
        :readonly="disabled"
        @focus="onFocus"
        @blur="onBlur($event)"
        @input="$emit('input', $event.target.value)"
      >
    </div>
    <label v-html="label" />
    <div v-if="hasAppend" class="ui-input-text__append">
      <slot name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: "UiTextField",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: null
    },
    floating: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFocused: false,
      isFocus: false,
      temp: null
    };
  },
  computed: {
    focused: {
      get () {
        return this.isFocused;
      },
      set (value) {
        this.isFocused = value;
      }
    },
    hasAppend () {
      return this.$slots.append;
    }
  },
  watch: {
    value () {
      this.focused = !!this.value || this.value === 0;
    }
  },
  methods: {
    onFocus () {
      this.isFocus = (this.focused = true);
    },
    onBlur (event) {
      this.$emit("blur", event);
      this.focused = !!((this.value === null ? "" : this.value).toString()).length;
      this.isFocus = false;
    },
    closeUiSelect () {
      this.$emit("close-select");
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-input-text {
  $self: &;
  color: inherit;
  display: flex;
  position: relative;
  align-items: stretch;
  width: 100%;
  border-bottom: 1px solid #252525; // var(--color-gray);
  outline: none;
  background: transparent;
  transition: border-color .5s ease;
  border-radius: 0;
  resize: none;
  box-shadow: none;
  appearance: none;
  padding: 0 var(--input-padding-x-mob);

  @include respond-before('md') {
    padding: 0 var(--input-padding-x);
  }

  &__input {
    width: 100%;
    flex: 1 1 auto;
    padding: var(--input-padding-y-mob) 0;

    @include respond-before('md') {
      padding: var(--input-padding-y) 0;
    }
  }

  &__append {
    padding-left: 15px;
  }

  &--focused#{$self}--floating {
    #{$self}__input {
      padding: calc(var(--input-padding-y-mob) + 3px) 0 calc(var(--input-padding-y-mob) - 3px);

      @include respond-before('md') {
        padding: calc(var(--input-padding-y) + 3px) 0 calc(var(--input-padding-y) - 3px);
      }
    }
  }

  input {
    padding: 0;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    background-color: transparent;
    border-style: none;

    &[type="number"] {
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  &--is-focus {
    //border-color: #555860;
  }

  &--append {
    align-items: center;
  }

  &--disabled {
    opacity: .5;
  }

  &.error,
  &--error,
  &--novalid {
    border-color: var(--color-error);
  }

  &--floating {
    > label {
      position: absolute;
      top: 0;
      left: 0;
      color: #7c7c7c;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 100%; // allow textareas
      padding: var(--input-padding-y-mob) var(--input-padding-x-mob);
      pointer-events: none;
      border: 1px solid transparent;
      transform-origin: 0 0;
      transition: opacity var(--transition), transform var(--transition);

      @include respond-before('md') {
        padding: var(--input-padding-y) var(--input-padding-x);
      }
    }

    > input {
      &::placeholder {
        color: transparent;
      }

      //&:focus,
      //&:not(:placeholder-shown),
      //&[contentEditable=true]:empty:not(:focus) {
      //  padding-top: var(--floating-input-padding-t-mob);
      //  padding-bottom: var(--floating-input-padding-b-mob);
      //
      //  @include respond-before('md') {
      //    padding-top: var(--floating-input-padding-t);
      //    padding-bottom: var(--floating-input-padding-b);
      //  }
      //}

      // Duplicated because `:-webkit-autofill` invalidates other selectors when grouped
      &:-webkit-autofill {
        //padding-top: $form-floating-input-padding-t;
        //padding-bottom: $form-floating-input-padding-b;
      }
    }

    &#{$self}--focused {
      > label {
        color: #7c7c7c;
        font-size: .75em;
        transform: translateY(-$floating-input-padding-b-mob);

        @include respond-before('md') {
          transform: translateY(-$floating-input-padding-b);
        }
      }
    }
  }

  &::-webkit-date-and-time-value {
    // Multiply line-height by 1em if it has no unit
    height: 1.5em; // from mixin p();
  }

  // autocomplete fill
  &:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 50px var(--body-bg) !important;
    -webkit-text-fill-color: #fff !important; /* цвет текста */
    color: #fff !important; /* цвет текста */
  }

  // Поле содержит ошибку
  &.error {
    border-color: var(--color-error);

    ~ div.error {
      display: none !important;
    }
  }

  &--view-pass {
    padding-right: 60px;
  }
}
</style>
