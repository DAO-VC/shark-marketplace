<template>
  <div>
    <header
      :class="['site-header', {'site-header--sticky': sticked}]"
      :style="{transform: `translateY(-${scrollY}px)`}"
    >
      <div class="site-header-container container">
        <a
          href="https://sharkrace.com/"
          class="site-header-item site-header-logo"
        >
          <img
            data-not-lazy
            src="~/assets/img/logo.png"
            alt="SharkRace"
          >
        </a>

        <!--
        <nav
          v-if="false"
          class="site-header-item site-header-menu site-header-menu--desktop"
        >
          <ul class="site-header-menu__list">
            <li
              v-for="(item, idx) in menuItems"
              :key="idx"
              class="site-header-menu__item"
            >
              <a
                v-if="externalLink(item.url)"
                :href="item.url"
                :class="['site-header-menu__link']"
                v-text="item.title"
              />
              <nuxt-link
                v-else
                :exact="!!localePath('/')"
                no-prefetch
                :to="item.url"
                :class="['site-header-menu__link', {'active' : $route.matched[0].path.replace('/', '') === item.url}]"
                active-class="active"
                v-text="item.title"
              />
            </li>
          </ul>
        </nav> -->

        <!-- Title -->
        <div class="site-header-item site-header-text site-header-text--desktop">
          <template v-if="isGalleryPage">
            Rarity Gallery
          </template>
          <template v-else>
            Rarity upgrade
            <span>demo</span>
          </template>
        </div>

        <div class="site-header-item site-header-right">
          <price-balance
            v-if="isLogged"
            :busd="balanceBUSD"
            :shrk="balanceSHRK"
            class="desktop"
          />

          <span
            v-for="(item, i) in links"
            :key="i"
            class="site-header-btn-item"
          >
            <!-- Внешняя ссылка -->
            <a
              v-if="externalLink(item.url) || item.tagA"
              :href="item.url"
              :target="item.target"
              :class="['site-header-btn', 'site-header-btn--desktop', `site-header-btn--${item.class}`]"
              v-text="item.label"
            />
            <!-- Простая внутренняя ссылка -->
            <nuxt-link
              v-else
              :exact="!!localePath('/')"
              no-prefetch
              :target="item.target"
              :to="item.url"
              :class="['site-header-btn', 'site-header-btn--desktop', `site-header-btn--${item.class}`]"
              active-class="active"
              v-text="item.label"
            />
          </span>

          <!-- Connect to wallet -->
          <span v-if="isHomePage" class="site-header-btn-item">
            <button
              v-if="isLogged"
              class="site-header-btn site-header-btn--connect"
              @click="onDisconnect"
              v-text="'Disconnect'"
            />
            <button
              v-else
              class="site-header-btn site-header-btn--connect"
              @click="onConnect"
              v-text="'Connect'"
            />
          </span>

          <button
            class="btn-burger"
            @click="toggleMenu"
          >
            <img src="~/assets/img/burger.svg" alt="">
          </button>
        </div>
      </div>
    </header>

    <!-- Мобильное меню -->
    <div
      v-if="menuVisible"
      class="mobile-bar-overlay"
      @click="toggleMenu"
    />
    <div :class="['mobile-bar', {'mobile-bar--opened': menuVisible}]">
      <div class="mobile-bar__in">
        <button class="mobile-bar__close" @click="toggleMenu">
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99282 19.8772L19.8773 6.99279C20.7525 6.19164 22.093 7.53086 21.2915 8.407L8.40704 21.2915C7.53185 22.0926 6.19136 20.7534 6.99282 19.8772Z"
              fill="#CEF2EE"
            />
            <path
              d="M19.8773 21.2915L6.99288 8.407C6.19173 7.53182 7.53095 6.19132 8.40709 6.99279L21.2915 19.8773C22.0927 20.7524 20.7535 22.0929 19.8773 21.2915Z"
              fill="#CEF2EE"
            />
          </svg>
        </button>
        <div class="mobile-bar__logo">
          <img src="~/assets/img/logo.png" alt="SharkRace">
        </div>

        <price-balance
          v-if="isLogged"
          :busd="balanceBUSD"
          :shrk="balanceSHRK"
          align="left"
          class="mobile"
        />

        <ul class="mobile-bar__menu mobile-menu">
          <li
            v-for="(item, idx) in menuItems"
            :key="idx"
            class="site-header-menu__item"
          >
            <a
              v-if="externalLink(item.url)"
              :href="item.url"
              :class="['site-header-menu__link']"
              v-text="item.title"
            />
            <nuxt-link
              v-else
              :exact="!!localePath('/')"
              no-prefetch
              :to="item.url"
              :class="['site-header-menu__link', {'active' : $route.matched[0].path.replace('/', '') === item.url}]"
              active-class="active"
              v-text="item.title"
            />
          </li>
        </ul>

        <!-- Buttons -->
        <div class="m-t-30">
          <span
            v-for="(item, i) in links"
            :key="i"
          >
            <!-- Внешняя ссылка -->
            <a
              v-if="externalLink(item.url) || item.tagA"
              :href="item.url"
              :target="item.target"
              :class="['m-b-10', 'site-header-btn', `site-header-btn--${item.class}`]"
              v-text="item.label"
            />
            <!-- Простая внутренняя ссылка -->
            <nuxt-link
              v-else
              :exact="!!localePath('/')"
              no-prefetch
              :target="item.target"
              :to="item.url"
              :class="['m-b-10', 'site-header-btn', `site-header-btn--${item.class}`]"
              active-class="active"
              v-text="item.label"
            />
          </span>
        </div>

        <div class="mobile-bar__bottom">
          <!-- Соц сети -->
          <div class="social-links m-b-30">
            <a
              v-for="(item, icon, idx) in socialFiltered"
              :key="idx"
              :href="item.url"
              class="social-links__item"
            >
              <img
                :src="require(`assets/img/social_icons_filled/${icon}.svg?inline`)"
              >
            </a>
          </div>

          <!-- Нижний бар -->
          <ul class="mobile-bar__menu-add m-b-30">
            <li>
              <a href="https://sharkrace.com/#popup:contact">
                Support
              </a>
            </li>
          </ul>

          <!-- Copyright -->
          <div class="mobile-bar__txt">
            © All rights reserved. 2022
          </div>
        </div>
      </div>
    </div>

    <ui-modal
      v-if="showModal"
      :icon="modal"
      :close-btn="!modalHideClose"
      max-width="460px"
      @close="closeModal"
    >
      <template #title>
        {{ modalLabels.title }}
      </template>

      <div class="desc">
        <ul v-if="errors.length" class="list list--none">
          <li v-for="(error, idx) in errors" :key="idx" class="">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="text-center m-l-a m-r-a m-t-80" style="max-width: 700px;">
        <template v-if="modalHideClose">
          <div>
            <ui-preloader />
          </div>
        </template>
        <button
          v-else
          class="btn btn-solid btn-solid--secondary btn-wide btn-big"
          @click="closeModal"
          v-text="modalLabels.closeBtn"
        />
      </div>
    </ui-modal>
  </div>
</template>

<script>
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { SOCIALS } from "~/global";
import DEMOSHARKS from "~/static/demo-sharks.json";
import PriceBalance from "~/components/price-balance";

export default {
  name: "SiteHeader",
  components: { PriceBalance },
  data () {
    return {
      scrollY: 0,
      headerStickyOffset: 80,
      chainId: this.$CONTRACT.chainId,
      showModal: false,
      modalHideClose: false,
      modalLabels: {
        title: "",
        closeBtn: "Ok"
      },
      modal: null,
      errors: [],
      menuVisible: false,

      instance: null,
      signer: null,
      provider: null,
      web3Modal: null,
      interval: 0,
      balanceBNB: -1,
      balanceBUSD: -1,
      balanceSHRK: -1
    };
  },
  computed: {
    /* Простое меню */
    menuItems () {
      const items = [
        {
          title: "FAQ",
          target: "_self",
          url: "-1",
          show: false
        },
        {
          title: "Whitepaper",
          target: "_self",
          url: "https://drive.google.com/file/d/1w5w0Lhb0WTaoD5r5KyETJVzNZk1Sqhw7/view",
          show: true
        }
      ];

      return items.filter(item => item.show);
    },
    /* Меню из кнопок */
    links () {
      const items = [
        {
          url: "/",
          label: "Go Back",
          target: "_self",
          class: "outline",
          show: this.isGalleryPage,
          tagA: true
        },
        {
          url: "/gallery",
          label: "Rarity gallery",
          target: "_self",
          class: "outline",
          show: this.isHomePage,
          tagA: true
        },
        {
          url: "https://sharkrace.com/nft-sale",
          label: "NFT Sale",
          target: "_self",
          class: "solid",
          show: this.isHomePage
        }
      ];
      return items.filter(item => item.show);
    },
    changeNetwork () {
      return this.$t("MSG_CHANGE_NETWORK").replace("%XXX", this.$CONTRACT.chainId);
    },
    sticked () {
      return this.scrollY > this.headerStickyOffset;
    },
    socialFiltered () {
      const social = {};

      for (const prop in SOCIALS) {
        if (["twitter", "telegram", "discord"].includes(prop)) {
          social[prop] = SOCIALS[prop];
        }
      }
      return social;
    },
    /* Кошелек пользователя */
    signerAddress: {
      get () {
        return this.$store.getters["user/signerAddress"];
      },
      set (signerAddress) {
        this.$store.commit("user/setWeb3", { signerAddress });
      }
    },
    isGalleryPage () {
      return this.$route.matched.length && this.$route.matched[0].path.replace("/", "") === "gallery";
    },
    isLogged () {
      return !!this.signerAddress;
    },
    isHomePage () {
      return this.$route.matched.length && this.$route.matched[0].path.replace("/", "") === "";
    }
  },
  beforeDestroy () {
    window.clearInterval(this.interval);
  },
  async mounted () {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          bridge: "https://bridge.walletconnect.org",
          rpc: {
            97: "https://data-seed-prebsc-2-s3.binance.org:8545/",
            56: "https://bsc-dataseed.binance.org/"
          }
        }
      }
    };

    this.web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });

    if (this.web3Modal.cachedProvider) {
      this.instance = await this.web3Modal.connect();
      this.provider = new ethers.providers.Web3Provider(this.instance);
      this.signer = this.provider.getSigner();
      window.provider = this.provider;
    }

    /* Получаем баланс пользователя */
    if (this.chainId === 97) {
      setTimeout(this.getBalance, 500);
      this.interval = window.setInterval(this.getBalance, 3000);
    }
  },
  methods: {
    fetchAccountData () {
      this.$nuxt.$emit("connect", {
        signerAddress: this.signerAddress
      });
    },

    async refreshAccountData () {
      await this.fetchAccountData(this.provider);
    },

    async onConnect () {
      try {
        this.instance = await this.web3Modal.connect();
        this.provider = new ethers.providers.Web3Provider(this.instance);
        this.signer = this.provider.getSigner();
        this.signerAddress = await this.signer.getAddress(); // "0x3cb28bD5917FC63f61158970E2f94f9628A28f42"; //
        window.provider = this.provider;

        // const network = await this.provider.getNetwork();
        // console.log("signerAddress", this.signerAddress, network?.chainId ?? null);
      } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
      }

      // Subscribe to accounts change
      this.instance.on("accountsChanged", (accounts) => {
        console.log("accountsChanged", accounts);
        this.signerAddress = accounts[0];
        this.fetchAccountData();
      });

      // Subscribe to chainId change
      this.instance.on("chainChanged", (chainId) => {
        console.log("chainChanged", chainId);
        this.fetchAccountData();
      });

      // Subscribe to provider connection
      this.instance.on("connect", (info) => {
        console.log("connect", info);
        this.fetchAccountData();
      });

      // Subscribe to provider disconnection
      this.instance.on("networkChanged", (chainId) => {
        console.log("networkChanged", chainId);
        this.handleChainChanged(chainId);
        this.fetchAccountData();
      });

      await this.refreshAccountData();
    },

    async onDisconnect () {
      console.log("Killing the wallet connection");
      // console.log(this.provider.connection.url.includes("eip-1193"));

      // TODO: Which providers have close method?
      if (this.provider && this.provider.close) {
        await this.provider.close();

        // If the cached provider is not cleared,
        // WalletConnect will default to the existing session
        // and does not allow to re-scan the QR code with a new wallet.
        // Depending on your use case you may want or want not his behavir.
        await this.web3Modal.clearCachedProvider();
      }
      this.provider = null;
      this.signerAddress = null;
      window.provider = null;

      await this.web3Modal.clearCachedProvider();

      if (window.localStorage.getItem("walletconnect")) {
        window.localStorage.removeItem("walletconnect");
      }

      this.$nuxt.$emit("connect", {
        signerAddress: this.signerAddress
      });
      this.$store.commit("sharks/setSharks", DEMOSHARKS);
      window.location.reload();
    },

    /** Переключить сеть вручную */
    async switchBinanceNetwork () {
      const { ethereum } = window;
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x61" }] // chainId must be in hexadecimal numbers
        });
      } catch (e) {
        if (e.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x61",
                  chainName: "Smart Chain - Testnet",
                  nativeCurrency: {
                    name: "Binance",
                    symbol: "BNB", // 2-6 characters long
                    decimals: 18
                  },
                  blockExplorerUrls: ["https://testnet.bscscan.com"],
                  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"]
                }
              ]
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.log(e);
      }
    },

    /** Обработчик слушателя смены сети */
    handleChainChanged (chainId) {
      console.log("chain changed to", Number(chainId));
      if (Number(chainId) !== this.$CONTRACT.chainId) {
        this.modalLabels.title = "Wrong network";
        this.errors = [this.changeNetwork];
        this.openModal("error", true);
      } else {
        this.chainId = chainId;
        this.closeModal();
      }
    },

    /** Баланс пользователя */
    async getBalance () {
      if (!this.signerAddress) {
        return;
      }
      const busd = new ethers.Contract(this.$CONTRACT.BUSD.address, this.$CONTRACT.BUSD.abi, this.provider);
      const balanceBUSD = await busd.balanceOf(this.signerAddress);
      this.balanceBUSD = Number(ethers.utils.formatUnits(balanceBUSD, this.$CONTRACT.BUSD.decimals));

      const shrk = new ethers.Contract(this.$CONTRACT.coin.address, this.$CONTRACT.coin.abi, this.provider);
      const balanceSHRK = await shrk.balanceOf(this.signerAddress);
      this.balanceSHRK = Number(ethers.utils.formatUnits(balanceSHRK, this.$CONTRACT.coin.decimals));
      this.balanceBNB = Number(ethers.utils.formatEther(await this.signer.getBalance()));
      const balance = {
        bnb: this.balanceBNB,
        busd: this.balanceBUSD,
        shrk: this.balanceSHRK
      };
      this.$store.commit("user/updateBalance", balance);
    },



    /** Проверка внешней ссылки */
    externalLink (link) {
      return link.startsWith("http");
    },

    /** Открыть модальное окно */
    openModal (modal, hideClose, labels) {
      this.showModal = true;
      this.modal = modal;
      this.modalHideClose = hideClose;
      if (labels) {
        this.modalLabels = labels;
      }
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = false;
      this.modal = "";
      this.modalHideClose = false;
      this.errors = [];
      this.modalLabels = {
        title: "",
        closeBtn: "Ok, close"
      };
    },

    /** Переключить мобильное меню */
    toggleMenu () {
      this.menuVisible = !this.menuVisible;
      const body = document.querySelector("body");
      if (this.menuVisible) {
        body.style.overflowY = "hidden";
      } else {
        body.style.overflowY = "";
      }
    },

    /** Редирект на главную */
    toHome () {
      this.$router.push(this.localePath("index"));
    }
  }
};
</script>

<style lang="scss" scoped>
.site-header {
  position: relative;
  z-index: 10;
  transition: padding $transition, transform $transition;

  &--transparent {
    background-color: transparent;
  }

  &--sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding: 0;
    background: #0c0d22;
    transform: translateY(0) !important;
  }

  .container {
    display: flex;
    align-items: center;
    min-height: 80px;
  }

  &.site-header--sticky.site-header--default {
    padding-top: 25px;
    background: transparent;
  }

  &--default {
    @include respond-before("lg") {
      background: transparent;
    }
  }

  &-item {
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
  }

  /* #Text */
  &-text {
    // look common.scss
  }

  /* #Logo */
  &-logo {
    position: relative;
    z-index: 25;
    margin-right: 10px;

    @include respond-before("md") {
      margin-right: 30px;
    }

    svg,
    img {
      @include respond-to("xs") {
        width: 100px;
      }
      @include respond-before("xs") {
        width: 150px;
      }
      @include respond-before("sm") {
        width: 195px;
      }
    }
  }
}

.site-header-userbar-mobile {
  @include respond-before("md") {
    display: none;
  }
}

.site-header-space {
  margin-left: auto;
  margin-right: auto;
}

.site-header-right {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin-left: auto;

  .site-header-btn-item {
    margin: 0 10px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.site-header-menu {
  $self: &;

  @include respond-to("lg") {
    display: none;
  }

  &__list {
    list-style-type: none;

    @include respond-before("lg") {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    @include respond-to("lg") {
      text-align: center;
    }
  }

  &__item {
    margin: 15px auto;
    padding: 0;
    @include fontRoboto("medium");
    line-height: 1em;
    text-transform: uppercase;

    @include respond-before("lg") {
      margin: 0;
      font-size: 14px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__link {
    position: relative;
    color: #fff;
    display: block;
    padding: 10px 20px; // 15px 26px
    border-radius: 12px;

    @include respond-before("lg") {
      padding: 15px;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 6px;
        height: 6px;
        background: var(--color-secondary);
        border-radius: 50%;
        margin: auto;
        visibility: hidden;
      }
    }
    @include respond-before("xl") {
      padding: 15px 20px;
    }

    &:hover {
      color: #fff;

      &:after {
        visibility: visible;
      }
    }

    &.active {
      color: var(--color-secondary);
      font-weight: 600;
    }
  }

  &--desktop {
    @include respond-to("lg") {
      display: none;
    }
  }
}

/** Мобильное меню */
.mobile-bar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 9999;
  width: 100%;
  max-width: 300px;
  background: #0c0d22;
  transform: translateX(100%);
  transition: transform $transition;

  &--opened {
    transform: translateX(0);
  }

  &-overlay {
    background: #0c0d22;
    opacity: .6;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 998;
  }

  &__in {
    padding: 42px 25px 25px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  &__close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 40px;
    height: 40px;
    z-index: 10;
  }

  &__logo {
    max-width: 130px;
    margin-bottom: 25px;
    margin-left: -12px;
  }

  &__menu {
    list-style: inside none;

    .site-header-menu__item {
      margin: 5px 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .site-header-menu__link {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &__menu-add {
    list-style: inside none;

    li {
    }

    a {
      color: var(--color-secondary);
    }
  }

  &__bottom {
    margin-top: auto;
    padding-top: 40px;
  }

  &__txt {
    font-size: 14px;
  }
}

.btn-burger {
  width: 40px;
  height: 40px;
  padding: 0;
  position: relative;
  z-index: 30;

  @include respond-before("sm") {
    margin-left: 20px;
  }

  @include respond-before("lg") {
    display: none;
  }
}

.site-header-item--desktop {
  display: none;

  @include respond-before("md") {
    display: flex;
  }
}

/* Социальные сети */
.social-links {
  display: flex;
  flex-wrap: wrap;

  @include respond-before("md") {
    margin-right: 20px;
  }

  &__item {
    margin: 0 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      width: 24px;
    }
  }
}

/* Кнопки */
.site-header-btn-item {
  display: inline-block;
}
.site-header-btn {
  display: block;
  padding: 8px 30px;
  font-size: 14px;
  @include fontRoboto("medium");
  line-height: 1.55em;
  text-transform: uppercase;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  box-shadow: 0 0 5px 2px rgb(15 15 20 / 30%);

  &--desktop {
    display: inline-block;
    text-align: left;

    @include respond-to("lg") {
      display: none;
    }
  }

  @include respond-before("md") {
    padding: 13px;
  }
  @include respond-before("xl") {
    padding: 13px 30px;
  }

  &--outline {
    color: var(--color-secondary);
    border-color: var(--color-secondary);
    box-shadow: 0 0 5px 1px rgb(11 245 254 / 60%);

    &:hover {
      color: #2a54a6;
      background-color: var(--color-secondary);
    }
  }

  &--solid {
    color: #2a54a6;
    background-color: var(--color-secondary);

    &:hover {
      background-color: lighten(#0bf5fe, 20%);
    }
  }

  &--connect {
    color: #fff;
    background-color: var(--color-primary);

    @include respond-to("sm") {
      padding: 13px;
    }

    &:hover {
      background-color: lighten(#FD10C5, 20%);
    }
  }

  &--creative {
    border: 0;
    color: #fff;
    background: linear-gradient(284.94deg, #ffdb79 6.08%, #ff19a3 82.47%);

    &:hover {
      background: linear-gradient(35.94deg, #ffdb79 6.08%, #ff19a3 82.47%);
    }

    @include respond-before("lg") {
      max-width: 90px;
      padding: 10px 13px;
      line-height: 1.125em;
    }
  }
}
</style>
