/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import axios from "axios";
export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
  instance;
  securityData = null;
  securityWorker;
  secure;
  format;
  constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  mergeRequestParams(params1, params2) {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  createFormData(input) {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }
  request = async ({ secure, path, type, query, format, body, ...params }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;
    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};
      body = this.createFormData(body);
    }
    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}
/**
 * @title Wallet33 API
 * @version 1.2
 * @externalDocs /wallet33.json
 * @contact
 *
 * Rate limit - 50 requests per 1 second / IP
 */
export class Api extends HttpClient {
  project = {
    /**
     * @description Регистрация нового проекта для получения apiKey. Для этого метода ключ не нужен
     *
     * @tags project
     * @name ProjectControllerReg
     * @summary Reg new project and get apiKey
     * @request POST:/v1/project/reg
     */
    projectControllerReg: (data, params = {}) =>
      this.request({
        path: `/v1/project/reg`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description Получение объекта текущего проекта
     *
     * @tags project
     * @name ProjectControllerGet
     * @summary get project info
     * @request GET:/v1/project/get
     * @secure
     */
    projectControllerGet: (params = {}) =>
      this.request({
        path: `/v1/project/get`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * @description Изменение адреса колбека для проекта
     *
     * @tags project
     * @name ProjectControllerEdit
     * @summary Change Callback
     * @request POST:/v1/project/edit
     * @secure
     */
    projectControllerEdit: (data, params = {}) =>
      this.request({
        path: `/v1/project/edit`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  wallet = {
    /**
     * @description Создание кошелька со всеми возможными адресами криптовалют
     *
     * @tags wallet
     * @name WalletControllerCreate
     * @summary Create wallet
     * @request POST:/v1/wallet/create
     * @secure
     */
    walletControllerCreate: (params = {}) =>
      this.request({
        path: `/v1/wallet/create`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * @description Получение кошелька по id
     *
     * @tags wallet
     * @name WalletControllerGet
     * @summary Get wallet with all balances
     * @request GET:/v1/wallet/get
     * @secure
     */
    walletControllerGet: (query, params = {}) =>
      this.request({
        path: `/v1/wallet/get`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * @description Поиск кошелька по адресу
     *
     * @tags wallet
     * @name WalletControllerFind
     * @summary find wallet by address
     * @request GET:/v1/wallet/find
     * @secure
     */
    walletControllerFind: (query, params = {}) =>
      this.request({
        path: `/v1/wallet/find`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags wallet
     * @name WalletControllerList
     * @summary list of users wallets
     * @request POST:/v1/wallet/list
     * @secure
     */
    walletControllerList: (data, params = {}) =>
      this.request({
        path: `/v1/wallet/list`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags wallet
     * @name WalletControllerForm
     * @summary redirect to form for payment
     * @request GET:/v1/wallet/form
     */
    walletControllerForm: (query, params = {}) =>
      this.request({
        path: `/v1/wallet/form`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  crypto = {
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerGetAll
     * @summary total Info
     * @request GET:/v1/crypto
     */
    cryptoControllerGetAll: (params = {}) =>
      this.request({
        path: `/v1/crypto`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerSupported
     * @summary List of supported crypto currencies
     * @request GET:/v1/crypto/supported
     */
    cryptoControllerSupported: (params = {}) =>
      this.request({
        path: `/v1/crypto/supported`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerPrices
     * @summary List of crypto prices
     * @request GET:/v1/crypto/prices
     */
    cryptoControllerPrices: (params = {}) =>
      this.request({
        path: `/v1/crypto/prices`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerGasPrices
     * @summary networks gas prices
     * @request GET:/v1/crypto/gasPrices
     */
    cryptoControllerGasPrices: (params = {}) =>
      this.request({
        path: `/v1/crypto/gasPrices`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerBlockNumbers
     * @summary current networks block numbers
     * @request GET:/v1/crypto/blockNumbers
     */
    cryptoControllerBlockNumbers: (params = {}) =>
      this.request({
        path: `/v1/crypto/blockNumbers`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  transaction = {
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerSend
     * @summary Send the transaction
     * @request POST:/v1/transaction/send
     * @secure
     */
    transactionControllerSend: (data, params = {}) =>
      this.request({
        path: `/v1/transaction/send`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerRepeat
     * @summary Send the transaction
     * @request POST:/v1/transaction/repeat
     * @secure
     */
    transactionControllerRepeat: (data, params = {}) =>
      this.request({
        path: `/v1/transaction/repeat`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerList
     * @summary list transactions
     * @request POST:/v1/transaction/list
     * @secure
     */
    transactionControllerList: (data, params = {}) =>
      this.request({
        path: `/v1/transaction/list`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerLast10
     * @summary list last 10 transactions by walletId
     * @request GET:/v1/transaction/last10
     */
    transactionControllerLast10: (query, params = {}) =>
      this.request({
        path: `/v1/transaction/last10`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerStat
     * @summary stat for chart
     * @request GET:/v1/transaction/stat
     * @secure
     */
    transactionControllerStat: (params = {}) =>
      this.request({
        path: `/v1/transaction/stat`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerFee
     * @summary estimate fee
     * @request GET:/v1/transaction/fee
     */
    transactionControllerFee: (query, params = {}) =>
      this.request({
        path: `/v1/transaction/fee`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
