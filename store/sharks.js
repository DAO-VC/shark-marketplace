import { LAYERS } from "~/global";

export const state = () => ({
  key: 0,
  prevTrait: null,
  sharks: [],
  origin: [], // слепки оригинальных акул
  cart: [], // корзина
  folders: [ // Порядок не менять!
    "background",
    "item-back",
    "left-hand",
    "body",
    "right-hand",
    "outfit-left-hand",
    "outfit-body",
    "outfit-right-hand",
    "item-left-hand",
    "item-neck",
    "item-under-right-hand",
    "item-over-right-hand",
    "mouth",
    "item-head",
    "eye",
    "item-nose",
    "foreground"
  ]
});

export const mutations = {
  // Кэшируем пользовательские акулы
  setSharks (state, data) {
    state.sharks = data; // Акулы, с которыми будем проделывать манимуляции
    state.origin = data.map(e => JSON.parse(JSON.stringify(e))); // Слепок оригинальных пользовательских акул
  },
  /** Надеть/Снять трейт на/с акулы */
  setTrait (state, { folder, sharkId, trait, prevTrait, oldRarity }) {
    state.key++; // чтобы реактивно обновлялось
    state.prevTrait = prevTrait; // Сохраняем прерыдущий выбранный трейт

    const originShark = state.origin.find(item => item.id === sharkId); // Оригинальные трейты акулы

    state.sharks.filter(item => item.id === sharkId).map((shark) => {
      // 1. находим позицию нужной категории в глобальном массиве слоёв
      const pos = LAYERS.find(item => item.category === folder);
      // 2. находим индекс
      const index = LAYERS.indexOf(pos);

      // Добавить трейт в корзину
      const addTraitToCart = () => {
        state.cart.filter(item => item.sharkId === sharkId).map((shark) => {
          shark.traits[folder] = trait;
          return shark;
        });
      };

      if (shark.traits[index] === trait.trait) {
        shark.traits[index] = originShark.traits[index]; // Сняли трейт, если он уже надет

        if (state.cart.find(item => item.sharkId === sharkId && item.traits[folder].trait === trait.trait)) {
          delete state.cart.find(item => item.sharkId === sharkId).traits[folder]; // удалили из корзины
        }
      } else {
        shark.traits[index] = trait.trait; // надели трейт
        /* Добавление в корзину */
        // Если такой акулы нет в корзине, добавляем ее
        if (!state.cart.find(item => item.sharkId === sharkId)) {
          state.cart.push({
            sharkId,
            traits: {}
          });
        }
        // Добавили трейт в корзину
        // Если кликнули по трейту акулы, которая уже есть в корзине, добавляем трейт
        addTraitToCart();
      }

      // Сохраняем старое значение Rarity
      shark.oldRarity = oldRarity;
      return shark;
    });
  },
  /** Снять трейт с акулы */
  removeTrait (state, { folder, sharkId, trait }) {
    state.key++;
    console.log("REMOVE", { folder, sharkId, trait });
    const originShark = state.origin.find(item => item.id === sharkId); // Оригинальные трейты акулы
    state.sharks.filter(item => item.id === sharkId).map((shark) => {
      // 1. находим позицию нужной категории в глобальном массиве слоёв
      const pos = LAYERS.find(item => item.category === folder);
      // 2. находим индекс
      const index = LAYERS.indexOf(pos);
      // 3. Сняли трейт
      shark.traits[index] = originShark.traits[index];

      // удалили из корзины
      if (state.cart.find(item => item.sharkId === sharkId && item.traits[folder].trait === trait)) {
        delete state.cart.find(item => item.sharkId === sharkId).traits[folder]; // удалили из корзины
      }

      return shark;
    });
  },
  /** Очистить корзну */
  clearCart (state) {
    state.sharks.map((shark) => {
      const originShark = state.origin.find(item => item.id === shark.id); // Оригинальные трейты акулы
      for (let index = 0; index < 12; index++) {
        shark.traits[index] = originShark.traits[index];
      }
    });

    state.cart = [];
    state.key++;
  }
};

export const actions = {
  setTrait ({ commit }, payload) {
    commit("setTrait", payload);
  },
  removeTrait ({ commit }, payload) {
    commit("removeTrait", payload);
  }
};

export const getters = {
  sharks: s => s.sharks,
  key: s => s.key,
  folders: s => s.folders,
  cart: s => s.cart
};
