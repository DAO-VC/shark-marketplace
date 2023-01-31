<template>
  <label
    :class="[
      'ui-form-check',
      { 'ui-form-check--checked': checked },
      { 'ui-form-check--disabled': disabled }
    ]"
  >
    <input
      v-bind="$attrs"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :type="type"
      class="ui-form-check__input"
      @change="$emit('change', $event.target.checked)"
    >
    <span class="ui-form-check__label">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: "UiCheck",
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    value: {
      type: [String, Boolean, String],
      default: ""
    },
    type: {
      type: String,
      default: "checkbox",
      validator (value) {
        return ["checkbox", "radio"].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
$checkbox-size: 16px;
$checkbox-size-checked: 14px;

.ui-form-check {
  $self: &;
  $input: #{$self}__input;
  $label: #{$self}__label;
  display: block;
  width: 100%;

  &--inline {
    display: inline-block;
    width: auto;
  }

  &.small {
    font-size: 16px;
  }

  // для элемента label связанного с label
  & > #{$label} {
    display: inline-block;
    user-select: none;
    position: relative;
    min-height: $checkbox-size;
    padding-left: $checkbox-size + 8px;

    // создание в label псевдоэлемента  before со следующими стилями
    &:before {
      content: '';
      top: 3px;
      left: 0;
      flex-grow: 0;
      flex-shrink: 0;
      position: absolute;
      display: inline-block;
      width: $checkbox-size;
      height: $checkbox-size;
      border: 1px solid var(--btn-border);
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: $checkbox-size-checked $checkbox-size-checked;
    }

    &:after {
      content: '';
      margin: auto;
      display: block;
      position: absolute;
      background-color: transparent;
      background-size: contain;

    }
  }

  &--single {
    & > #{$label} {
      padding-left: 0;
      width: $checkbox-size;
    }
  }

  // для элемента input
  & > #{$input} {
    position: absolute;
    z-index: -1;
    opacity: 0;

    // Radio button
    &[type="radio"] + #{$label} {
      &:before,
      &:after {
        border-radius: 50%;
      }

      &:after {
        top: calc((#{$checkbox-size} - #{$checkbox-size-checked - 4}) / 2 + 3px);
        left: calc((#{$checkbox-size} - #{$checkbox-size-checked - 4}) / 2);
        width: $checkbox-size-checked - 4;
        height: $checkbox-size-checked - 4;
      }
    }

    // Checkbox button
    &[type="checkbox"] + #{$label} {
      &:after {
        top: calc((#{$checkbox-size + 2} - #{$checkbox-size-checked}) / 2);
        left: calc((#{$checkbox-size + 2} - #{$checkbox-size-checked}) / 2);
        width: $checkbox-size-checked;
        height: $checkbox-size-checked;
      }
    }

    // стили при наведении курсора на радио
    &:not(:disabled):not(:checked) + #{$label} {
      &:hover {
        cursor: pointer;
      }
    }

    // стили для активной радиокнопки (при нажатии на неё)
    &:not(:disabled):active + #{$label} {
      &:before {
        //background-color: var(--btn-bg-hover);
        border-color: var(--btn-border);
      }
    }

    // стили для радиокнопки, находящейся в фокусе
    &:focus + #{$label} {
      &:before {

      }
    }


    // стили для радиокнопки, находящейся в фокусе и не находящейся в состоянии checked
    &:focus:not(:checked) + #{$label} {
      &:before {
        //border-color: red;
      }
    }

    // стили для радиокнопки, находящейся в состоянии checked
    &[type="checkbox"]:checked + #{$label} {
      &:after {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 13.5L7.5 18L16.5 3.5' stroke='%23ffe600' stroke-width='4' stroke-linecap='square' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }
    }

    &[type="radio"]:checked + #{$label} {
      &:after {
        background-color: var(--color-primary);
      }
    }

    &:checked + #{$label} {
      &:before {
        border-color: var(--btn-border);
      }
    }

    // стили для радиокнопки, находящейся в состоянии disabled
    &:disabled + #{$label} {
      &:before,
      &:after {
        opacity: .6;
      }
    }
  }
}
</style>
