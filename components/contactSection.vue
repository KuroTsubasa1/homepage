<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const service = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const services = [
  { value: 'web', label: 'Web Development' },
  { value: 'drone', label: 'Drone Photography' },
  { value: 'photo', label: 'Photography' },
  { value: '3d', label: '3D Printing' },
  { value: 'other', label: 'Other / Not Sure' }
];

const handleSubmit = async () => {
  if (!name.value || !email.value || !message.value) {
    errorMessage.value = 'Please fill out all required fields.';
    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
    return;
  }

  try {
    isSubmitting.value = true;
    
    // Example for sending form data - replace with your actual form submission endpoint
    const response = await fetch('https://api.lasseharm.space/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
        service: service.value
      }),
    });

    if (response.ok) {
      // Clear form and show success message
      name.value = '';
      email.value = '';
      message.value = '';
      service.value = '';
      successMessage.value = 'Your message has been sent! I will get back to you soon.';
      setTimeout(() => {
        successMessage.value = '';
      }, 5000);
    } else {
      // Show error message
      errorMessage.value = 'There was a problem sending your message. Please try again later.';
      setTimeout(() => {
        errorMessage.value = '';
      }, 5000);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    errorMessage.value = 'There was a problem sending your message. Please try again later.';
    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-2">Get in Touch</h2>
      <div class="w-24 h-1 bg-primary mx-auto mb-12"></div>
      
      <div class="max-w-3xl mx-auto">
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          {{ successMessage }}
        </div>
        
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-1">
            <label for="name" class="block text-gray-700 font-medium mb-2">Your Name <span class="text-red-500">*</span></label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your name"
            >
          </div>
          
          <div class="md:col-span-1">
            <label for="email" class="block text-gray-700 font-medium mb-2">Your Email <span class="text-red-500">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
            >
          </div>
          
          <div class="md:col-span-2">
            <label for="service" class="block text-gray-700 font-medium mb-2">Service You're Interested In</label>
            <select 
              id="service" 
              v-model="service" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="" disabled selected>Select a service</option>
              <option v-for="option in services" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div class="md:col-span-2">
            <label for="message" class="block text-gray-700 font-medium mb-2">Your Message <span class="text-red-500">*</span></label>
            <textarea 
              id="message" 
              v-model="message" 
              required
              rows="5"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Describe your project or inquiry"
            ></textarea>
          </div>
          
          <div class="md:col-span-2 text-center">
            <button 
              type="submit" 
              class="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            </button>
          </div>
        </form>
        
        <div class="contact-info mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="icon-wrapper mx-auto mb-4 w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Email</h3>
            <p class="text-gray-600">
              <a href="mailto:hello@lasseharm.space" class="hover:text-primary transition-colors">hello@lasseharm.space</a>
            </p>
          </div>
          
          <div class="text-center">
            <div class="icon-wrapper mx-auto mb-4 w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Location</h3>
            <p class="text-gray-600">Copenhagen, Denmark</p>
          </div>
          
          <div class="text-center">
            <div class="icon-wrapper mx-auto mb-4 w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Working Hours</h3>
            <p class="text-gray-600">Monday - Friday: 9am - 5pm</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-info .icon-wrapper {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.contact-info .icon-wrapper:hover {
  transform: scale(1.1);
  background-color: rgba(74, 126, 179, 0.2);
}
</style>