<template>
  <button
    class="rounded py-2 px-3 bg-teal-100 hover:bg-teal-200 text-teal-600"
  >{{text}}</button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    text: String
  }
};
</script>

<style scoped>
button {
  transition: all 0.1s;
}
</style>