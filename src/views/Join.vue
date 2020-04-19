<template>
  <div :style="{ backgroundColor: color}">
    <h1>Zymo client</h1>
  </div>
</template>

<script>
import io from "socket.io-client";

const socket = io();
let urlParams = new URLSearchParams(window.location.search);
let roomID = urlParams.get("r");

export default {
  name: "Join",
  data: function() {
    return { color: "#212121" };
  },
  beforeMount: function() {
    socket.on("connect", () => {
      socket.emit("join-room", roomID, ans => {
        // ans is the acknowledgement and return the color
        console.log(ans);
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