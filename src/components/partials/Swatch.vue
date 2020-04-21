<template>
  <div class="rounded-full flex flex-wrap m-2 h-8 w-16" :style="{ backgroundColor: color}">
    <img class="ml-auto mr-1" src="/img/icons/close.svg" alt="delete" />
  </div>
</template>

<script>
export default {
  name: "Swatch",
  props: {
    color: String
  }
};
</script>