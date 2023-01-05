<template>
  <div class="request-loading">
    <svg viewBox="0 0 66 66" class="spinner" xmlns="http://www.w3.org/2000/svg">
      <circle
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
        class="path"
      ></circle>
    </svg>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading'
};
</script>

<style scoped>
.request-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 7;
}
.request-loading svg {
  position: relative;
  z-index: 2;
  width: 48px;
  height: 48px;
}
.request-loading .path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  -webkit-animation: spin 1.4s ease-in-out infinite,
    coler 5.6s ease-in-out infinite;
  animation: spin 1.4s ease-in-out infinite, coler 5.6s ease-in-out infinite;
}
.request-loading .overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: hsla(0, 0%, 100%, 0.4);
  z-index: 1;
}
circle {
  fill: none;
  stroke-width: 6;
  stroke-linecap: round;
  cx: 33;
  cy: 33;
  r: 30;
}
@keyframes spin {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}

@keyframes coler {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}
</style>