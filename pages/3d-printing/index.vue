<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";
import { ref } from 'vue';

useSeoMeta({
  title: '3D Printing Services & Prototyping - Lasse Harm',
  ogTitle: '3D Printing Services & Prototyping - Lasse Harm',
  description: 'Professional 3D printing services, rapid prototyping, and custom model creation for businesses and individuals.',
  ogDescription: 'Professional 3D printing services, rapid prototyping, and custom model creation for businesses and individuals.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
});

const printers = ref([
  {
    name: 'Prusa i3 MK3S+',
    description: 'High precision FDM printer perfect for functional parts and prototypes. Reliable and consistent quality.',
    specs: ['0.05mm layer resolution', '250 x 210 x 210mm build volume', 'Multiple material support', 'Silent operation'],
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300'
  },
  {
    name: 'Elegoo Saturn 2',
    description: 'Resin-based MSLA 3D printer for ultra-detailed models, miniatures, and precision parts.',
    specs: ['0.01mm layer resolution', '196 x 122 x 210mm build volume', '8K resolution screen', 'Fast printing speed'],
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300'
  },
  {
    name: 'Creality CR-10 S5',
    description: 'Large format FDM printer for big projects, signage, and full-scale prototypes.',
    specs: ['0.1mm layer resolution', '500 x 500 x 500mm build volume', 'Heated bed', 'Direct drive extruder'],
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300'
  }
]);

const services = ref([
  {
    title: 'Rapid Prototyping',
    description: 'Turn ideas into physical prototypes quickly and cost-effectively. Iterate designs rapidly to test form, fit, and function before committing to expensive tooling.',
    icon: 'fa-solid-cog',
    examples: ['Product prototypes', 'Concept models', 'Functional testing', 'Design validation']
  },
  {
    title: 'Custom Models & Props',
    description: 'Create custom models, props, and display pieces for photography, marketing, events, and more. Bring your creative visions to life in 3D.',
    icon: 'fa-solid-image',
    examples: ['Display models', 'Photography props', 'Trade show exhibits', 'Film & video props']
  },
  {
    title: 'Small Batch Production',
    description: 'Produce small runs of parts without the high setup costs of traditional manufacturing. Perfect for startups, customized products, and market testing.',
    icon: 'fa-solid-cubes',
    examples: ['Product launches', 'Custom components', 'Replacement parts', 'Limited editions']
  },
  {
    title: '3D Design Services',
    description: 'Don\'t have a 3D model? Our design team can create professional 3D models from sketches, photos, or even just your description.',
    icon: 'fa-solid-pencil',
    examples: ['CAD modeling', 'Reverse engineering', 'Design optimization', 'File preparation']
  }
]);

// Company link - add your 3D printing company website here
const companyLink = 'https://yourcompany.com';
</script>

<template>
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="relative bg-cover bg-center py-32" style="background-image: url('https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080')">
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
    <div class="relative z-10 container mx-auto px-4">
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Bring Your Ideas<br> To Life With 3D Printing
        </h1>
        <p class="text-xl text-white/90 mb-8">
          Professional 3D printing services for prototypes, models, and small production runs
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#services" class="btn btn-primary px-6 py-3 rounded-full text-lg">Explore Services</a>
          <a :href="companyLink" target="_blank" class="btn bg-white text-primary px-6 py-3 rounded-full text-lg hover:bg-gray-100">
            Visit 3D Printing Company
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Equipment Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Professional Equipment</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">State-of-the-art 3D printers to handle any project with precision and reliability</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(printer, index) in printers" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <img :src="printer.image" :alt="printer.name" class="w-full h-56 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-primary mb-2">{{ printer.name }}</h3>
            <p class="text-gray-600 mb-4">{{ printer.description }}</p>
            <ul class="space-y-2">
              <li v-for="(spec, sidx) in printer.specs" :key="sidx" class="flex items-start">
                <svg class="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-600">{{ spec }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">3D Printing Services</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive solutions for all your 3D printing needs</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div v-for="(service, index) in services" :key="index" class="bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl border-t-4 border-primary">
          <h3 class="text-2xl font-bold text-primary mb-4">{{ service.title }}</h3>
          <p class="text-gray-600 mb-6">{{ service.description }}</p>
          <div class="mb-6">
            <h4 class="font-semibold text-gray-800 mb-2">Examples:</h4>
            <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
              <li v-for="(example, eidx) in service.examples" :key="eidx" class="flex items-center">
                <svg class="h-4 w-4 text-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-sm text-gray-600">{{ example }}</span>
              </li>
            </ul>
          </div>
          <a href="/contact" class="text-primary font-semibold flex items-center hover:underline">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Our Process</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Simple, efficient, and transparent from concept to completion</p>
      </div>
      
      <div class="flex flex-col md:flex-row">
        <div class="flex-1 relative md:pr-6 pb-16 md:pb-0">
          <!-- Timeline line -->
          <div class="absolute top-0 left-7 md:left-auto md:right-0 bottom-0 w-0.5 bg-primary"></div>
          
          <!-- Step 1 -->
          <div class="relative mb-12">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold z-10">1</div>
              <div class="ml-6 md:ml-0 md:mr-6 md:text-right">
                <h3 class="text-2xl font-bold text-primary">Consultation</h3>
              </div>
            </div>
            <div class="ml-16 md:ml-0 md:mr-16 md:text-right">
              <p class="text-gray-600">We discuss your needs, requirements, and project goals to understand exactly what you're looking for.</p>
            </div>
          </div>
          
          <!-- Step 2 -->
          <div class="relative mb-12">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold z-10">2</div>
              <div class="ml-6 md:ml-0 md:mr-6 md:text-right">
                <h3 class="text-2xl font-bold text-primary">Design & Preparation</h3>
              </div>
            </div>
            <div class="ml-16 md:ml-0 md:mr-16 md:text-right">
              <p class="text-gray-600">Our team prepares your 3D model for printing, optimizing it for the best results with the chosen material and process.</p>
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="relative">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold z-10">3</div>
              <div class="ml-6 md:ml-0 md:mr-6 md:text-right">
                <h3 class="text-2xl font-bold text-primary">Printing & Production</h3>
              </div>
            </div>
            <div class="ml-16 md:ml-0 md:mr-16 md:text-right">
              <p class="text-gray-600">Your project is printed with precision using the appropriate technology and materials for your specific needs.</p>
            </div>
          </div>
        </div>
        
        <div class="flex-1 relative md:pl-6">
          <!-- Timeline line (right side) -->
          <div class="absolute top-0 left-7 md:left-0 bottom-0 w-0.5 bg-primary"></div>
          
          <!-- Step 4 -->
          <div class="relative mb-12">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold z-10">4</div>
              <div class="ml-6">
                <h3 class="text-2xl font-bold text-primary">Post-Processing</h3>
              </div>
            </div>
            <div class="ml-16">
              <p class="text-gray-600">Depending on your needs, we apply finishing touches like sanding, painting, or assembly to achieve the perfect final product.</p>
            </div>
          </div>
          
          <!-- Step 5 -->
          <div class="relative">
            <div class="flex items-center mb-4">
              <div class="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold z-10">5</div>
              <div class="ml-6">
                <h3 class="text-2xl font-bold text-primary">Delivery</h3>
              </div>
            </div>
            <div class="ml-16">
              <p class="text-gray-600">Your completed project is carefully packaged and delivered to you, ready for immediate use.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Featured 3D Printing Projects</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Explore our portfolio of successful 3D printing projects</p>
      </div>
      
      <project-grid category="3d"></project-grid>
    </div>
  </section>

  <!-- Materials Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Available Materials</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Choose from a wide range of materials to match your project's specific requirements</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- PLA -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold text-primary mb-3">PLA</h3>
          <p class="text-gray-600 mb-4">Biodegradable thermoplastic with excellent detail. Great for models, prototypes, and decorative items.</p>
          <div class="text-sm text-gray-500">
            <div class="flex justify-between mb-1">
              <span>Strength</span>
              <span>Medium</span>
            </div>
            <div class="flex justify-between mb-1">
              <span>Detail</span>
              <span>High</span>
            </div>
            <div class="flex justify-between">
              <span>Durability</span>
              <span>Medium</span>
            </div>
          </div>
        </div>
        
        <!-- PETG -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold text-primary mb-3">PETG</h3>
          <p class="text-gray-600 mb-4">Durable and food-safe material with good chemical resistance. Perfect for functional parts.</p>
          <div class="text-sm text-gray-500">
            <div class="flex justify-between mb-1">
              <span>Strength</span>
              <span>High</span>
            </div>
            <div class="flex justify-between mb-1">
              <span>Detail</span>
              <span>Medium</span>
            </div>
            <div class="flex justify-between">
              <span>Durability</span>
              <span>High</span>
            </div>
          </div>
        </div>
        
        <!-- ABS -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold text-primary mb-3">ABS</h3>
          <p class="text-gray-600 mb-4">Strong and heat-resistant plastic. Ideal for functional prototypes and end-use parts.</p>
          <div class="text-sm text-gray-500">
            <div class="flex justify-between mb-1">
              <span>Strength</span>
              <span>Very High</span>
            </div>
            <div class="flex justify-between mb-1">
              <span>Detail</span>
              <span>Medium</span>
            </div>
            <div class="flex justify-between">
              <span>Durability</span>
              <span>Very High</span>
            </div>
          </div>
        </div>
        
        <!-- Resin -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold text-primary mb-3">UV Resin</h3>
          <p class="text-gray-600 mb-4">Ultra-high detail material perfect for intricate models, jewelry, and precision components.</p>
          <div class="text-sm text-gray-500">
            <div class="flex justify-between mb-1">
              <span>Strength</span>
              <span>Medium</span>
            </div>
            <div class="flex justify-between mb-1">
              <span>Detail</span>
              <span>Ultra High</span>
            </div>
            <div class="flex justify-between">
              <span>Durability</span>
              <span>Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-6">Ready to start your 3D printing project?</h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto">Contact me today to discuss how 3D printing can bring your ideas to life</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact" class="btn px-8 py-3 font-bold bg-white text-primary rounded-full text-lg hover:bg-gray-100 transition-transform inline-block">
          Contact Me
        </a>
        <a :href="companyLink" target="_blank" class="btn px-8 py-3 font-bold bg-transparent border-2 border-white text-white rounded-full text-lg hover:bg-white/10 transition-transform inline-block">
          Visit 3D Printing Company
        </a>
      </div>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<style scoped>
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

/* Make sure the rounded-full class works properly */
.rounded-full {
  border-radius: 9999px;
}
</style>