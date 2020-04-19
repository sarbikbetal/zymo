<template>
  <div>
    <!-- Add key modifier for enter key -->
    <input
      maxlength="8"
      class="mb-4 appearance-none border-2 border-teal-200 rounded-lg w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300"
      type="text"
      v-model="roomKey"
    />
    <PrimaryButton @click.native="join" text="Join party" />
  </div>
</template>

<script>
import PrimaryButton from "./partials/PrimaryButton";

export default {
  name: "JoinForm",
  components: {
    PrimaryButton
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