<template>
  <div :style="{ backgroundColor: color}" class="h-screen w-screen"></div>
</template>

<script>
import io from "socket.io-client";

const socket = io("https://zymo.herokuapp.com");
let urlParams = new URLSearchParams(window.location.search);
let roomID = urlParams.get("r");

export default {
  name: "Join",
  data: function() {
    return { color: "transparent" };
  },
  beforeMount: function() {
    socket.on("connect", () => {
      socket.emit("join-room", roomID, reply => {
        // reply is the acknowledgement and return the color
        console.log(reply);
      });
    });
  },
  mounted: function() {
    this.$nextTick(function() {
      socket.on("color", color => {
        this.color = color;
      });
    });
  }
};
</script>

<style>
</style>