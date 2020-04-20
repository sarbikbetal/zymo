<template>
  <input
    ref="InputBox"
    class="mb-4 appearance-none border-2 border-teal-200 rounded-lg w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300"
    type="text"
    :value="value"
    @input="update()"
  />
</template>

<script>
export default {
  name: "InputBox",
  props: {
    value: String
  },
  methods: {
    update() {
      this.$emit("input", this.$refs.InputBox.value);
    }
  }
};
</script>

<style>
</style>