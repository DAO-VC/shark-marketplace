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

export interface RegProjectDto {
  /**
   * Callback url on your server for hooks
   * @example https://my-site.com/hooks/paymnet
   */
  callbackUrl: string;
  /**
   * Coefficient for extract TOKENS / CRYPTO VALUES from user wallet to project wallet. For example: Coefficient 2: CRYPTO VALUES BE EXTRACTED WHEN VALUES >= GAS PRICE * 2; Default Coefficient is 0 = not be extracting.
   * @example 0
   */
  extractCoefficient: number;
  /**
   * Daily limit USD for withdraw from Project Wallet
   * @example 0
   */
  dailyLimitUSD: number;
  /**
   * Limit for transaction
   * @example 50
   */
  minAmountUSD: number;
  /**
   * Project Name
   * @example My crypto project
   */
  name: string;
}
export declare type ObjectID = object;
export interface Balance {
  /** @example erc20usdt */
  type:
    | "bep20usdt"
    | "bep20busd"
    | "bep20eth"
    | "bep20btc"
    | "bep20trx"
    | "bep20doge"
    | "bep20amc"
    | "bep20sfp"
    | "bep20oro"
    | "bep20icw"
    | "eth"
    | "trx"
    | "bnb"
    | "erc20usdt"
    | "erc20allwin"
    | "erc20zlw"
    | "azo"
    | "trc20usdt";
  /** @example 0.3234 */
  amount: number;
  /** @example eth */
  network: "eth" | "trx" | "bnb";
}
export interface Asset {
  /** @example eth */
  network: "eth" | "trx" | "bnb";
  /** @example 0x76a69209BcF9690253DE44096DE5AC3a89F578fe */
  address: string;
}
export interface Wallet {
  /** @example 6071cede410a056e412e6549 */
  _id: ObjectID;
  balance: Balance[];
  assets: Asset[];
}
export interface Project {
  /**
   * Name of project
   * @example My crypto project
   */
  name: string;
  /**
   * callback url for notification when user payment. You can change this url later by special api method
   * @example https://my-site.com/hooks/payment
   */
  callbackUrl: string;
  /** Yur general wallets of project, where collect all payments on wallets created with your access_token */
  wallet: Wallet;
  /** Coefficient for extract TOKENS / CRYPTO VALUES from user wallet to project wallet. For example: Coefficient 2: CRYPTO VALUES BE EXTRACTED WHEN VALUES >= GAS PRICE * 2; Default Coefficient is 0 = not be extracting. */
  extractCoefficient: number;
  /** Daily limit USD for withdraw from project wallet */
  dailyLimitUSD: number;
  /** Limit for transaction */
  minAmountUSD: number;
}
export interface EditProjectDto {
  /**
   * Callback url on your server for hooks
   * @example https://my-site.com/hooks/paymnet
   */
  callbackUrl: string;
  /**
   * Coefficient for extract TOKENS / CRYPTO VALUES from user wallet to project wallet. For example: Coefficient 2: CRYPTO VALUES BE EXTRACTED WHEN VALUES >= GAS PRICE * 2; Default Coefficient is 0 = not be extracting.
   * @example 0
   */
  extractCoefficient: number;
  /**
   * Daily limit USD for withdraw from Project Wallet
   * @example 0
   */
  dailyLimitUSD: number;
  /**
   * Limit for transaction
   * @example 50
   */
  minAmountUSD: number;
}
export interface ListWalletDto {
  /** sort by date: 1: asc, -1:desc */
  sort?: "asc" | "desc";
  /** offset results */
  offset?: number;
  /** limit of results, max:500 */
  limit?: number;
  /** Include wallets without balance */
  includeBlank?: boolean;
}
export interface Coin {
  /** @example eth */
  network: string;
  /** @example erc20usdt */
  type: string;
  /** @example DOGE */
  symbol: string;
  /** @example 0x281eD86941681f5192e99513a2F8e8f3F27eB6A9 */
  address: string;
  /** @example 18 */
  decimals: number;
  /** @example 21000 */
  gasLimit: number;
  /** @example 15 */
  needConfirmations: number;
}
export interface Currency {
  /** @example ETHUSDT */
  symbol: string;
  /** @example 2000.32 */
  price: number;
}
export interface SendTransactionDto {
  /** type of coin */
  coinType:
    | "bep20usdt"
    | "bep20busd"
    | "bep20eth"
    | "bep20btc"
    | "bep20trx"
    | "bep20doge"
    | "bep20amc"
    | "bep20sfp"
    | "bep20oro"
    | "bep20icw"
    | "eth"
    | "trx"
    | "bnb"
    | "erc20usdt"
    | "erc20allwin"
    | "erc20zlw"
    | "azo"
    | "trc20usdt";
  /** example: 0.01 (eth) or 10 (erc20usdt) */
  amount: number;
  /** Subtract fee from amount or not */
  subtractFee: boolean;
  /** Optional. from address */
  fromAddress?: string;
  /** Optional. to address */
  toAddress?: string;
  /** Optional. from wallet id */
  fromWalletId?: string;
  /** Optional. to wallet id */
  toWalletId?: string;
  /** Optional. comment */
  comment?: string;
}
export interface Transaction {
  /** @format date-time */
  date: string;
  /** Address */
  fromAddress: string;
  /** Address */
  toAddress: string;
  /** Wallet _id */
  fromWalletId: string;
  /** Wallet _id */
  toWalletId: string;
  /** transaction hash */
  hash: string;
  /** reference to original transaction */
  hashReference: string;
  /** is Internal transform, without gasLimit */
  isInternal: boolean;
  /** Amount */
  amount: number;
  /** Fee for transaction */
  fee: number;
  /** block Number */
  blockNumber: number;
  /** type of coin */
  coinType:
    | "bep20usdt"
    | "bep20busd"
    | "bep20eth"
    | "bep20btc"
    | "bep20trx"
    | "bep20doge"
    | "bep20amc"
    | "bep20sfp"
    | "bep20oro"
    | "bep20icw"
    | "eth"
    | "trx"
    | "bnb"
    | "erc20usdt"
    | "erc20allwin"
    | "erc20zlw"
    | "azo"
    | "trc20usdt";
  /** type */
  type: "transfer" | "gasing" | "input" | "output" | "extracting" | "internal";
  /** status of transaction */
  status: "requested" | "transaction" | "pending" | "receipting" | "confirmed" | "fail";
  /** gasing gransaction for extract */
  subTransaction: Transaction;
  /** gas price */
  gasPrice: number;
  /** usd price in moment of transaction */
  usdValueStamp: number;
  /** Subtract fee from amount or not */
  subtractFee: boolean;
  /** Result of transaction */
  description: string;
  /** Additional Commentary of transaction */
  comment: string;
  /** Withdraw requester wallet id */
  fromUserWalletId: string;
}
export interface TransactionDto {
  /** true if success, false if fail */
  status: boolean;
  /** Comment of response */
  message: string;
  /** Transaction */
  transaction: Transaction;
}
export interface ListTransactionDto {
  /** sort by date: 1: asc, -1:desc */
  sort?: "asc" | "desc";
  /** offset results */
  offset?: number;
  /** limit of results, max:500 */
  limit?: number;
  /** filter by from wallet Id */
  fromWalletId?: string;
  /** filter by to wallet Id */
  toWalletId?: string;
  /** filter by from address */
  fromAddress?: string;
  /** filter by to address */
  toAddress?: string;
  /** filter by coin Type */
  coinType?: string;
  /** include to list extractions transactions */
  includeExtractions?: boolean;
  /** include to list gasing transactions */
  includeGasings?: boolean;
  /** return only transactions with comment */
  onlyWithComment?: boolean;
}
export interface StatTransactionDto {
  /** num of operations */
  num?: number;
  /** sum of operations */
  sum?: number;
  /** timestamp of date */
  timestamp?: number;
  /** type of operation */
  type?: string;
}
export interface WalletControllerGetParams {
  walletId: string;
}
export interface WalletControllerFindParams {
  address: string;
}
export interface WalletControllerFormParams {
  walletId: string;
  /** @example trc20usdt, erc20usdt, bep20usdt */
  onlyTypes?:
    | "bep20usdt"
    | "bep20busd"
    | "bep20eth"
    | "bep20btc"
    | "bep20trx"
    | "bep20doge"
    | "bep20amc"
    | "bep20sfp"
    | "bep20oro"
    | "bep20icw"
    | "eth"
    | "trx"
    | "bnb"
    | "erc20usdt"
    | "erc20allwin"
    | "erc20zlw"
    | "azo"
    | "trc20usdt";
  /** Language */
  lang?: "en" | "ru" | "ch" | "es";
  /** 0 - deposit, 1 - withdraw */
  method?: 0 | 1;
  theme?: string;
}
export interface TransactionControllerLast10Params {
  walletId: string;
}
export interface TransactionControllerFeeParams {
  fromWalletId: string;
  coinType:
    | "bep20usdt"
    | "bep20busd"
    | "bep20eth"
    | "bep20btc"
    | "bep20trx"
    | "bep20doge"
    | "bep20amc"
    | "bep20sfp"
    | "bep20oro"
    | "bep20icw"
    | "eth"
    | "trx"
    | "bnb"
    | "erc20usdt"
    | "erc20allwin"
    | "erc20zlw"
    | "azo"
    | "trc20usdt";
  toAddress: string;
}
export declare namespace Project {
  /**
   * @description Регистрация нового проекта для получения apiKey. Для этого метода ключ не нужен
   * @tags project
   * @name ProjectControllerReg
   * @summary Reg new project and get apiKey
   * @request POST:/v1/project/reg
   */
  namespace ProjectControllerReg {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = RegProjectDto;
    type RequestHeaders = {};
    type ResponseBody = Project;
  }
  /**
   * @description Получение объекта текущего проекта
   * @tags project
   * @name ProjectControllerGet
   * @summary get project info
   * @request GET:/v1/project/get
   * @secure
   */
  namespace ProjectControllerGet {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = Project;
  }
  /**
   * @description Изменение адреса колбека для проекта
   * @tags project
   * @name ProjectControllerEdit
   * @summary Change Callback
   * @request POST:/v1/project/edit
   * @secure
   */
  namespace ProjectControllerEdit {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = EditProjectDto;
    type RequestHeaders = {};
    type ResponseBody = Project;
  }
}
export declare namespace Wallet {
  /**
   * @description Создание кошелька со всеми возможными адресами криптовалют
   * @tags wallet
   * @name WalletControllerCreate
   * @summary Create wallet
   * @request POST:/v1/wallet/create
   * @secure
   */
  namespace WalletControllerCreate {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = Wallet;
  }
  /**
   * @description Получение кошелька по id
   * @tags wallet
   * @name WalletControllerGet
   * @summary Get wallet with all balances
   * @request GET:/v1/wallet/get
   * @secure
   */
  namespace WalletControllerGet {
    type RequestParams = {};
    type RequestQuery = {
      walletId: string;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = Wallet;
  }
  /**
   * @description Поиск кошелька по адресу
   * @tags wallet
   * @name WalletControllerFind
   * @summary find wallet by address
   * @request GET:/v1/wallet/find
   * @secure
   */
  namespace WalletControllerFind {
    type RequestParams = {};
    type RequestQuery = {
      address: string;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = Wallet;
  }
  /**
   * No description
   * @tags wallet
   * @name WalletControllerList
   * @summary list of users wallets
   * @request POST:/v1/wallet/list
   * @secure
   */
  namespace WalletControllerList {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = ListWalletDto;
    type RequestHeaders = {};
    type ResponseBody = Wallet[];
  }
  /**
   * No description
   * @tags wallet
   * @name WalletControllerForm
   * @summary redirect to form for payment
   * @request GET:/v1/wallet/form
   */
  namespace WalletControllerForm {
    type RequestParams = {};
    type RequestQuery = {
      walletId: string;
      onlyTypes?:
        | "bep20usdt"
        | "bep20busd"
        | "bep20eth"
        | "bep20btc"
        | "bep20trx"
        | "bep20doge"
        | "bep20amc"
        | "bep20sfp"
        | "bep20oro"
        | "bep20icw"
        | "eth"
        | "trx"
        | "bnb"
        | "erc20usdt"
        | "erc20allwin"
        | "erc20zlw"
        | "azo"
        | "trc20usdt";
      lang?: "en" | "ru" | "ch" | "es";
      method?: 0 | 1;
      theme?: string;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = void;
  }
}
export declare namespace Crypto {
  /**
   * No description
   * @tags crypto
   * @name CryptoControllerGetAll
   * @summary total Info
   * @request GET:/v1/crypto
   */
  namespace CryptoControllerGetAll {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = ObjectID;
  }
  /**
   * No description
   * @tags crypto
   * @name CryptoControllerSupported
   * @summary List of supported crypto currencies
   * @request GET:/v1/crypto/supported
   */
  namespace CryptoControllerSupported {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = Coin[];
  }
  /**
   * No description
   * @tags crypto
   * @name CryptoControllerPrices
   * @summary List of crypto prices
   * @request GET:/v1/crypto/prices
   */
  namespace CryptoControllerPrices {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = Currency[];
  }
  /**
   * No description
   * @tags crypto
   * @name CryptoControllerGasPrices
   * @summary networks gas prices
   * @request GET:/v1/crypto/gasPrices
   */
  namespace CryptoControllerGasPrices {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = ObjectID;
  }
  /**
   * No description
   * @tags crypto
   * @name CryptoControllerBlockNumbers
   * @summary current networks block numbers
   * @request GET:/v1/crypto/blockNumbers
   */
  namespace CryptoControllerBlockNumbers {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = ObjectID;
  }
}
export declare namespace Transaction {
  /**
   * No description
   * @tags transaction
   * @name TransactionControllerSend
   * @summary Send the transaction
   * @request POST:/v1/transaction/send
   * @secure
   */
  namespace TransactionControllerSend {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = SendTransactionDto;
    type RequestHeaders = {};
    type ResponseBody = TransactionDto;
  }
  /**
   * No description
   * @tags transaction
   * @name TransactionControllerRepeat
   * @summary Send the transaction
   * @request POST:/v1/transaction/repeat
   * @secure
   */
  namespace TransactionControllerRepeat {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = SendTransactionDto;
    type RequestHeaders = {};
    type ResponseBody = TransactionDto;
  }
  /**
   * No description
   * @tags transaction
   * @name TransactionControllerList
   * @summary list transactions
   * @request POST:/v1/transaction/list
   * @secure
   */
  namespace TransactionControllerList {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = ListTransactionDto;
    type RequestHeaders = {};
    type ResponseBody = Transaction[];
  }
  /**
   * No description
   * @tags transaction
   * @name TransactionControllerLast10
   * @summary list last 10 transactions by walletId
   * @request GET:/v1/transaction/last10
   */
  namespace TransactionControllerLast10 {
    type RequestParams = {};
    type RequestQuery = {
      walletId: string;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = Transaction[];
  }
  /**
   * No description
   * @tags transaction
   * @name TransactionControllerStat
   * @summary stat for chart
   * @request GET:/v1/transaction/stat
   * @secure
   */
  namespace TransactionControllerStat {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = StatTransactionDto[];
  }
  /**
   * No description
   * @tags transaction
   * @name TransactionControllerFee
   * @summary estimate fee
   * @request GET:/v1/transaction/fee
   */
  namespace TransactionControllerFee {
    type RequestParams = {};
    type RequestQuery = {
      fromWalletId: string;
      coinType:
        | "bep20usdt"
        | "bep20busd"
        | "bep20eth"
        | "bep20btc"
        | "bep20trx"
        | "bep20doge"
        | "bep20amc"
        | "bep20sfp"
        | "bep20oro"
        | "bep20icw"
        | "eth"
        | "trx"
        | "bnb"
        | "erc20usdt"
        | "erc20allwin"
        | "erc20zlw"
        | "azo"
        | "trc20usdt";
      toAddress: string;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = boolean;
  }
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export declare type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}
export declare class HttpClient<SecurityDataType = unknown> {
  instance: AxiosInstance;
  private securityData;
  private securityWorker?;
  private secure?;
  private format?;
  constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  private mergeRequestParams;
  private createFormData;
  request: <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams) => Promise<any>;
}
/**
 * @title Wallet33 API
 * @version 1.2
 * @externalDocs /wallet33.json
 * @contact
 *
 * Rate limit - 50 requests per 1 second / IP
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  project: {
    /**
     * @description Регистрация нового проекта для получения apiKey. Для этого метода ключ не нужен
     *
     * @tags project
     * @name ProjectControllerReg
     * @summary Reg new project and get apiKey
     * @request POST:/v1/project/reg
     */
    projectControllerReg: (data: RegProjectDto, params?: RequestParams) => Promise<AxiosResponse<Project>>;
    /**
     * @description Получение объекта текущего проекта
     *
     * @tags project
     * @name ProjectControllerGet
     * @summary get project info
     * @request GET:/v1/project/get
     * @secure
     */
    projectControllerGet: (params?: RequestParams) => Promise<AxiosResponse<Project>>;
    /**
     * @description Изменение адреса колбека для проекта
     *
     * @tags project
     * @name ProjectControllerEdit
     * @summary Change Callback
     * @request POST:/v1/project/edit
     * @secure
     */
    projectControllerEdit: (data: EditProjectDto, params?: RequestParams) => Promise<AxiosResponse<Project>>;
  };
  wallet: {
    /**
     * @description Создание кошелька со всеми возможными адресами криптовалют
     *
     * @tags wallet
     * @name WalletControllerCreate
     * @summary Create wallet
     * @request POST:/v1/wallet/create
     * @secure
     */
    walletControllerCreate: (params?: RequestParams) => Promise<AxiosResponse<Wallet>>;
    /**
     * @description Получение кошелька по id
     *
     * @tags wallet
     * @name WalletControllerGet
     * @summary Get wallet with all balances
     * @request GET:/v1/wallet/get
     * @secure
     */
    walletControllerGet: (query: WalletControllerGetParams, params?: RequestParams) => Promise<AxiosResponse<Wallet>>;
    /**
     * @description Поиск кошелька по адресу
     *
     * @tags wallet
     * @name WalletControllerFind
     * @summary find wallet by address
     * @request GET:/v1/wallet/find
     * @secure
     */
    walletControllerFind: (query: WalletControllerFindParams, params?: RequestParams) => Promise<AxiosResponse<Wallet>>;
    /**
     * No description
     *
     * @tags wallet
     * @name WalletControllerList
     * @summary list of users wallets
     * @request POST:/v1/wallet/list
     * @secure
     */
    walletControllerList: (data: ListWalletDto, params?: RequestParams) => Promise<AxiosResponse<Wallet[]>>;
    /**
     * No description
     *
     * @tags wallet
     * @name WalletControllerForm
     * @summary redirect to form for payment
     * @request GET:/v1/wallet/form
     */
    walletControllerForm: (query: WalletControllerFormParams, params?: RequestParams) => Promise<AxiosResponse<void>>;
  };
  crypto: {
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerGetAll
     * @summary total Info
     * @request GET:/v1/crypto
     */
    cryptoControllerGetAll: (params?: RequestParams) => Promise<AxiosResponse<ObjectID>>;
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerSupported
     * @summary List of supported crypto currencies
     * @request GET:/v1/crypto/supported
     */
    cryptoControllerSupported: (params?: RequestParams) => Promise<AxiosResponse<Coin[]>>;
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerPrices
     * @summary List of crypto prices
     * @request GET:/v1/crypto/prices
     */
    cryptoControllerPrices: (params?: RequestParams) => Promise<AxiosResponse<Currency[]>>;
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerGasPrices
     * @summary networks gas prices
     * @request GET:/v1/crypto/gasPrices
     */
    cryptoControllerGasPrices: (params?: RequestParams) => Promise<AxiosResponse<ObjectID>>;
    /**
     * No description
     *
     * @tags crypto
     * @name CryptoControllerBlockNumbers
     * @summary current networks block numbers
     * @request GET:/v1/crypto/blockNumbers
     */
    cryptoControllerBlockNumbers: (params?: RequestParams) => Promise<AxiosResponse<ObjectID>>;
  };
  transaction: {
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerSend
     * @summary Send the transaction
     * @request POST:/v1/transaction/send
     * @secure
     */
    transactionControllerSend: (
      data: SendTransactionDto,
      params?: RequestParams,
    ) => Promise<AxiosResponse<TransactionDto>>;
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerRepeat
     * @summary Send the transaction
     * @request POST:/v1/transaction/repeat
     * @secure
     */
    transactionControllerRepeat: (
      data: SendTransactionDto,
      params?: RequestParams,
    ) => Promise<AxiosResponse<TransactionDto>>;
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerList
     * @summary list transactions
     * @request POST:/v1/transaction/list
     * @secure
     */
    transactionControllerList: (
      data: ListTransactionDto,
      params?: RequestParams,
    ) => Promise<AxiosResponse<Transaction[]>>;
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerLast10
     * @summary list last 10 transactions by walletId
     * @request GET:/v1/transaction/last10
     */
    transactionControllerLast10: (
      query: TransactionControllerLast10Params,
      params?: RequestParams,
    ) => Promise<AxiosResponse<Transaction[]>>;
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerStat
     * @summary stat for chart
     * @request GET:/v1/transaction/stat
     * @secure
     */
    transactionControllerStat: (params?: RequestParams) => Promise<AxiosResponse<StatTransactionDto[]>>;
    /**
     * No description
     *
     * @tags transaction
     * @name TransactionControllerFee
     * @summary estimate fee
     * @request GET:/v1/transaction/fee
     */
    transactionControllerFee: (
      query: TransactionControllerFeeParams,
      params?: RequestParams,
    ) => Promise<AxiosResponse<boolean>>;
  };
}
