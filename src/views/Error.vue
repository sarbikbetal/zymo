<template>
  <div class="max-w-lg mx-auto my-16 text-center font-bold">
    <div class="m-2 rounded-lg overflow-hidden shadow-lg bg-white p-10">
      <h1 class="text-6xl">🌌 404</h1>
      <h2 class="text-5xl">Not found :(</h2>
      <PrimaryButton @click.native="home()" text="🏡 Home" class="my-6 text-xl" />
    </div>
  </div>
</template>


<script>
import PrimaryButton from "@/components/partials/PrimaryButton";

export default {
  name: "ErrorPage",
  components: {
    PrimaryButton
  },
  props: {
    msg: String
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-family: "Courier New", Courier, monospace;
}
</style>