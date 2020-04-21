<template>
  <div class="flex flex-wrap mb-4 px-1 md:px-8">
    <div class="w-full md:w-1/2 my-5 h-auto mx-auto">
      <ColorPicker v-on:color="emitColor" v-on:add="addColor" />
    </div>
    <!-- <Divider /> -->
    <div class="w-full md:w-1/2 mb-2 md:my-5 h-auto mx-6 md:mx-0 md:pl-4">
      <Palette :colors="colors" />
    </div>
  </div>
</template>


<script>
import ColorPicker from "@/components/partials/ColorPicker";
import Palette from "@/components/partials/Palette";

export default {
  name: "ControlDeck",
  props: {
    roomID: String,
    colors: Array
  },
  components: {
    ColorPicker,
    Palette
  },
  methods: {
    emitColor(data) {
      this.$emit("color", data);
    },
    addColor(data) {
      this.$emit("add", data);
    }
  }
};
</script>