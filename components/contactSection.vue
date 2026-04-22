<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const name = ref('');
const email = ref('');
const message = ref('');
const service = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const services = computed(() => [
  { value: 'web', label: t('contactSection.serviceOptions.web') },
  { value: 'drone', label: t('contactSection.serviceOptions.drone') },
  { value: 'photo', label: t('contactSection.serviceOptions.photo') },
  { value: '3d', label: t('contactSection.serviceOptions.3d') },
  { value: 'other', label: t('contactSection.serviceOptions.other') }
]);

const handleSubmit = async () => {
  if (!name.value || !email.value || !message.value) {
    errorMessage.value = t('contactSection.validationError');
    setTimeout(() => { errorMessage.value = ''; }, 5000);
    return;
  }

  try {
    isSubmitting.value = true;

    const response = await fetch('https://api.lasseharm.space/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
        service: service.value
      }),
    });

    if (response.ok) {
      name.value = '';
      email.value = '';
      message.value = '';
      service.value = '';
      successMessage.value = t('contactSection.success');
      setTimeout(() => { successMessage.value = ''; }, 5000);
    } else {
      errorMessage.value = t('contactSection.error');
      setTimeout(() => { errorMessage.value = ''; }, 5000);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    errorMessage.value = t('contactSection.error');
    setTimeout(() => { errorMessage.value = ''; }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact" class="py-24 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 right-0 w-80 h-80 bg-neon-green/5 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-neon-magenta/5 rounded-full blur-[100px]"></div>

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="section-heading">{{ t('contactSection.title') }}</h2>
      <div class="section-divider"></div>

      <div class="max-w-3xl mx-auto">
        <!-- Success/Error Messages -->
        <div v-if="successMessage" class="glass-card border border-neon-green/40 text-neon-green px-5 py-3 rounded-xl mb-6">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="glass-card border border-red-500/40 text-red-400 px-5 py-3 rounded-xl mb-6">
          {{ errorMessage }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="glass-card neon-border p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">{{ t('contactSection.name') }} <span class="text-neon-magenta">*</span></label>
              <input
                type="text" id="name" v-model="name" required
                class="form-input"
                :placeholder="t('contactSection.name')"
              >
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">{{ t('contactSection.email') }} <span class="text-neon-magenta">*</span></label>
              <input
                type="email" id="email" v-model="email" required
                class="form-input"
                :placeholder="t('contactSection.email')"
              >
            </div>
          </div>

          <div>
            <label for="service" class="block text-sm font-medium text-gray-300 mb-2">{{ t('contactSection.service') }}</label>
            <select id="service" v-model="service" class="form-input">
              <option value="" disabled selected>{{ t('contactSection.serviceOptions.select') }}</option>
              <option v-for="option in services" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">{{ t('contactSection.message') }} <span class="text-neon-magenta">*</span></label>
            <textarea
              id="message" v-model="message" required rows="5"
              class="form-input resize-none"
              :placeholder="t('contactSection.messagePlaceholder')"
            ></textarea>
          </div>

          <div class="text-center">
            <button type="submit" class="btn-neon" :disabled="isSubmitting">
              <span v-if="!isSubmitting">{{ t('contactSection.sendMessage') }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ t('contactSection.sending') }}
              </span>
            </button>
          </div>
        </form>

        <!-- Contact Info Cards -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-card p-6 text-center group hover:border-neon-green/30 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-neon-green/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-sm font-bold text-white mb-1">{{ t('contactSection.contactInfo.email.title') }}</h3>
            <a href="mailto:lasse@lasseharm.space" class="text-sm text-gray-400 hover:text-neon-green transition-colors">{{ t('contactSection.contactInfo.email.value') }}</a>
          </div>

          <div class="glass-card p-6 text-center group hover:border-neon-magenta/30 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-neon-magenta/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-neon-magenta/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-neon-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-sm font-bold text-white mb-1">{{ t('contactSection.contactInfo.location.title') }}</h3>
            <p class="text-sm text-gray-400">{{ t('contactSection.contactInfo.location.value') }}</p>
          </div>

          <div class="glass-card p-6 text-center group hover:border-neon-purple/30 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-neon-purple/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-sm font-bold text-white mb-1">{{ t('contactSection.contactInfo.hours.title') }}</h3>
            <p class="text-sm text-gray-400">{{ t('contactSection.contactInfo.hours.value') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-gray-200 placeholder-gray-600 transition-all duration-300;
}
.form-input:focus {
  @apply outline-none border-neon-green/50 bg-dark-300;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
}
</style>
