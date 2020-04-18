<template>
  <div class="relative text-left text-3xl font-sans font-medium">
    <h1 class="brand-band title">zymo</h1>
  </div>
</template>


<script>
export default {
  name: "BrandHeader"
};
</script>

<style scoped>
.brand-band {
  background: linear-gradient(210deg, #fff6b7 10%, #f6416c 100%);
  color: #fff;
  margin: 0px !important;
  padding: 0px 24px;
  line-height: 56px;
  border-radius: 8px 8px 0 0;
  transition: all 1s;
  opacity: 50%;
  /* z-index: 5; */
}
.brand-band::before {
  animation: grad-opac 2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s infinite
    alternate;
  background: linear-gradient(-30deg, #00c3ff, #0bff8d);
  background-color: transparent;
  border-radius: inherit;
  padding: 0px 24px;
  content: "zymo";
  position: absolute;
  height: 56px;
  top: 0;
  left: 0;
  width: 100%;
  /* z-index: 10; */
}

@keyframes grad-opac {
  0% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
}
</style>