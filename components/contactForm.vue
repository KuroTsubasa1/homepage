<template>
  <div class="w-full flex-col flex justify-center items-center mb-10 px-4">
    <h2 class="font-bold text-3xl my-10 text-center w-full">
      <span class="gradient-text">{{ t('contactForm.title') }}</span>
    </h2>

    <form @submit.prevent="handleSubmit" class="glass-card neon-border p-8 md:w-1/2 w-full max-w-xl space-y-5">
      <div>
        <label class="block text-xs font-pixel text-gray-300 mb-2" for="name">{{ t('contactForm.name') }}</label>
        <input type="text" id="name" v-model="form.name" class="form-input" required>
      </div>

      <div>
        <label class="block text-xs font-pixel text-gray-300 mb-2" for="email">{{ t('contactForm.email') }}</label>
        <input type="email" id="email" v-model="form.email" class="form-input" required>
      </div>

      <div>
        <label class="block text-xs font-pixel text-gray-300 mb-2" for="message">{{ t('contactForm.message') }}</label>
        <textarea id="message" v-model="form.message" class="form-input resize-none" rows="5" required></textarea>
      </div>

      <div class="text-center">
        <button type="submit" class="btn-neon font-pixel animate-glow-pulse">{{ t('contactForm.send') }}</button>
      </div>
    </form>

    <div v-if="feedbackMessage" :class="feedbackClass" class="mt-4 p-4 w-full max-w-xl text-center rounded-xl glass-card">
      {{ feedbackMessage }}
    </div>
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
        feedbackClass.value = 'border border-neon-green/40 text-neon-green';
        form.value.name = '';
        form.value.email = '';
        form.value.message = '';
      } else if (response.status === 400) {
        feedbackMessage.value = t('contactForm.badRequest');
        feedbackClass.value = 'border border-red-500/40 text-red-400';
      }
      setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    })
    .catch(error => {
      console.error('There was an error sending the request:', error);
      feedbackMessage.value = t('contactForm.error');
      feedbackClass.value = 'border border-red-500/40 text-red-400';
      setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    });
};
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-dark-200 border border-white/10 rounded-xl text-gray-200 placeholder-gray-600 transition-all duration-300;
}
.form-input:focus {
  @apply outline-none border-neon-green/50 bg-dark-300;
  box-shadow: 0 0 20px rgba(155, 188, 15, 0.18);
}
</style>
