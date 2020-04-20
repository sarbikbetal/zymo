<template>
  <button class="ripple rounded-full p-1 bg-gray-100 focus:outline-none hover:bg-gray-200">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "FlatButton"
};
</script>

<style scoped>
button {
  transition: all 0.1s;
}
</style>