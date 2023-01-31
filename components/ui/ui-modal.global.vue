<template>
  <transition name="modal">
    <div class="modal-bg">
      <div class="modal-wrapper">
        <div class="modal-inner">
          <div class="modal-stage">
            <div class="modal-slide">
              <div class="modal-container">
                <!-- Стандартный popup :: start -->
                <div
                  class="modal-content"
                  :style="{maxWidth}"
                  role="dialog"
                >
                  <button
                    v-if="closeBtn"
                    class="modal-close"
                    @click="closeModal"
                  >
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z" />
                    </svg> -->

                    <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M35.9364 33.5413L20.873 18.4778L35.9364 3.41436L33.108 0.585938L17.9552 15.7388L2.89175 0.675362L0.063324 3.50379L15.1268 18.5672L0.063324 33.6307L2.89175 36.4591L18.0446 21.3063L33.108 36.3697L35.9364 33.5413Z"
                        fill="#FD10C4"
                      />
                    </svg>
                  </button>

                  <div class="modal-body">
                    <div class="modal-header-icon m-b-50">
                      <img v-if="icon === 'error'" :src="require('~/assets/img/icon-error.svg')" data-not-lazy alt="">
                      <img v-else-if="icon === 'alert'" :src="require('~/assets/img/icon-alert.svg')" data-not-lazy alt="">
                      <img v-else :src="require('~/assets/img/icon-success.svg')" data-not-lazy alt="">
                    </div>

                    <h2 class="modal-title text-uppercase text-center m-b-50">
                      <slot name="title" />
                    </h2>

                    <slot />

                    <div class="text-center m-l-a m-r-a m-t-80" style="max-width: 700px;">
                      <slot name="footer" />
                    </div>
                  </div>
                </div>
                <!-- Стандартный popup :: end -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "UiModal",
  props: {
    // Show close button
    closeBtn: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "580px"
    },
    icon: {
      type: String,
      default: "success"
    }
  },
  mounted () {
    document.querySelector("body").classList.add("modal-open");
    window.addEventListener("keydown", this.escCloseModal);
  },
  beforeDestroy () {
    document.querySelector("body").classList.remove("modal-open");
    window.removeEventListener("keydown", this.escCloseModal);
  },
  methods: {
    escCloseModal (e) {
      if (this.closeBtn && e.key === "Escape") {
        this.closeModal();
      }
    },
    closeModal () {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
$modal-overlay-bg: #080068;
$modal-bg: linear-gradient(124.1deg, #FFFFFF 51.07%, rgba(255, 255, 255, 0) 176.63%);
$padding-top: 0; // зависит от высоты header
.modal-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  outline: none !important;
  -webkit-backface-visibility: hidden;
  background-color: rgba($modal-overlay-bg, 0.6);
  backdrop-filter: blur(30px);
  transition: opacity 0.3s ease;
}

.modal-iframe {
  .modal-content {
    background: $modal-bg;
    padding: 20px;
  }
}

.modal-content {
  width: 100%;
  position: relative;
  margin: auto;
  padding: 35px 35px 60px;
  background: $modal-bg;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0;
  transition: all 0.3s ease;
}

.modal-wrapper {
  -webkit-backface-visibility: hidden;
  height: 100%;
  left: 0;
  outline: 0;
  position: fixed;
  -webkit-tap-highlight-color: transparent;
  top: 0;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  width: 100%;
  z-index: 99992;
}

.modal-inner,
.modal-stage {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.modal-stage {
  direction: ltr;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  z-index: 99994;
  overflow: hidden;
}

.modal-slide {
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  left: 0;
  outline: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: $padding-top 15px 0;
  position: absolute;
  text-align: center;
  top: 0;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  -o-transition-property: transform, opacity;
  transition-property: transform, opacity;
  transition-property: transform, opacity, -webkit-transform;
  white-space: normal;
  width: 100%;
  z-index: 99994;
}

.modal-container {
  display: inline-block;
  margin: 0;
  max-width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px 0;
  position: relative;
  text-align: left;
  vertical-align: middle;
}

.modal-close {
  background: none;
  border: 0;
  display: inline-block;
  height: 50px;
  width: 50px;
  padding: 10px;
  left: 0;
  top: 0;
  margin: 0;
  transition: color .2s;
  vertical-align: top;
  visibility: inherit;
  border-radius: 0;
  color: currentColor;
  cursor: pointer;
  opacity: .8;
  position: absolute;
  z-index: 401;

  @include respond-before("md") {
    left: 30px;
    top: 30px;
  }

  svg {
    display: block;
    height: 100%;
    overflow: visible;
    position: relative;
    width: 100%;

    //path {
    //  fill: currentColor;
    //}
  }
}

.modal-header {
  @include modal-header;
}

.modal-body {
  padding: 0;
  font-size: 16px;
}

.modal-footer {
  margin-top: 30px;

  &__action {
    text-align: center;
  }

  &__top {
    margin-bottom: 20px;
  }

  &__bottom {
    margin-top: 20px;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-wrapper,
.modal-leave-active .modal-wrapper {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
