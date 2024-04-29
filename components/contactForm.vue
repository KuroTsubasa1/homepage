<template>
  <div class="w-full flex-col flex justify-center items-center mb-10">

    <h2 class="font-semibold text-primary text-5xl my-10">
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
  </div>
</template>

<script setup>
import {ref} from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
  // Implement form submission logic here, such as sending data to a server
};


</script>

<style>
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
</style>
