<template>
  <div>
    <ControlDeck v-on:color="tx" />
  </div>
</template>

<script>
import ControlDeck from "@/components/ControlDeck";
import io from "socket.io-client";

const socket = io();

export default {
  name: "Host",
  components: {
    ControlDeck
  },
  mounted: function() {
    this.$nextTick(function() {
      let roomID = null;

      socket.on("connect", () => {
        socket.emit("host-room", ans => {
          // document.getElementById('room-ID').innerText = `Room: ${ans}`;
          // roomID = ans;
          console.log(ans);
        });
      });
    });
  },
  methods: {
    tx(hex) {
      if (socket.connected) socket.emit("color", hex);
    }
  }
};
</script>

<style>
</style>