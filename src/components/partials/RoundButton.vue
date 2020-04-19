<template>
  <button
    class="ripple rounded-full p-3 bg-gray-100 focus:outline-none hover:bg-gray-200 shadow-md hover:shadow-lg"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "RoundButton"
};
</script>

<style>
/* Ripple effect */
.ripple {
  background-position: center;
  transition: background 0.5s;
  transition: box-shadow 0.5s;
}
.ripple:hover {
  background: #edf2f7 radial-gradient(circle, transparent 1%, #dadada 1%)
    center/15000%;
}
.ripple:active {
  background-color: #fdfdfd21;
  background-size: 100%;
  transition: background 0s;
}
</style>