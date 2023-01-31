import { MAINNET_CONFIG } from "~/global/contract_mainnet";
import { TESTNET_CONFIG } from "~/global/contract_testnet";

export default ({ app }, inject) => {
  const isTest = process.env.isDev; // (app.$axios.defaults.baseURL).includes("test");
  inject("CONTRACT", isTest ? TESTNET_CONFIG : MAINNET_CONFIG);
};
