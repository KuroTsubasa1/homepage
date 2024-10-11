<script lang="ts" setup>

// get current year
const currentYear = ref(new Date().getFullYear())

</script>

<template>
  <footer class="flex flex-col text-center justify-center items-center border-t-2 pb-5 fade-in">
    <div class="my-5">
      <p>
        © {{ currentYear }} | Lasse Harm.
      </p>
      <p>
        All Rights Reserved.
      </p>
    </div>
    <social-row>
      <template #default="{ icons }">
        <div v-for="icon in icons" :key="icon.name" class="social-icon">
          <img :src="icon.src" :alt="icon.name" />
        </div>
      </template>
    </social-row>
  </footer>
</template>

<style scoped>
.fade-in {
  opacity: 0;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.social-icon {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>