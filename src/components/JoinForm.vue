<template>
  <div>
    <!-- Add key modifier for enter key -->
    <InputBox maxlength="8" v-model="roomKey" placeholder="k9btqau7" />
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
        let target = "/join/" + id;
        this.$router.push({ path: "join", query: { r: id } });
      } else {
        this.$snack.error({
          text: "Invalid room id",
          button: "OK",
          action: () => {
            this.roomKey = "";
          }
        });
      }
    }
  }
};
</script>