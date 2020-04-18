<template>
  <div class="max-w-3xl mx-auto my-16">
    <div class="m-2 rounded-lg overflow-hidden shadow-lg bg-white">
      <BrandHeader />
      <div class="flex flex-wrap mb-4 px-1 md:px-8">
        <div class="w-full md:w-1/2 my-5 h-auto mx-auto">
          <ColorPicker />
        </div>
        <!-- <Divider /> -->
        <div class="w-full md:w-1/3 my-2 h-12 mx-auto"></div>
      </div>
    </div>
  </div>
</template>


<script>
import BrandHeader from "@/components/partials/BrandHeader";
import ColorPicker from "@/components/partials/ColorPicker";

export default {
  name: "ControlDeck",
  components: {
    BrandHeader,
    ColorPicker
  }
};
</script>