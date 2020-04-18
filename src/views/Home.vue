<template>
  <div class="max-w-lg mx-auto my-16">
    <div class="m-2 rounded-lg overflow-hidden shadow-lg bg-white">
      <BrandHeader />
      <div class="text-xl font-sans text-gray-600 px-6 my-4">
        <h4>Let the party begin</h4>
      </div>
      <div class="flex flex-wrap mb-4 px-8">
        <div class="w-full md:w-1/3 my-2 h-12 mx-auto">
          <HostForm />
        </div>
        <Divider />
        <div class="w-full md:w-1/3 my-2 h-12 mx-auto">
          <JoinForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandHeader from "@/components/partials/BrandHeader";
import Divider from "@/components/partials/Divider";
import JoinForm from "@/components/JoinForm";
import HostForm from "@/components/HostForm";

export default {
  name: "Home",
  components: {
    BrandHeader,
    JoinForm,
    HostForm,
    Divider
  }
};
</script>
