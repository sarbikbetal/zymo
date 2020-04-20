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
      let target = "join?r=" + this.roomKey;
      location.assign(target);
    }
  }
};
</script>