<template>
  <div>
    <h1>Spotify Web Playback SDK Quick Start Tutorial</h1>
  </div>
</template>

<script>
export default {
  name: "Spotify",
  data: function() {
    return {
      token: this.token,
      rf_token: this.rf_token
    };
  },
  beforeMount() {
    let urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get("token");
    this.rf_token = urlParams.get("rf_token");
  },
  mounted() {
    let spotifySDK = document.createElement("script");
    spotifySDK.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
    document.head.appendChild(spotifySDK);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.token;
      const player = new Spotify.Player({
        name: "Zymo",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        // fetch("http://localhost:5000/spotify/refresh", {
        //   method: "POST",
        //   headers: { "content-type": "application/json" },
        //   body: { refresh_token: this.rf_token }
        // })
        //   .then(resp => resp.json())
        //   .then(response => {
        //     this.token = response.access_token;
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", state => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }
};
</script>

<style>
</style>