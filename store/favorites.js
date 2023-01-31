export const state = () => ({
  traits: []
});

export const mutations = {
  /* Добавить в избранное */
  add (state, payload) {
    if (state.traits.includes(payload)) {
      return;
    }
    state.traits.push(payload);
  },
  /* Удалить из избранного */
  remove (state, payload) {
    const index = state.traits.indexOf(payload);
    if (index > -1) {
      state.traits.splice(index, 1);
    }
  }
};

export const actions = {};

export const getters = {
  traits: s => s.traits ?? []
};
