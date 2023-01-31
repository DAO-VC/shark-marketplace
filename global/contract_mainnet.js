/* eslint-disable */
import CARD_SELLER from "./abi/CardSeller.json";
import ABI_CARD from "./abi/Card.json";
import ABI_NFT from "./abi/NFT.json";
import ABI_NFT_SELLER from "./abi/NFTSeller.json";
import ABI_COIN from "./abi/Coin.json";
import ABI_PANCAKE_ROUTER from "./abi/PancakeRouter.json";
import ABI_ERC20 from "./abi/Erc20.json";
import ABI_MULTICALL from "./abi/MULTICALL.json";
import ABI_TRAIT_SELLER from "./abi/TraitSeller.json";

export const MAINNET_CONFIG = {
  chainId: 56,
  defaultProviderUrl: "https://bsc-dataseed.binance.org/",
  coin: {address: "0xdA5b8E908765210485c1C057F464bd9F1F108Bc4", decimals: 18, abi: ABI_COIN},
  trait: {address: "0xCd5e8D6298c97C10aD41E0e4C13BA0F626A4C1E8", decimals: 18, abi: null},
  nft: {address: "0xd0F3F1285F3781D6117c8F631B24671aA4755F5f", decimals: 18, abi: ABI_NFT},
  nftSeller: {address: "0xb528cC62f432EE163F04E8373E2e64a6Fdfe9F10", decimals: 18, abi: ABI_NFT_SELLER},
  traitSeller: {address: "      НЕОБХОДИМО ЗАПОЛНИТЬ   ", decimals: 18, abi: ABI_TRAIT_SELLER},
  cardSeller: {address: "0x038635C7579d7088d858148E4E813a2c51F51f66", decimals: 18, abi: CARD_SELLER},
  mintPassCard: {decimals: 18, abi: ABI_CARD},
  discountCard: {decimals: 18, abi: ABI_CARD},
  whiteListCard: {decimals: 18, abi: ABI_CARD},
  giftCard: { decimals: 18, abi: ABI_CARD},
  pancakeRouter: {address: "0x10ED43C718714eb63d5aA57B78B54704E256024E", decimals: 18, abi: ABI_PANCAKE_ROUTER},
  BUSD: {address: "0xe9e7cea3dedca5984780bafc599bd69add087d56", decimals: 18, abi: ABI_ERC20},
  WBNB: {address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", decimals: 18, abi: ABI_ERC20},
  multiCall: { address: "0x41263cba59eb80dc200f3e2544eda4ed6a90e76c", decimals: 18, abi: ABI_MULTICALL},
};

