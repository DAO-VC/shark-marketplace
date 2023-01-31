// Provide nuxt-axios instance to use same configuration across the whole project
export default $axios => store => ({
  getTraitList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "image/trait/list/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /* Получить список всех трейтов в магазине */
  getMarketTraitList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "trait/list/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /* Получить список акул пользователя по ID кошелька */
  getUserSharks (signerAddress, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      `nft/shark/list/${signerAddress}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /* Купить акулу с новыми трейтами */
  sharkUpdateApprove (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "nft/shark/update/approve",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getImage (id, size = 150, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      `image/trait/${size}/${id}.png`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  // Base methods
  request (type, path, data, promiseFuncSuccess, promiseFuncFail) {
    const config = {};
    config.headers = {
      Authorization: "Bearer " + store.getters.token
    };

    // console.log("API Request", type, path, data);

    if (type === "post") {
      $axios.$post(`/api/${path}`, data, config).then((response) => {
        if (promiseFuncSuccess) {
          promiseFuncSuccess(response);
        }
      }).catch((exceptData) => {
        if (exceptData.response) {
          if (promiseFuncFail) {
            promiseFuncFail(exceptData.response.data);
          } else {
            console.log(exceptData.response.data);
          }
        }
      });
    } else if (type === "get") {
      if (data) {
        config.params = data;
      }
      $axios.$get(`/api/${path}`, config).then((response) => {
        if (promiseFuncSuccess) {
          promiseFuncSuccess(response);
        }
      }).catch((exceptData) => {
        if (exceptData) {
          if (promiseFuncFail) {
            promiseFuncFail(exceptData.response.data);
          } else {
            console.log(exceptData);
          }
        }
      });
    }
  }
});
