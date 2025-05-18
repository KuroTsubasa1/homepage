<script lang="ts" setup>
import FooterComponent from "~/components/footerComponent.vue";

useSeoMeta({
  title: 'Contact Lasse Harm | Get in Touch for Projects & Inquiries',
  ogTitle: 'Contact Lasse Harm | Get in Touch for Projects & Inquiries',
  description: 'Reach out to Lasse Harm for web development, drone photography, professional photography, or 3D printing services. Based in Copenhagen, Denmark.',
  ogDescription: 'Reach out to Lasse Harm for web development, drone photography, professional photography, or 3D printing services. Based in Copenhagen, Denmark.',
  ogImage: 'https://pocket.lasseharm.space/api/files/contact_image.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'contact, inquiry, web development services, drone photography, 3D printing services, Copenhagen photographer',
});
</script>

<template>
  <navigation></navigation>
  
  <!-- Hero Section -->
  <section class="py-20 bg-primary relative">
    <div class="container mx-auto px-4 text-center text-white">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
      <p class="text-xl max-w-2xl mx-auto">Let's discuss how I can help bring your vision to life. Get in touch today.</p>
    </div>
    <div class="absolute bottom-0 w-full overflow-hidden leading-0 transform">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" class="relative block w-full h-12 md:h-16">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" opacity=".25"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#ffffff" opacity=".5"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
      </svg>
    </div>
  </section>
  
  <!-- Contact Form Section -->
  <contact-section></contact-section>
  
  <!-- Map Section -->
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">Find Me In</h2>
      <div class="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d142863.3388825159!2d12.4462995!3d55.676098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652533c5c803d23%3A0x4dd7edde69467b8!2sCopenhagen%2C%20Denmark!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </section>
  
  <!-- FAQ Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-2">Frequently Asked Questions</h2>
      <div class="w-24 h-1 bg-primary mx-auto mb-12"></div>
      
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2">What areas do you serve?</h3>
          <p class="text-gray-600">I'm based in Copenhagen, Denmark but work with clients globally for web development and 3D printing. For photography and drone services, I primarily work within Denmark but am available for travel.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2">What is your typical project process?</h3>
          <p class="text-gray-600">I follow a collaborative approach: discovery call, proposal, contract, development/creation, review rounds, and final delivery. I keep clear communication throughout the process.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2">What are your payment terms?</h3>
          <p class="text-gray-600">Payment terms vary by project type and size. Typically, I require a 50% deposit to secure your project slot, with the remaining balance due upon completion.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2">How long does a typical project take?</h3>
          <p class="text-gray-600">Project timelines vary based on complexity. Websites typically take 3-6 weeks, drone shoots 1-2 days plus editing time, and 3D printing projects vary by size and complexity.</p>
        </div>
      </div>
    </div>
  </section>
  
  <footer-component></footer-component>
</template>

<style scoped>
/* Wave animation */
@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(0);
  }
}

/* FAQ animations */
.bg-white {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bg-white:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>