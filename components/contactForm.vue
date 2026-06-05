<template>
  <section class="relative py-24 overflow-hidden">
    <!-- ambience -->
    <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
    <div class="orb top-0 left-1/4 w-80 h-80 bg-amber/10"></div>
    <div class="orb bottom-0 right-1/4 w-72 h-72 bg-clay/10 animate-drift-slow"></div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- heading -->
      <div v-reveal class="text-center max-w-3xl mx-auto mb-12">
        <p class="eyebrow mb-3 flex items-center gap-3 justify-center">
          <span class="inline-block w-8 h-px bg-amber/60"></span>
          {{ t('cta.eyebrow') }}
          <span class="inline-block w-8 h-px bg-amber/60"></span>
        </p>
        <h2 class="section-heading">{{ t('contactForm.title') }}</h2>
        <div class="section-divider !mb-0"></div>
      </div>

      <form
        @submit.prevent="handleSubmit"
        v-reveal:blur
        class="panel wild-border p-8 md:p-10 w-full max-w-xl mx-auto space-y-6"
      >
        <div>
          <label class="block text-xs font-condensed uppercase tracking-widest2 text-bone-muted mb-2" for="name">{{ t('contactForm.name') }}</label>
          <input type="text" id="name" v-model="form.name" class="form-input" required>
        </div>

        <div>
          <label class="block text-xs font-condensed uppercase tracking-widest2 text-bone-muted mb-2" for="email">{{ t('contactForm.email') }}</label>
          <input type="email" id="email" v-model="form.email" class="form-input" required>
        </div>

        <div>
          <label class="block text-xs font-condensed uppercase tracking-widest2 text-bone-muted mb-2" for="message">{{ t('contactForm.message') }}</label>
          <textarea id="message" v-model="form.message" class="form-input resize-none" rows="5" required></textarea>
        </div>

        <div class="text-center pt-2">
          <button type="submit" class="btn-wild">{{ t('contactForm.send') }}</button>
        </div>
      </form>

      <div
        v-if="feedbackMessage"
        v-reveal:scale
        :class="feedbackClass"
        class="panel mt-6 px-5 py-4 w-full max-w-xl mx-auto text-center rounded-2xl flex items-center justify-center gap-3"
      >
        {{ feedbackMessage }}
      </div>
    </div>
  </section>
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
        feedbackClass.value = 'border border-moss/40 text-moss-light';
        form.value.name = '';
        form.value.email = '';
        form.value.message = '';
      } else if (response.status === 400) {
        feedbackMessage.value = t('contactForm.badRequest');
        feedbackClass.value = 'border border-clay/50 text-clay-light';
      }
      setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    })
    .catch(error => {
      console.error('There was an error sending the request:', error);
      feedbackMessage.value = t('contactForm.error');
      feedbackClass.value = 'border border-clay/50 text-clay-light';
      setTimeout(() => { feedbackMessage.value = ''; }, 5000);
    });
};
</script>
