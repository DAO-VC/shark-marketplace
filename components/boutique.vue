<template>
  <div class="boutique" >
    <div class="site-header-text site-header-text--mobile">
      Rarity upgrade
      <span>demo</span>
    </div>

    <!-- Preview mobile Bar -->
    <div ref="preview-mobile" :class="['preview-mobile', {'preview-mobile--sticky': scrollY > previewMobileStickyPoint}]">
      <div class="preview-mobile-nav">
        <button
          class="slider-shark__nav slider-shark__nav--prev"
          :disabled="sharkSliderNavDisabledPrev"
          @click="sliderNav('prev')"
        />
        <button
          class="slider-shark__nav slider-shark__nav--next"
          :disabled="sharkSliderNavDisabledNext"
          @click="sliderNav('next')"
        />
      </div>

      <shark-preview
        v-if="activeShark"
        :key="$store.getters['sharks/key']"
        :item="activeShark"
        :is-logged="isLogged"
      />
    </div>

    <div class="container">
      <!-- <template v-if="false">
        <h1 class="page-title text-center">
          Shark boutique
        </h1>
        <img data-not-lazy src="~/assets/img/logo-kv.png" class="boutique-logo" alt="">
      </template> -->

      <div class="wrapper">
        <div class="sidebar">
          <div class="sidebar-sticky">
            <div v-if="!isLogged" class="text-center m-b-20 color-secondary font-medium font-size-20">
              Connect wallet to check your sharks
            </div>
            <div class="sidebar__cnt">
              <div class="slider-shark">
                <!-- ID акулы и rarity -->
                <div v-if="sharks.length && activeShark" class="slider-shark__header">
                  <div class="slider-shark__id">
                    {{ userHasNoSharks || !isLogged ? "Demo Shark" : "Shark" }} #{{ activeShark.id }}
                  </div>
                  <div v-if="activeSharkRarityOrigin" class="slider-shark__rarity">
                    Rarity:
                    <span v-text="activeSharkRarityOrigin.toLocaleString('en-US', $LOCALESTRING_CRYPTO(1, 2))" />
                  </div>
                </div>
                <!-- Карусель акул -->
                <button class="slider-shark__nav slider-shark__nav--prev" />
                <button class="slider-shark__nav slider-shark__nav--next" />
                <swiper
                  v-if="sharks.length"
                  ref="sharkSlider"
                  :options="sharkSliderOptions"
                  :auto-update="true"
                  @slide-change="activeSlide"
                  @ready="swiperInit"
                >
                  <swiper-slide
                    v-for="item in sharks"
                    :key="item.id"
                    ref="swiperSlide"
                    :data-shark-id="item.id"
                  >
                    <shark-preview
                      v-if="activeShark"
                      :key="$store.getters['sharks/key']"
                      :item="activeShark"
                      :is-logged="isLogged"
                      @error="errorLoadImage"
                    />
                  </swiper-slide>
                </swiper>
              </div>

              <!-- Корзина TODO: вернуть обратно && isLogged && !userHasNoSharks -->
              <div v-if="activeShark && isLogged && Object.keys(cartTraits).length && !userHasNoSharks" class="basket">
                <div v-if = "false" class="basket-total">
                  <div class="basket-total__left">
                    <div v-if="activeSharkRarity" class="basket-total__item">
                      <i>Rarity:</i>
                      <strong>
                        {{ activeSharkRarity.toLocaleString("en-US", $LOCALESTRING_CRYPTO(1, 3)) }}
                        <small v-if="changeSizeRarity" :class="changeSizeRarity > 0 ? 'color-success' : 'color-error'">
                          ({{ changeSizeRarity }})
                        </small>
                      </strong>
                    </div>
                    <div v-else-if="activeSharkPrice" class="basket-total__item">
                      <i>Price:</i>
                      <strong>
                        <template v-if="activeSharkPrice">
                          {{ activeSharkPrice.toLocaleString("en-US", $LOCALESTRING_CRYPTO(2, 4)) }}
                        </template>
                        <template v-else>
                          0
                        </template>
                        {{ symbol }}
                      </strong>
                    </div>
                  </div>
                  <div class="basket__right">
                    <button
                      :disabled="balanceSHRK < activeSharkPrice"
                      class="basket-total__btn btn btn-solid btn-solid--primary"
                      @click="buyHandle"
                      v-text="'Buy&Dress'"
                    />
                  </div>
                  <div class="basket-total__bottom">
                    <p v-if="balanceSHRK < activeSharkPrice" class="color-error">
                      Insufficient funds.
                      <a href="https://nftsale.sharkrace.com/sharkcoin/" target="_blank" class="font-bold">
                        Buy SHRK
                      </a>
                    </p>
                  </div>
                </div>

                <div v-if="Object.keys(cartTraits).length" :class="['basket-items', { 'basket-items--not-overflow': $isDev }]">
                  <cart-item
                    v-for="(item, folder) in cartTraits"
                    :key="folder"
                    :item="item"
                    :price-s-h-r-k="item.priceUSD*SHRKper1BUSD"
                    class="basket-items__itm"
                    @remove="removeTrait"
                  />
                </div>
              </div>

              <div v-if="isLogged && userHasNoSharks" class="text-center m-t-30 text-uppercase font-medium">
                You don't have sharks.
              </div>

              <div class="text-center m-t-30">
                <button class="btn btn-solid" @click="resetSharks">
                  Reset all
                </button>
              </div>

              <!-- <p v-if="false" style="text-transform: uppercase; text-align: center; opacity: .7;">
                Any artifacts you want to try on will appear here. This is also where you can buy them if you like them.
              </p> -->
            </div>
          </div>
        </div>
        <div class="content">
          <!-- Табы -->
          <div class="tabs">
            <!-- Категории трейтов -->
            <div class="tabs-nav">
              <perfect-scrollbar>
                <tab-item
                  v-for="(tab, idx) in tabs"
                  :key="idx"
                  :tab="tab"
                  :disabled="disabledTab(tab)"
                  :selected="selectedTab === tab"
                  class="tabs-nav__item"
                  @click.native="selectedTab = tab"
                />
              </perfect-scrollbar>
            </div>
            <div class="tabs-container">
              <template v-if="traits.length">
                <!-- Название категории и цена-->
                <div class="tabs-header">
                  <h2 v-if="selectedTab" class="tabs-title tabs-header__title">
                    {{ categoryName }}
                  </h2>
                  <price-balance
                    v-if = "false"
                    :shrk="priceSHRK"
                    :busd="priceBUSD"
                    class="tabs-header__price"
                  />
                </div>
                <!-- Список трейтов -->
                <div v-if="activeShark" class="assets">
                  <trait-item
                    v-for="(item, idx) in itemsFiltered"
                    :key="idx"
                    :item="item"
                    :body="activeSharkBody"
                    :disabled="isSelectedTrait(item)"
                    :selected="isSelectedTrait(item)"
                    class="assets__item"
                    @select-trait="selectTrait(item)"
                  />
                </div>
              </template>
              <ui-preloader v-else color="secondary" :center="true" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <secret-room v-if="creationMode" :key="$store.getters['sharks/key']" />
    <ui-modal
      v-if="showModal"
      :icon="modal"
      :close-btn="!modalHideClose"
      max-width="500px"
      @close="closeModal"
    >
      <template #title>
        {{ modalLabels.title }}
      </template>

      <div class="desc">
        <ul v-if="modalMessages.length" class="list list--none">
          <li v-for="(error, idx) in modalMessages" :key="idx" v-html="error" />
        </ul>
      </div>
      <template #footer>
        <template v-if="modalHideClose">
          <ui-loader color="#FD10C5" />
        </template>
        <button
          v-else
          class="btn btn-solid btn-solid--secondary btn-wide btn-big"
          @click="closeModal"
          v-text="modalLabels.closeBtn"
        />
      </template>
    </ui-modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import DEMOSHARKS from "~/static/demo-sharks.json";
import TRAITS from "~/static/traits.json";
import { LAYERS } from "~/global";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import "swiper/css/swiper.css";
import TabItem from "~/components/tab-item";
import TraitItem from "~/components/trait-item";
import SharkPreview from "~/components/shark-preview";
import SecretRoom from "~/components/dev/secret-room";
import PriceBalance from "~/components/price-balance";
import CartItem from "~/components/cart-item";
import {ethers} from "ethers";
export default {
  name: "MarketBoutique",
  components: { CartItem, PriceBalance, SecretRoom, SharkPreview, TraitItem, TabItem, Swiper, SwiperSlide, PerfectScrollbar },
  data () {
    return {
      userHasNoSharks: false,
      showModal: false,
      modal: "",
      modalMessages: [],
      modalHideClose: false,
      modalLabels: {
        title: "",
        closeBtn: "Ok"
      },
      mobileVersion: false,
      scrollY: 0,
      loading: false,
      previewMobileStickyPoint: 350,
      disabledItems: ["body", "background", "mouth", "eye"],
      excludedCategories: ["body", "background", "foreground"],
      selectedTab: null,
      selectedTrait: null,
      activeShark: null,
      activeSharkId: null,
      activeSharkTraitsOriginal: [],
      symbol: "shrk",
      sharkSliderNavDisabledPrev: false,
      sharkSliderNavDisabledNext: false,
      sharkSliderOptions: {
        lazy: true,
        effect: "slide",
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: ".slider-shark__nav--next",
          prevEl: ".slider-shark__nav--prev"
        }
      },
      traits: [],
      interval: 0,
      costUSD:0,
      SHRKper1BUSD:0
    };
  },
  computed: {
    /** Кошелку пользователя */
    signerAddress () {
      return this.$store.getters["user/signerAddress"];
    },

    /** Пользователь авторизован? */
    isLogged () {
      return !!this.signerAddress;
    },

    /** Карусель акул */
    sharkSlider () {
      return this.$refs.sharkSlider.$swiper;
    },

    /** Слайды в карусели акул */
    sharksSwiperSlides () {
      return this.$refs.swiperSlide;
    },

    /** Табы (они же категории) */
    tabs () {
      // Порядок категорий
      const order = [
        "background",
        "body",
        "eye",
        "mouth",
        "outfit",
        "head",
        "nose",
        "neck",
        "left-hand",
        "over-right-hand",
        "under-right-hand",
        "back"
      ];
      const tabsList = this.creationMode
        ? this.traits
        : this.traits.filter(item => !this.excludedCategories.includes(item.category));

      // оставляем только уникальные элементы
      const tabs = tabsList.reduce((acc, tab) => {
        if (acc.map[tab.category]) { // если данная категория уже была
          return acc; // ничего не делаем, возвращаем уже собранное
        }
        acc.map[tab.category] = true; // помечаем категорию, как обработанную
        acc.tabs.push(tab); // добавляем объект в массив категорий
        return acc; // возвращаем собранное
      }, {
        map: {}, // здесь будут отмечаться обработанные категории
        tabs: [] // здесь конечный массив уникальных категорий
      }).tabs; // получаем конечный массив

      // Отсортировали категории
      return tabs.sort((a, b) => order.indexOf(a.category) < order.indexOf(b.category) ? -1 : 1);
    },

    /** Название категории */
    categoryName () {
      return LAYERS.find(item => item.category === this.selectedTab.category)?.label ?? "";
    },

    /** Остортировали items по активной категории */
    itemsFiltered () {
      const traits = this.traits?.filter(item => item.category === this.selectedTab.category) ?? [];
      // Для неавторизованных юзеров блюрим первые 6 трейтов
      if (!this.isLogged) {
        traits.map((item, index) => {
          if (index > 5) {
            item.blurred = true;
          }
          return item;
        });
      }
      return traits;
    },

    /** Расчет изменения Rarity */
    changeSizeRarity () {
      if (this.activeShark && this.activeShark.rarity) {
        const oldRarity = this.activeShark?.oldRarity ?? 0;
        const rarity = this.activeSharkRarity; // this.activeShark.rarity.reduce((a, b) => a + b, 0);
        const value = rarity - oldRarity;

        if (value === rarity) {
          return 0;
        }
        return value > 0
          ? `+${value.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO(1, 3))}`
          : value.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO(1, 3));
      }
      return 0;
    },

    /** Расчет раритетности акулы */
    activeSharkRarity () {
      return 0;
      // const key = this.$store.getters["sharks/key"];
      // return this.activeShark.rarity
      //   ? this.activeShark.rarity.reduce((a, b) => a + b, 0) - key + key
      //   : 0;
    },
    /** Оригинальная раритетность активной акулы до модификаций */
    activeSharkRarityOrigin () {
      return this.activeShark.rarity20001
        ? this.activeShark.rarity20001 // this.activeShark.rarity.reduce((a, b) => a + b, 0)
        : 0;
    },

    /** Тело активной акулы */
    activeSharkBody () {
      return [];
    },

    /** Расчет стоимости акулы */
    activeSharkPrice () {
      // return Object.keys(this.cartTraits)
      //   .map(prop => Number(this.cartTraits[prop]?.priceUSD) ?? 0)
      //   .reduce((a, b) => a + b, 0)
      return this.costUSD * this.SHRKper1BUSD;
    },

    /** Скрытый функционал: Режим редактора */
    creationMode () {
      // const mode = this.$route.query?.mode ?? false;
      return false; // mode && mode === "creation";
    },

    /** Акулы пользователя */
    sharks () {
      return this.$store.getters["sharks/sharks"];
    },

    /** Цена трейтов в BUSD */
    priceBUSD () {
      // TODO хардкод
      return 10;
      // return this.selectedTab?.priceUSD ?? -1;
    },

    /** Цена трейтов в SHRK */
    priceSHRK () {
      return this.priceBUSD*this.SHRKper1BUSD;
    },

    /** Список выбранных трейтов текущей акулы (корзина) */
    cart () {
      return this.$store.getters["sharks/cart"]?.find(shark => shark.sharkId === this.activeSharkId) ?? {};
    },
    cartTraits () {
      return this.cart?.traits ?? {};
    },
    balanceSHRK () {
      return this.$store.getters["user/balance"].shrk;
    },
    balanceBUSD () {
      return this.$store.getters["user/balance"].busd;
    }
  },
  beforeMount () {
    window.addEventListener("scroll", this.previewMobileSticky);
    this.listenConnect();
  },
  beforeDestroy () {
    window.clearInterval(this.interval)
    window.removeEventListener("scroll", this.previewMobileSticky);
  },
  mounted () {
    // this.loadData();
    this.resetSharks()
    // this.interval = window.setInterval(this.calcCurrentSHRKPrice,1000)

  },
  methods: {
    /** Слушаем подключение кошелька */
    listenConnect () {
      this.$nuxt.$on("connect", this.loadData);
    },

    /** Загрузка/Обновление всех данных */
    loadData () {
      if (this.$offline) { // TODO: Offline
        this.traits = TRAITS;
        this.selectedTab = this.tabs[0];
      } else {
        this.loadTraits();
      }
      if (this.isLogged) {
        if (this.$offline) { // TODO: Offline
          this.loadDemoSharks();
        } else {
          this.loadUserSharks();
        }
      } else {
        this.loadDemoSharks();
      }
    },

    /** Загрузка трейтов маркета */
    loadTraits () {
      this.loading = true;
      this.$API.getMarketTraitList((r) => {
        this.traits = r;
        this.selectedTab = this.tabs[0];
        this.loading = false;
      }, (e) => {
        this.modalMessages = [e];
        this.openModal("", false, { title: "Blocked", closeBtn: "I'm waiting" });
        this.loading = false;
      });
    },

    /** Загрузка акул пользователя */
    loadUserSharks () {
      this.loading = true;
      this.$API.getUserSharks(this.signerAddress, (r) => {
        if (r.length) {
          this.$store.commit("sharks/setSharks", r.sort((a,b)=>a.id<b.id?-1:1));
          this.activeShark = this.sharks[0];
          this.activeSharkId = this.activeShark.id;
          this.loading = false;
        } else {
          // У пользователя нет акул
          this.loading = false;
          this.userHasNoSharks = true;
        }
      }, (e) => {
        console.log(e);
        this.modalMessages = [e];
        this.openModal("alert", false, { title: "Something went wrong", closeBtn: "Ok" });
        this.loading = false;
      });
    },

    /** Загрузка DEMO трейтов (не используется) */
    loadDemoTraits () {
      this.loading = true;
      this.$API.getTraitList((r) => {
        this.traits = r;
        this.selectedTab = this.tabs[0];
        this.loading = false;
      }, (e) => {
        this.modalMessages = [e];
        this.openModal("error", false, { title: "Something went wrong", closeBtn: "Ok" });
        this.loading = false;
      });
    },

    /** Загрузка DEMO акул */
    loadDemoSharks () {
      this.$store.commit("sharks/setSharks", DEMOSHARKS);
      this.activeShark = this.sharks[0];
    },

    /** Следим за скроллом */
    previewMobileSticky () {
      this.scrollY = window.scrollY;
    },

    /** Выбор трейта */
    selectTrait (trait) {
      this.selectedTrait = trait;
      this.$store.commit("sharks/setTrait", {
        sharkId: this.activeSharkId,
        folder: this.selectedTab.category,
        trait,
        prevTrait: this.selectedTrait,
        oldRarity: this.activeSharkRarity
      });
    },

    /** Проверка надет ли ассет на акулу? */
    isSelectedTrait (trait) {
      // 1. находим позицию нужной категории в глобальном массиве слоёв
      const pos = LAYERS.find(item => item.category === trait.category);
      // 2. находим индекс
      const index = LAYERS.indexOf(pos);
      return this.activeShark.traits[index] === trait.trait;
    },

    /** Удалить trait */
    removeTrait ({ folder, trait }) {
      const sharkId = this.activeShark.id;
      this.$store.commit("sharks/removeTrait", { folder, trait, sharkId });
    },

    /** Купить trait */
    async buyHandle () {
      const params = {
        traits: this.activeShark.traits,
        buyerAddress: this.signerAddress,
        tokenId: this.activeSharkId
      };
      console.log("Buy trait", params);

      this.modalMessages = ["Do not close the page until the transaction is completed."];
      this.openModal("alert", true, { title: "Please, waiting", closeBtn: "Ok" });

      //approve SHRK

      if(!window.provider){
        this.modalMessages = ["Please connect wallet!"];
        this.openModal("success", false, { title: "Not connected", closeBtn: "Ok" });
        return;
      }


      this.modalMessages.push("1/1 Approve your SHRK coins...")
      const coin = new ethers.Contract(this.$CONTRACT.coin.address, this.$CONTRACT.coin.abi, window.provider);
      const allowance = await coin.allowance(this.signerAddress, this.$CONTRACT.traitSeller.address)
      const cost = ethers.BigNumber.from((this.costUSD*this.SHRKper1BUSD*1e8).toFixed()).div(1e8);
      console.log("SHRK allowance", (allowance))
      if (allowance.lt(cost)) {
        try {
          const tx = await coin.connect(window.provider.getSigner()).approve(this.$CONTRACT.traitSeller.address, ethers.constants.MaxUint256)
          await tx.wait()
        }catch (err){
          this.modalMessages = [err.message];
          this.openModal("success", false, { title: "Error", closeBtn: "Ok" });
          return;
        }
      }


      this.modalMessages.push("2/3 Prepare NFT...")
      this.$API.sharkUpdateApprove(params, async (r) => {


        this.modalMessages.push("3/3 Send transaction...")

        const traitSeller = new ethers.Contract(this.$CONTRACT.traitSeller.address, this.$CONTRACT.traitSeller.abi, window.provider.getSigner());
        let {tokenId, nonce, costUSD, convert, mint, newTokenURI, addTraits, delTraits, signature} = r
        costUSD=ethers.utils.parseEther(costUSD+'')
        nonce=ethers.BigNumber.from(nonce+'')
        console.log("costUSD",costUSD, ethers.utils.formatEther(costUSD))
        console.log({tokenId, nonce, costUSD, convert, mint, newTokenURI, addTraits, delTraits, signature})
        const estimate = await traitSeller.estimateGas.upgradeForToken(tokenId, nonce, costUSD, convert, mint, newTokenURI, addTraits, delTraits, signature)
        console.log("estimate",estimate)
        try {
          const tx = await traitSeller.upgradeForToken(tokenId, nonce, costUSD, convert, mint, newTokenURI, addTraits, delTraits, signature)
          this.modalMessages.push("Wait for transaction...")
          await tx.wait()
        }catch (err){
          this.modalMessages = [err.message];
          this.openModal("success", false, { title: "Error", closeBtn: "Ok" });
          return;
        }


          this.modalMessages = ["Within a couple of minutes your shark will be updated!"];
        this.openModal("success", false, { title: "Congratulation!", closeBtn: "Great" });
      }, (e) => {
        console.log(e);
        this.modalMessages = [e];
        this.openModal("alert", false, { title: "Something went wrong", closeBtn: "Ok" });
        this.loading = false;
      });
    },

    /** Блокируем все табы, если не выбрано Body */
    disabledTab (tab) {
      return false;
    },

    /** Очистить акулы (очистить стор) */
    resetSharks () {
      console.log("resetSharks")
      this.$store.commit("sharks/clearCart");
      this.loadData()

      if(this.sharkSlider) this.sharkSlider.slideTo(0)
      //
    },

    /** Событие инициализации Swiper */
    swiperInit () {
      // Получаем данные первого слайда - текущая акула
      this.activeSlide(true);
    },

    /** Смена слайдов Swiper. Фиксируем ID активной акулы */
    activeSlide (init = false) {

      const activeSlideIndex = init ? 0 : this.sharkSlider.realIndex;
      this.activeSharkId = this.sharksSwiperSlides[activeSlideIndex].$attrs["data-shark-id"];
      this.activeShark = this.sharks.find(shark => shark.id === this.activeSharkId);

      return this.activeShark;
    },

    /** Slider Navigation */
    sliderNav (direction) {
      if (direction === "prev") {
        this.sharkSlider.slidePrev();
      }

      if (direction === "next") {
        this.sharkSlider.slideNext();
      }
    },

    /** Ошибка загрузки картинки */
    errorLoadImage () {
      this.modalMessages = ["There are a lot of requests to the server from your IP. <br>Please take your time."];
      this.openModal("error", false, { title: "Too Many Requests", closeBtn: "Got it" });
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
      this.modalMessages = [];
      this.modalLabels = {
        title: "",
        closeBtn: "Ok, close"
      };
    },

    /* Расчет курса SHRK на основе корзины
    * курс за 1$ != за 100000$ т.к. меняется остаток в пуле
    * */
    async calcCurrentSHRKPrice(){

      const costUSD = Object.values(this.cartTraits).map(x=>x.priceUSD).map(x=>Number(x)).reduce((a,b)=>a+b,0) || 100
      if(this.costUSD===costUSD && this.SHRKper1BUSD>0) return;

      if(costUSD) this.costUSD=costUSD;

      const provider = new ethers.providers.JsonRpcProvider(this.$CONTRACT.defaultProviderUrl)
      const traitSeller = new ethers.Contract(this.$CONTRACT.traitSeller.address, this.$CONTRACT.traitSeller.abi, provider);
      const costSHRK = (await traitSeller.getCostInToken(costUSD)).mul(11).div(10).toNumber()
      this.SHRKper1BUSD =  costSHRK/costUSD;

    }
  },

  watch:{
    cartTraitsCode(n,o){
      console.log("cartTraitsCode",n)
    }
  }

};
</script>

<style scoped lang="scss">
/** Корзина элементов */
.basket {
  margin-left: -30px;
  margin-right: -30px;

  &-total {
    background: linear-gradient(180deg, #17214d 0%, #0f1c57 73.35%);
    padding: 20px 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @include respond-before("md") {
      padding: 10px 20px;
    }
    @include respond-before("lg") {
      padding: 20px 30px;
    }

    &__left {
    }

    &__right {
    }

    &__bottom {
      width: 100%;
      font-size: 16px;
      text-align: center;

      p {
        margin-top: 10px;
      }
      a {
        color: var(--color-secondary);
      }
    }

    &__item {
      display: flex;
      flex-flow: column wrap;

      & + & {
        margin-top: 10px;
      }

      i {
        font-style: normal;
        color: rgba(#fff, .8);
        margin-bottom: 5px;
      }

      strong {
        display: inline-block;
        font-size: 20px;
        text-transform: uppercase;

        @include respond-before("xl") {
          font-size: 24px;
        }
      }
    }

    &__btn {
      font-size: 20px;
      font-weight: 700;
      line-height: 1em;
      padding: 20px;

      @include respond-before("md") {
        font-size: 16px;
        padding: 15px;
      }
      @include respond-before("xl") {
        font-size: 18px;
        padding: 20px;
      }
    }
  }

  &-items {
    padding: 0 15px;
    margin-top: 30px;
    max-height: 250px;
    overflow-y: auto;

    @include respond-before("md") {
      padding: 0 20px;
    }
    @include respond-before("lg") {
      padding: 0 30px;
    }

    &--not-overflow {
      max-height: none;
    }

    &__itm {
      & + & {
        margin-top: 20px;
      }
    }
  }

}

.wrapper {
  @include respond-before("md") {
    display: flex;
    flex-wrap: wrap;
  }
}

.sidebar {
  position: relative;
  margin-bottom: 30px;

  @include respond-before("md") {
    width: 37.5%;
    margin-bottom: 0;
    //margin-top: 110px;

    @media (min-height: 390px) { // для невысоких экранов desktop
      margin-top: 0;
    }
  }
  @include respond-before("lg") {
    //margin-top: 120px;

    @media (min-height: 600px) { // для невысоких экранов desktop
      margin-top: 0;
    }
  }
  @include respond-before("xl") {
    //margin-top: 130px;

    @media (max-height: 700px) { // для невысоких экранов desktop
      margin-top: 0;
    }
  }

  &-sticky {
    @include respond-before("md") {
      position: sticky;
      top: 10px;
    }
  }

  &__cnt {
    background: linear-gradient(180deg, #203696 0%, #101f64 73.35%);
    border-radius: 270px 30px 30px 30px;
    padding: 0 30px 20px;

    @include respond-before("lg") {
      padding: 0 30px 30px;
    }
  }
}

.content {
  @include respond-before("md") {
    width: calc(#{100% - 37.5%} - 30px);
    margin-left: 30px;
  }
}

/* Фиксированный бар с превью акулы */
.preview-mobile {
  background: linear-gradient(180deg, #203696 0%, #101f64 73.35%);
  padding: 0 15px 0 0;
  height: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  visibility: hidden;
  transform: translateY(-100%);
  transition: transform $transition-500;

  &--sticky {
    position: sticky;
    top: 0;
    visibility: visible;
    height: auto;
    overflow: visible;
    z-index: 99;
    display: flex;
    align-items: center;
    transform: translateY(0);
  }

  &-nav {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
  }

  .slider-shark__nav {
    transform: translateY(-50%);

    &--prev {
      left: 15px;
    }

    &--next {
      right: 15px;
    }
  }

  //.swiper-container {
  //  margin: 0;
  //  max-width: 30vw;
  //
  //  @include respond-before("pre-md") {
  //    max-width: 20vw;
  //  }
  //}

  &::v-deep {
    .shark {
      margin: auto;
      border-radius: 0;

      &-figure {
        margin: auto;
        width: 30vh;

        @include respond-before("pre-md") {
          width: 20vh;
        }
      }
    }
  }

  @include respond-before("md") {
    display: none;
  }
}

/* Табы = Категории */
.tabs {
  height: 100%;

  &-nav {
    padding: 0 17px;

    .ps { // Компонент скролла
      display: flex;

      &::v-deep {
        .ps--scrolling-x,
        .ps__rail-x {
          opacity: .6;

          &:hover,
          &:focus {
            opacity: .9;
          }
        }
      }
    }

    &__item {
      margin: 0 4px;

      @include respond-before("lg") {
        margin: 0 5px;
      }
    }
  }

  &-container {
    border-radius: 20px;
    padding: 20px;
    background: linear-gradient(180deg, #3655dc 18.75%, #1c349a 100%);

    @include respond-before("pre-md") {
      padding: 20px 30px;
    }
    @include respond-before("md") {
      //border-radius: 30px;
      padding: 30px 40px;
      height: calc(100% - #{109px}); // высота таба; 5px - корректировочные
    }
    @include respond-before("lg") {
      height: calc(100% - #{119px}); // высота таба; 5px - корректировочные
    }
    @include respond-before("xl") {
      height: calc(100% - #{129px}); // высота таба; 5px - корректировочные
    }

    @include respond-before("md") {
      @media (min-height: 390px) { // для невысоких экранов desktop
        padding: 20px 30px;
      }
    }
    @include respond-before("lg") {
      @media (min-height: 600px) { // для невысоких экранов desktop
        padding: 20px 30px;
      }
    }
    @include respond-before("xl") {
      @media (max-height: 700px) { // для невысоких экранов desktop
        padding: 20px 30px;
      }
    }
  }

  &-title {
    @include respond-to("sm") {
      margin-bottom: 20px;
    }
  }

  &-header {
    margin-bottom: 30px;

    @include respond-before("sm") {
      display: flex;
      flex-wrap: wrap;
    }
    @include respond-before("md") {
      margin-bottom: 50px;

      @media (min-height: 390px) { // для невысоких экранов desktop
        margin-bottom: 30px;
      }
    }
    @include respond-before("lg") {
      @media (min-height: 600px) { // для невысоких экранов desktop
        margin-bottom: 30px;
      }
    }
    @include respond-before("xl") {
      @media (max-height: 700px) { // для невысоких экранов desktop
        margin-bottom: 30px;
      }
    }

    &__price {
      @include respond-to("sm") {
        &::v-deep .price-row {
          text-align: left;
        }
      }
      @include respond-before("sm") {
        margin-left: auto;
      }
    }
  }
}

/* Ассеты */
.assets {
  display: flex;
  flex-wrap: wrap;
  margin-left: -7px;
  margin-right: -7px;
  //overflow-x: auto;

  @include respond-before("md") {
    //max-height: 300px;
  }
  @include respond-before("lg") {
    //max-height: 240px;
  }
  @include respond-before("xl") {
    //max-height: 230px;
  }

  &__item {
    padding: 0 7px;
    margin-bottom: 14px; // 20px
    width: 33.3333%;

    @include respond-before("sm") {
      width: 25%;
    }
    @include respond-before("pre-md") {
      width: 20%;
    }
    @include respond-before("md") {
      width: 25%;
    }
    @include respond-before("lg") {
      width: 20%;
    }
    @include respond-before("xl") {
      width: 16.6666%;
    }
  }
}

/* Слайдер с моими акулами */
.slider-shark {
  position: relative;
  margin-bottom: 30px;
  min-height: 100px;

  // Когда ассет еще не добавлен
  &--empty {
    //margin-bottom: 100px;
  }

  .swiper-container {
    //border-radius: 20px;
  }

  &__header {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    max-width: 500px;

    @include respond-before("sm") {
      font-size: 16px;
    }
    @include respond-before("md") {
      font-size: 12px;
    }
    @media (min-width: 900px) {
      font-size: 14px;
    }
    @include respond-before("lg") {
      font-size: 18px;
    }
  }

  &__id {
    text-transform: uppercase;
    font-weight: 700;
  }

  &__rarity {
    padding: 10px 8px;
    background: var(--color-primary);

    @include respond-before("xs") {
      padding: 10px 12px;
    }

    span {
      display: inline-block;
      margin-left: 10px;
      font-weight: 700;
    }
  }


  // Prev / Next navigation
  &__nav {
    $offset: -20px;
    $btn-size: 50px;
    $btn-size-small: 35px;

    width: $btn-size-small;
    height: $btn-size-small;
    background: linear-gradient(180deg, #fff 0%, #8bbaff 100%);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
    position: absolute;
    z-index: 50;
    top: 50%;

    @include respond-before("lg") {
      width: $btn-size;
      height: $btn-size;
    }

    &[disabled],
    &.swiper-button-disabled {
      opacity: .2;
    }

    &:not([disabled]):hover,
    &:not(.swiper-button-disabled):hover {
      background: #fff;
    }

    &:before {
      content: "";
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-content: center;
      width: $btn-size-small;
      height: $btn-size-small;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: $btn-size-small - 17;

      @include respond-before("lg") {
        width: $btn-size;
        height: $btn-size;
        background-size: calc(#{$btn-size} / 2);
      }
    }

    &--prev {
      left: $offset;

      &:before {
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='23' viewBox='0 0 24 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.6154 9.88452C22.4438 9.88452 23.1154 10.5561 23.1154 11.3845C23.1154 12.2129 22.4438 12.8845 21.6154 12.8845V9.88452ZM1.32393 12.4452C0.73814 11.8594 0.73814 10.9096 1.32393 10.3239L10.8699 0.77792C11.4557 0.192133 12.4054 0.192133 12.9912 0.77792C13.577 1.36371 13.577 2.31345 12.9912 2.89924L4.50591 11.3845L12.9912 19.8698C13.577 20.4556 13.577 21.4053 12.9912 21.9911C12.4054 22.5769 11.4557 22.5769 10.8699 21.9911L1.32393 12.4452ZM21.6154 12.8845L2.38459 12.8845V9.88452L21.6154 9.88452V12.8845Z' fill='%237497CA'/%3E%3C/svg%3E%0A");
      }
    }

    &--next {
      right: $offset;

      &:before {
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='23' viewBox='0 0 24 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.38464 9.88452C1.55622 9.88452 0.884644 10.5561 0.884644 11.3845C0.884644 12.2129 1.55622 12.8845 2.38464 12.8845L2.38464 9.88452ZM22.6761 12.4452C23.2619 11.8594 23.2619 10.9096 22.6761 10.3239L13.1301 0.77792C12.5443 0.192133 11.5946 0.192133 11.0088 0.77792C10.423 1.36371 10.423 2.31345 11.0088 2.89924L19.4941 11.3845L11.0088 19.8698C10.423 20.4556 10.423 21.4053 11.0088 21.9911C11.5946 22.5769 12.5443 22.5769 13.1301 21.9911L22.6761 12.4452ZM2.38464 12.8845L21.6154 12.8845V9.88452L2.38464 9.88452L2.38464 12.8845Z' fill='%237497CA'/%3E%3C/svg%3E%0A");
      }
    }
  }
}

.boutique {
  &-logo {
    position: absolute;
    display: none;
    right: 80px;
    top: -30px;

    @include respond-before("xl") {
      display: block;
      right: 80px;
    }
  }
}

.page-title {
  margin-bottom: 80px;
}

.container {
  position: relative;
}
</style>
