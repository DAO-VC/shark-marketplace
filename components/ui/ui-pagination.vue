<template>
  <div class="ui-pagination">
    <!-- <button
      v-if="value > 100"
      class="ui-pagination__item ui-pagination__btn"
      @click="onChangePage(value - 100)"
      v-text="'Prev 100'"
    /> -->
    <!-- <button
      v-if="value > 10"
      class="ui-pagination__item ui-pagination__btn"
      @click="onChangePage(value - 10)"
      v-text="'Prev 10'"
    /> -->
    <button
      v-if="value > 1"
      class="ui-pagination__item ui-pagination__btn"
      @click="onChangePage(value - 1)"
      v-text="'Prev'"
    />
    <!-- <span
      v-for="page of totalPages"
      :key="page"
      class="ui-pagination__pages"
    >
      <button
        v-if="page > value - Math.round(maxButtons / 2) && page < value + Math.round(maxButtons / 2)"
        :class="['ui-pagination__item', 'ui-pagination__btn', {'ui-pagination__btn--active': value === page}]"
        @click="onChangePage(page)"
        v-text="page"
      />
    </span> -->

    <select
      v-model="currentPage"
      class="ui-pagination__item ui-pagination__select"
    >
      <option
        v-for="(page, i) of totalPages"
        :key="i"
        :value="i"
        v-text="i + 1"
      />
    </select>
    <button
      v-if="value < totalPages - 1"
      class="ui-pagination__item ui-pagination__btn"
      @click="onChangePage(value + 1)"
      v-text="'Next'"
    />
    <!-- <button
      v-if="value < totalPages - 10"
      class="ui-pagination__item ui-pagination__btn"
      @click="onChangePage(value + 10)"
      v-text="'Next 10'"
    /> -->
    <!-- <button
      v-if="value < totalPages - 100"
      class="ui-pagination__item ui-pagination__btn"
      @click="onChangePage(value + 100)"
      v-text="'Next 100'"
    /> -->
  </div>
</template>
<script>
export default {
  name: "UiPagination",
  props: {
    value: {
      type: Number,
      default: 0
    },
    pageItems: {
      type: Number,
      default: 10
    },
    maxButtons: {
      type: Number,
      default: 6
    },
    allItems: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {};
  },
  computed: {
    currentPage: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit("input", value);
      }
    },
    totalPages () {
      return Math.floor(this.allItems / this.pageItems);
    }
  },
  methods: {
    onChangePage (page) {
      this.currentPage = page;
      this.$emit("input", page);
    }
  }
};
</script>
<style lang="scss" scoped>
.ui-pagination {
  display: flex;
  //justify-content: center;
  align-items: center;
  font-size: 11px;

  @include respond-before("lg") {
    font-size: 13px;
  }

  &__item {
    display: inline-block;
    margin: 0 2px;
  }

  &__btn,
  &__select {
    display: block;
    padding: 5px 7px;
    color: var(--color-secondary);
    background: transparent;
    border: 1px solid var(--color-secondary);
    user-select: none;
    cursor: pointer;
    border-radius: 5px;
    min-width: 24px;
    height: 31px;
    appearance: none;
    text-transform: uppercase;

    &:hover {
      color: var(--color-secondary);
      background-color: rgba(var(--color-secondary-rgb), .1);
      box-shadow: 0 0 3px 1px rgb(11 245 254 / 60%);
    }

    &--active {
      color: #2a54a6;
      background: var(--color-secondary);
    }
  }

  &__select {
    text-align: center;
    min-width: auto;
    padding: 5px 20px 5px 5px;
    color: #2a54a6;
    background: var(--color-secondary) url("data:image/svg+xml;charset=utf-8,%3Csvg width='6' height='3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 .572L5.292 0 3 1.855.708 0 0 .572 3 3 6 .572z' fill='%232a54a6'/%3E%3C/svg%3E") no-repeat right 5px center;
    background-size: 0.65em;

    &:hover {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='6' height='3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 .572L5.292 0 3 1.855.708 0 0 .572 3 3 6 .572z' fill='%230BF5FE'/%3E%3C/svg%3E");
    }

    @include respond-before("lg") {
      //display: none;
    }
  }

  &__pages {
    display: none;
    @include respond-to("lg") {
    }
  }
}
</style>
