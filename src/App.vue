<template>
  <div id="app" class="font-sans">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>


<script>
export default {
  mounted: () => {
    CSS.registerProperty({
      name: "--o",
      syntax: "<length-percentage>+",
      initialValue: "50%",
      inherits: true
    });

    CSS.registerProperty({
      name: "--pos",
      syntax: "<length-percentage>",
      initialValue: "0%",
      inherits: true
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html {
  --c0: #0bff8d4f;
  --c1: #00c3ff34;
  height: 100vh;
  background: radial-gradient(
    circle at var(--o, 50% 50%),
    var(--c0) var(--pos, 0%),
    var(--c1)
  );
  animation: a 0s infinite;
  animation-name: c0, o, pos, c1;
  animation-duration: 4s, 4s, 1s, 4s;
  animation-timing-function: steps(1), steps(1), ease-in-out;
}

@keyframes c0 {
  25% {
    --c0: #f6416b59;
  }
  50% {
    --c0: #fff6b7;
  }
  75% {
    --c0: #00c3ff34;
  }
}

@keyframes c1 {
  25% {
    --c1: #0bff8d4f;
  }
  50% {
    --c1: #f6416b59;
  }
  75% {
    --c1: #fff6b7;
  }
}

@keyframes o {
  0% {
    --o: 20% 20%;
  }

  25% {
    --o: 20% 80%;
  }

  50% {
    --o: 80% 20%;
  }

  75% {
    --o: 80% 80%;
  }
}

@keyframes pos {
  90%,
  100% {
    --pos: 100%;
  }
}
</style>
