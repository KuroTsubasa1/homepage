<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- SEND MESSAGE -->
    <GbWindow :title="t('contactForm.title')" class="animate-slide-up">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-xs font-pixel text-gray-300 mb-2" for="name">▸ {{ t('contactForm.name') }}</label>
          <input type="text" id="name" v-model="form.name" class="form-input" required>
        </div>

        <div>
          <label class="block text-xs font-pixel text-gray-300 mb-2" for="email">▸ {{ t('contactForm.email') }}</label>
          <input type="email" id="email" v-model="form.email" class="form-input" required>
        </div>

        <div>
          <label class="block text-xs font-pixel text-gray-300 mb-2" for="message">▸ {{ t('contactForm.message') }}</label>
          <textarea id="message" v-model="form.message" class="form-input resize-none" rows="5" required></textarea>
        </div>

        <div class="text-center pt-1">
          <button type="submit" class="btn-neon font-pixel animate-glow-pulse">{{ t('contactForm.send') }}</button>
        </div>
      </form>

      <div v-if="feedbackMessage" :class="feedbackClass" class="gb-feedback mt-5 px-4 py-3 text-center">
        {{ feedbackMessage }}
      </div>
    </GbWindow>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = ref({
  name: '',
  email: '',
  message: ''
});

const feedbackMessage = ref('');
const feedbackClass = ref('');

const handleSubmit = () => {
  const data = {
    msg: form.value.message,
    sender: form.value.email,
    name: form.value.name
  };

  fetch('https://pocket.lasseharm.space/form/send/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 200) {
        feedbackMessage.value = t('contactForm.success');
        feedbackClass.value = 'border-neon-green text-neon-green';
        form.value.name = '';
        form.value.email = '';
        form.value.message = '';
      } else if (response.status === 400) {
        feedbackMessage.value = t('contactForm.badRequest');
        feedbackClass.value = 'border-red-500 text-red-400';
      }
      setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    })
    .catch(error => {
      console.error('There was an error sending the request:', error);
      feedbackMessage.value = t('contactForm.error');
      feedbackClass.value = 'border-red-500 text-red-400';
      setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    });
};
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-dark-200 border border-white/10 text-gray-200 placeholder-gray-600 transition-all duration-300;
}
.form-input:focus {
  @apply outline-none border-neon-green/50 bg-dark-300;
  box-shadow: 0 0 20px rgba(155, 188, 15, 0.18);
}
.gb-feedback {
  @apply border bg-dark-200;
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}
</style>
