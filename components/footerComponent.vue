<script lang="ts" setup>

// get current year
const currentYear = ref(new Date().getFullYear())

</script>

<template>

  <footer class="flex flex-col text-center justify-center items-center border-t-2 pb-5">
    <div class="my-5">
      <p>
        © {{ currentYear }} | Lasse Harm.
      </p>
      <p>
        All Rights Reserved.
      </p>
    </div>
    <social-row></social-row>
  </footer>

</template>

<style scoped>

</style>