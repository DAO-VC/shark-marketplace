<template>
  <svg
    :class="cssClass"
    xmlns="http://www.w3.org/2000/svg"
    width="50px"
    height="50px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="#ffe600"
      stroke-width="5"
      stroke-dasharray="212.05750411731105 72.68583470577035"
      style="animation-play-state: running; animation-delay: 0s;"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        style="animation-play-state: running; animation-delay: 0s;"
      />
    </circle>
  </svg>
</template>
<script>
export default {
  name: "UiPreloader",
  props: {
    center: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "primary",
      validator (value) {
        // Значение должно соответствовать одной из этих строк
        return ["primary", "secondary", "tertiary", "gray", "black", "white"].includes(value);
      }
    },
    size: {
      type: String,
      default: "medium",
      validator (value) {
        // Значение должно соответствовать одной из этих строк
        return ["small", "medium", "big", "button"].includes(value);
      }
    }
  },
  computed: {
    cssClass () {
      const classes = ["preloader"];
      if (this.color) {
        classes.push(`preloader--${this.color}`);
      }
      if (this.size) {
        classes.push(`preloader--${this.size}`);
      }
      if (this.center) {
        classes.push("preloader--center");
      }
      return classes.join(" ");
    }
  }
};
</script>
<style lang="scss" scoped>
.preloader {
  display: inline-block;
  vertical-align: middle;
  shape-rendering: auto;
  animation-play-state: running;
  animation-delay: 0s;

  // Colors
  &--primary {
    circle {
      stroke: var(--color-primary);
    }
  }

  &--secondary {
    circle {
      stroke: var(--color-secondary);
    }
  }

  &--tertiary {
    circle {
      stroke: var(--color-tertiary);
    }
  }

  &--gray {
    circle {
      stroke: var(--color-gray);
    }
  }

  &--black {
    circle {
      stroke: var(--color-black);
    }
  }

  &--white {
    circle {
      stroke: #fff;
    }
  }

  // Sizes
  &--small {
    width: 30px;
    height: 30px;
  }

  &--medium {
    width: 50px;
    height: 50px;
  }

  &--big {
    width: 70px;
    height: 70px;
  }

  &--button {
    width: 1.4em;
    height: 1.4em;
  }

  // Align
  &--center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

/* .lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #ffe600;
  border-color: #ffe600 transparent #ffe600 transparent;
  animation: lds-hourglass 1.2s infinite;
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
} */
</style>
