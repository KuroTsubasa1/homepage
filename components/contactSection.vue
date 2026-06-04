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
  <div id="contact" class="space-y-10">

    <!-- TRANSMIT — contact form -->
    <GbWindow :title="t('contactSection.title')" class="animate-slide-up">
      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="gb-msg gb-msg-ok mb-6">
        <span class="pixel-label">OK</span>
        <span>{{ successMessage }}</span>
      </div>
      <div v-if="errorMessage" class="gb-msg gb-msg-err mb-6">
        <span class="pixel-label">ERR</span>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block pixel-label text-neon-green mb-2">{{ t('contactSection.name') }} <span class="text-neon-magenta">*</span></label>
            <input
              type="text" id="name" v-model="name" required
              class="form-input"
              :placeholder="t('contactSection.name')"
            >
          </div>
          <div>
            <label for="email" class="block pixel-label text-neon-green mb-2">{{ t('contactSection.email') }} <span class="text-neon-magenta">*</span></label>
            <input
              type="email" id="email" v-model="email" required
              class="form-input"
              :placeholder="t('contactSection.email')"
            >
          </div>
        </div>

        <div>
          <label for="service" class="block pixel-label text-neon-green mb-2">{{ t('contactSection.service') }}</label>
          <select id="service" v-model="service" class="form-input">
            <option value="" disabled selected>{{ t('contactSection.serviceOptions.select') }}</option>
            <option v-for="option in services" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>

        <div>
          <label for="message" class="block pixel-label text-neon-green mb-2">{{ t('contactSection.message') }} <span class="text-neon-magenta">*</span></label>
          <textarea
            id="message" v-model="message" required rows="5"
            class="form-input resize-none"
            :placeholder="t('contactSection.messagePlaceholder')"
          ></textarea>
        </div>

        <div class="text-center">
          <button type="submit" class="btn-neon font-pixel text-xs animate-glow-pulse" :disabled="isSubmitting">
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
    </GbWindow>

    <!-- DATA — contact info -->
    <GbWindow title="DATA" class="animate-slide-up">
      <ul class="gb-menu-list">
        <li>
          <a href="mailto:lasse@lasseharm.space" class="gb-menu-row !items-start">
            <span class="text-neon-green flex-shrink-0">@</span>
            <span class="flex-1 min-w-0">
              <span class="block">{{ t('contactSection.contactInfo.email.title') }}</span>
              <span class="block mt-2 gb-row-desc">{{ t('contactSection.contactInfo.email.value') }}</span>
            </span>
          </a>
        </li>
        <li>
          <div class="gb-menu-row !items-start">
            <span class="text-neon-magenta flex-shrink-0">[o]</span>
            <span class="flex-1 min-w-0">
              <span class="block">{{ t('contactSection.contactInfo.location.title') }}</span>
              <span class="block mt-2 gb-row-desc">{{ t('contactSection.contactInfo.location.value') }}</span>
            </span>
          </div>
        </li>
        <li>
          <div class="gb-menu-row !items-start">
            <span class="text-neon-purple flex-shrink-0">[t]</span>
            <span class="flex-1 min-w-0">
              <span class="block">{{ t('contactSection.contactInfo.hours.title') }}</span>
              <span class="block mt-2 gb-row-desc">{{ t('contactSection.contactInfo.hours.value') }}</span>
            </span>
          </div>
        </li>
      </ul>
    </GbWindow>

  </div>
</template>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-dark-200 text-gray-200 placeholder-gray-600 transition-colors duration-150;
  border: 2px solid rgb(var(--c-green) / 0.3);
  border-radius: 4px;
}
.form-input:focus {
  @apply outline-none bg-dark-300;
  border-color: rgb(var(--c-green) / 0.7);
}

/* Status banner (success / error) — flat blocky panel, not a glass card */
.gb-msg {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 0.9rem;
  border: 2px solid;
  border-radius: 4px;
}
.gb-msg-ok {
  color: rgb(var(--c-green));
  border-color: rgb(var(--c-green) / 0.5);
  background: rgb(var(--c-green) / 0.08);
}
.gb-msg-err {
  color: rgb(var(--c-crimson));
  border-color: rgb(var(--c-crimson) / 0.5);
  background: rgb(var(--c-crimson) / 0.08);
}

/* Flavour/value text under each menu row (readable VT323, not pixel font) */
.gb-row-desc {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
  text-transform: none;
  color: rgb(var(--c-ink-2));
}
</style>
