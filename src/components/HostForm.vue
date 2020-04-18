<template>
  <div>
    <PrimaryButton @click.native="host" text="Host party" />
  </div>
</template>

<script>
import PrimaryButton from "./partials/PrimaryButton";

export default {
  name: "HostForm",
  components: {
    PrimaryButton
  },
  methods: {
    host() {
      this.$router.push("/host");
    }
  }
};
</script>