<template>
  <div class="rounded-full flex flex-wrap m-2 h-8 w-12" :style="{ backgroundColor: color}">
    <slot></slot>
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