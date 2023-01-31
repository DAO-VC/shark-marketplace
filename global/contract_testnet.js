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
import ABI_TRAIT from "./abi/Artifact.json";
/* eslint-disable */


export const TESTNET_CONFIG = {
  chainId: 97,
  defaultProviderUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
  coin: {address: "0xdA5b8E908765210485c1C057F464bd9F1F108Bc4", decimals: 18, abi: ABI_COIN},
  trait: {address: "0xAA37EAF63cb469e13FB659126Cf06dC1B20e9148", decimals: 18, abi: ABI_TRAIT},
  traitSeller: {address: "0x5b800c278f8f7b5E84C2847702f9aa50C11dF3Af", decimals: 18, abi: ABI_TRAIT_SELLER},
  nft: {address: "0xdC0d03700ba7e85fDc94BC1804Ed59B3b582c12E", decimals: 18, abi: ABI_NFT},
  nftSeller: {address: "0x27D2C492ab3AE80399773D7b1f4b87410610f57B", decimals: 18, abi: ABI_NFT_SELLER},
  cardSeller: {address: "0x3BaA9782c9271bBA575DEEcc2fB92d59Ecd4d2c5", decimals: 18, abi: CARD_SELLER},
  mintPassCard: {decimals: 18, abi: ABI_CARD},
  discountCard: {decimals: 18, abi: ABI_CARD},
  whiteListCard: {decimals: 18, abi: ABI_CARD},
  giftCard: {decimals: 18, abi: ABI_CARD},
  pancakeRouter: {address: "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3", decimals: 18, abi: ABI_PANCAKE_ROUTER},
  BUSD: {address: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7", decimals: 18, abi: ABI_ERC20},
  WBNB: {address: "0xae13d989dac2f0debff460ac112a837c89baa7cd", decimals: 18, abi: ABI_ERC20},
  multiCall: {address: "0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C", decimals: 18, abi: ABI_MULTICALL},
};
