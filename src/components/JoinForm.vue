<template>
  <div>
    <!-- Add key modifier for enter key -->
    <InputBox maxlength="8" v-model="roomKey" />
    <PrimaryButton @click.native="join" text="Join party" />
  </div>
</template>

<script>
import PrimaryButton from "./partials/PrimaryButton";
import InputBox from "./partials/InputBox";

export default {
  name: "JoinForm",
  components: {
    PrimaryButton,
    InputBox
  },
  data: function() {
    return { roomKey: "" };
  },
  methods: {
    join() {
      let id = this.roomKey;
      if (id.length == 8) {
        // input.classList.remove("is-primary", "is-danger");
        // input.classList.add("is-success");
        // document.getElementById("loader").classList.add("is-loading");

        let target = "/join/" + id;
        this.$router.push({ path: "join", query: { r: id } });
      } else {
        // input.classList.remove("is-primary", "is-success");
        // input.classList.add("is-danger");
      }
    }
  }
};
</script>