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
  <section id="contact" class="relative py-24 bg-forest-100 overflow-hidden">
    <!-- ambience -->
    <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
    <div class="orb top-0 right-1/4 w-96 h-96 bg-amber/10"></div>
    <div class="orb bottom-0 left-1/4 w-80 h-80 bg-moss/10 animate-drift-slow"></div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- heading -->
      <div v-reveal class="text-center max-w-3xl mx-auto mb-12">
        <p class="eyebrow mb-3 flex items-center gap-3 justify-center">
          <span class="inline-block w-8 h-px bg-amber/60"></span>
          {{ t('cta.eyebrow') }}
          <span class="inline-block w-8 h-px bg-amber/60"></span>
        </p>
        <h2 class="section-heading">{{ t('contactSection.title') }}</h2>
        <div class="section-divider !mb-0"></div>
      </div>

      <div class="max-w-3xl mx-auto">
        <!-- Success/Error Messages -->
        <div
          v-if="successMessage"
          v-reveal:scale
          class="panel wild-border border-moss/40 text-moss-light px-5 py-4 rounded-2xl mb-6 flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ successMessage }}
        </div>
        <div
          v-if="errorMessage"
          v-reveal:scale
          class="panel border border-clay/50 text-clay-light px-5 py-4 rounded-2xl mb-6 flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ errorMessage }}
        </div>

        <!-- Form -->
        <form
          @submit.prevent="handleSubmit"
          v-reveal:blur
          class="panel wild-border p-8 md:p-10 space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-xs font-condensed uppercase tracking-widest2 text-bone-muted mb-2">{{ t('contactSection.name') }} <span class="text-amber">*</span></label>
              <input
                type="text" id="name" v-model="name" required
                class="form-input"
                :placeholder="t('contactSection.name')"
              >
            </div>
            <div>
              <label for="email" class="block text-xs font-condensed uppercase tracking-widest2 text-bone-muted mb-2">{{ t('contactSection.email') }} <span class="text-amber">*</span></label>
              <input
                type="email" id="email" v-model="email" required
                class="form-input"
                :placeholder="t('contactSection.email')"
              >
            </div>
          </div>

          <div>
            <label for="service" class="block text-xs font-condensed uppercase tracking-widest2 text-bone-muted mb-2">{{ t('contactSection.service') }}</label>
            <select id="service" v-model="service" class="form-input">
              <option value="" disabled selected>{{ t('contactSection.serviceOptions.select') }}</option>
              <option v-for="option in services" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-xs font-condensed uppercase tracking-widest2 text-bone-muted mb-2">{{ t('contactSection.message') }} <span class="text-amber">*</span></label>
            <textarea
              id="message" v-model="message" required rows="5"
              class="form-input resize-none"
              :placeholder="t('contactSection.messagePlaceholder')"
            ></textarea>
          </div>

          <div class="text-center pt-2">
            <button type="submit" class="btn-wild" :disabled="isSubmitting">
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
        <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6" v-reveal.stagger>
          <div class="info-card group" v-tilt="6">
            <div class="info-tile bg-amber/10 text-amber group-hover:bg-amber/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="info-title">{{ t('contactSection.contactInfo.email.title') }}</h3>
            <a href="mailto:lasse@lasseharm.space" class="text-sm text-bone-muted hover:text-amber transition-colors">{{ t('contactSection.contactInfo.email.value') }}</a>
          </div>

          <div class="info-card group" v-tilt="6">
            <div class="info-tile bg-moss/10 text-moss-light group-hover:bg-moss/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="info-title">{{ t('contactSection.contactInfo.location.title') }}</h3>
            <p class="text-sm text-bone-muted">{{ t('contactSection.contactInfo.location.value') }}</p>
          </div>

          <div class="info-card group" v-tilt="6">
            <div class="info-tile bg-clay/10 text-clay-light group-hover:bg-clay/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="info-title">{{ t('contactSection.contactInfo.hours.title') }}</h3>
            <p class="text-sm text-bone-muted">{{ t('contactSection.contactInfo.hours.value') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-card {
  @apply bg-forest-100/70 backdrop-blur-xl rounded-2xl p-6 text-center border border-bone/10 transition-all duration-500 ease-wild;
}
.info-card:hover {
  @apply border-amber/40 -translate-y-1.5;
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(217, 138, 61, 0.08);
}
.info-tile {
  @apply w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300;
}
.info-card:hover .info-tile {
  @apply scale-110 -rotate-6;
}
.info-title {
  font-family: 'Oswald', sans-serif;
  @apply text-xs uppercase tracking-widest2 text-bone mb-1.5;
}
</style>
