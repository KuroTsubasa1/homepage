<template>
  <div class="w-full flex-col flex justify-center items-center mb-10">
    <h2 class="font-semibold text-primary text-5xl my-10 text-center w-full">
      Say Hello. Let’s Work Together.
    </h2>

    <form @submit.prevent="handleSubmit" class="card bg-base-100 shadow-xl p-4 w-1/2 border-primary border-2">
      <div class="form-control">
        <label class="label" for="name">
          <span class="label-text">Name:</span>
        </label>
        <input type="text" id="name" v-model="form.name" class="input input-bordered" required>
      </div>

      <div class="form-control">
        <label class="label" for="email">
          <span class="label-text">Email:</span>
        </label>
        <input type="email" id="email" v-model="form.email" class="input input-bordered" required>
      </div>

      <div class="form-control">
        <label class="label" for="message">
          <span class="label-text">Message:</span>
        </label>
        <textarea id="message" v-model="form.message" class="textarea textarea-bordered" required></textarea>
      </div>

      <div class="form-control mt-4">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>

    <div v-if="feedbackMessage" :class="feedbackClass" class="mt-4 p-4 w-1/2 text-center rounded" @transitionend="clearFeedbackMessage">
      {{ feedbackMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const feedbackMessage = ref('');
const feedbackClass = ref('');

const handleSubmit = () => {
  console.log('Form submitted:', form.value);

  const data = {
    msg: form.value.message,
    sender: form.value.email,
    name: form.value.name
  };

  fetch('https://pocket.lasseharm.space/form/send/portfolio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
      .then(response => {
        if (response.status === 200) {
          // Handle success
          console.log('Message sent successfully');
          feedbackMessage.value = 'Message sent successfully';
          feedbackClass.value = 'bg-green-100 text-green-800 border border-green-300';
          // Reset the form fields
          form.value.name = '';
          form.value.email = '';
          form.value.message = '';
          // Set timeout to fade feedback message after 5 seconds
          setTimeout(() => {
            feedbackMessage.value = '';
          }, 5000);
        } else if (response.status === 400) {
          // Handle error
          console.error('Bad request. Please check the submitted data.');
          feedbackMessage.value = 'Bad request. Please check the submitted data.';
          feedbackClass.value = 'bg-red-100 text-red-800 border border-red-300';
          // Set timeout to fade feedback message after 5 seconds
          setTimeout(() => {
            feedbackMessage.value = '';
          }, 5000);
        }
      })
      .catch(error => {
        // Handle network or unexpected errors
        console.error('There was an error sending the request:', error);
        feedbackMessage.value = 'There was an error sending the request. Please try again later.';
        feedbackClass.value = 'bg-red-100 text-red-800 border border-red-300';
        // Set timeout to fade feedback message after 5 seconds
        setTimeout(() => {
          feedbackMessage.value = '';
        }, 5000);
      });
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}

[fade-out] {
  transition: opacity 1s ease-out;
  opacity: 0;
}
</style>