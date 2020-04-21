<template>
  <div class="max-w-3xl mx-auto my-16">
    <div class="m-2 rounded-lg overflow-hidden shadow-lg bg-white">
      <BrandHeader />
      <div class="flex flex-wrap px-3 md:px-8 mt-6">
        <RoundButton @click.native="$router.push({ name: 'Home' });">
          <img src="/img/icons/back.svg" alt="Back" />
        </RoundButton>
        <Pill>
          <span class="align-middle font-medium px-3 text-gray-600" style="line-height:42px">
            <strong>Room:</strong>
            {{roomID}}
          </span>
        </Pill>
        <RoundButton @click.native="share">
          <img src="/img/icons/share.svg" alt="Share" />
        </RoundButton>
      </div>
      <ControlDeck
        v-on:color="tx"
        v-on:add="addColor"
        v-on:share="share"
        :roomID="roomID"
        :colors="colors"
      />
    </div>
  </div>
</template>

<script>
import ControlDeck from "@/components/ControlDeck";
import BrandHeader from "@/components/partials/BrandHeader";
import RoundButton from "@/components/partials/RoundButton";
import Pill from "@/components/partials/Pill";

import io from "socket.io-client";

let socket = null;

export default {
  name: "Host",
  data: function() {
    return { roomID: "Loading...", colors: [], uid: 0 };
  },
  components: {
    ControlDeck,
    BrandHeader,
    RoundButton,
    Pill
  },
  beforeMount: function() {
    socket = io("https://zymo.herokuapp.com");
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
    addColor(hex) {
      this.colors.push({ id: this.uid++, hex: hex });
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