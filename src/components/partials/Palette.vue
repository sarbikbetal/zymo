<template>
  <div class="flex flex-wrap justify-center">
    <Swatch v-for="color in colors" :key="color.id" :color="color.hex" />
  </div>
</template>

<script>
import Swatch from "./Swatch";

export default {
  name: "Palette",
  props: {
    colors: Array
  },
  components: {
    Swatch
  }
};
</script>

<style>
</style>