<template>
  <div class="max-w-3xl mx-auto my-16">
    <div class="m-2 rounded-lg overflow-hidden shadow-lg bg-white">
      <BrandHeader />
      <div class="flex flex-wrap px-3 md:px-8 mt-6">
        <RoundButton @click.native="$router.push({ name: 'Home' });">
          <img src="/img/icons/back.svg" alt="Share" />
        </RoundButton>
        <Pill>
          <span class="align-middle font-medium px-3 text-gray-600" style="line-height:42px">
            <strong>Room:</strong>
            {{roomID}}
          </span>
        </Pill>
        <RoundButton @click.native="$emit('share')">
          <img src="/img/icons/share.svg" alt="Share" />
        </RoundButton>
      </div>
      <div class="flex flex-wrap mb-4 px-1 md:px-8">
        <div class="w-full md:w-1/2 my-5 h-auto mx-auto">
          <ColorPicker v-on:color="data => $emit('color', data)" />
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
import RoundButton from "@/components/partials/RoundButton";
import Pill from "@/components/partials/Pill";

export default {
  name: "ControlDeck",
  props: {
    roomID: String
  },
  components: {
    BrandHeader,
    ColorPicker,
    RoundButton,
    Pill
  }
};
</script>