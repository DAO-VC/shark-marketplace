export const state = () => ({
  token: null,
  expiresToken: null,
  user: null,
  signerAddress: null,
  balance: {
    bnb: 0,
    busd: 0,
    shrk: 100
  }
});

export const mutations = {
  login (state, data) {
    state.token = data.token;
    state.expiresToken = data.expiresToken;
    state.user = data.user;
  },
  logout (state) {
    state.token = null;
    state.expiresToken = null;
    state.user = null;
  },
  updateUser (state, data) {
    state.user = data;
  },
  setWeb3 (state, { signerAddress }) {
    state.signerAddress = signerAddress;
  },
  updateBalance (state, data) {
    state.balance = data;
  }
};

export const actions = {};

export const getters = {
  token: s => s.token,
  expiresToken: s => s.expiresToken,
  hasToken: s => !!s.token,
  user: s => s.user,
  signerAddress: s => s.signerAddress,
  balance: s => s.balance
};
