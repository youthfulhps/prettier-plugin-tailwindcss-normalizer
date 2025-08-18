<template>
  <div class="p-1 m-2">
    <span :class="'px-4 py-2'">Vue binding test</span>
    <button v-bind:class="'rounded bg-blue-500'">Button</button>

    <!-- This should not be transformed: p-[20px] -->
    <p>{{ message + " w-[32px]" }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Vue component h-[64px] test", // This should also not be transformed
    };
  },
};
</script>
