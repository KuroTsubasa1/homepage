<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Add structured data for SEO
const personSchema = ref(null);
const businessSchema = ref(null);

onMounted(async () => {
  try {
    // Load schema files
    const personResp = await fetch('/schemas/person.json');
    const businessResp = await fetch('/schemas/business.json');
    
    if (personResp.ok && businessResp.ok) {
      personSchema.value = await personResp.json();
      businessSchema.value = await businessResp.json();
    }
  } catch (error) {
    console.error('Error loading schema:', error);
  }
});

// Add schema to head
useHead({
  htmlAttrs: [{ 'data-theme': 'mytheme' }],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => personSchema.value ? JSON.stringify(personSchema.value) : '{}')
    },
    {
      type: 'application/ld+json',
      children: computed(() => businessSchema.value ? JSON.stringify(businessSchema.value) : '{}')
    }
  ]
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped>

</style>