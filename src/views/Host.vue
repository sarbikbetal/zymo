<template>
  <div>
    <ControlDeck v-on:color="tx" v-on:share="share" :roomID="roomID" />
  </div>
</template>

<script>
import ControlDeck from "@/components/ControlDeck";
import io from "socket.io-client";

const socket = io();

export default {
  name: "Host",
  data: function() {
    return { roomID: "Loading..." };
  },
  components: {
    ControlDeck
  },
  mounted: function() {
    this.$nextTick(function() {
      socket.on("connect", () => {
        socket.emit("host-room", id => {
          this.roomID = id;
        });
      });
    });
  },
  methods: {
    tx(hex) {
      if (socket.connected) socket.emit("color", hex);
    },
    share() {
      if (navigator.share && socket.connected) {
        navigator
          .share({
            title: "ColorParty",
            text: "Come over and join my party!\n",
            url: "join?r=" + this.roomID
          })
          .then(() => console.log("Successful share"))
          .catch(error => console.log("Error sharing", error));
      } else if (socket.connected) {
        let url = window.location.host + "/join?r=" + this.roomID;
        this.copyTextToClipboard(url);
      }
    },
    copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(
        function() {
          console.log("Async: Copying to clipboard was successful!");
        },
        function(err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },
    fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }

      document.body.removeChild(textArea);
    }
  }
};
</script>

<style>
</style>