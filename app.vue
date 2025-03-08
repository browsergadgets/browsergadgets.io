<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <Transition :name="pageTransitionName"
                  mode="out-in">

          <NuxtPage />
        </Transition>
        
        
      </NuxtLayout>
      
      
    </div>
</template>

<script setup>




const websiteTitle = ref("Browser Gadgets - Solving your Browsing Problems")

useSeoMeta({
  // Basic Meta Tags
  title: websiteTitle.value,
  description: 'Discover and master browser extensions with Browser Gadgets. Learn to build, find the best tools, and enhance your browsing experience.',
  keywords: 'browser extensions, Chrome extensions, Firefox add-ons, extension development, browser tools',
  author: 'Browser Gadgets',

  // Open Graph (OG) for Facebook, LinkedIn, etc.
  ogTitle: websiteTitle.value,
  ogDescription: 'Master browser extensions with our expert guides, curated collections, and premium tools.',
  ogImage: 'https://browsergadgets.io/assets/OGimage.png', // Recommended dimensions: 1200x630px
  ogUrl: 'https://browsergadgets.io/',
  ogSiteName: 'Browser Gadgets',
  ogType: 'website',
  ogLocale: 'en_US', // Change to your preferred locale

  // Twitter Cards
  twitterCard: 'summary_large_image',
  twitterTitle: websiteTitle.value,
  twitterDescription: 'Explore, learn, and master browser extensions with Browser Gadgets.',
  twitterImage: 'OGimage.png', // Recommended dimensions: 1200x675px
  twitterSite: '@BrowserGadgets', // Your Twitter handle
  // twitterCreator: '@BrowserGadgets', // Your or the author's Twitter handle

  // Robots Meta Tag
  robots: 'index, follow', // Allows search engines to index the page and follow links

  // Twitter and Open Graph Image Alt Texts
  twitterImageAlt: 'Browser Gadgets logo and tagline',
  ogImageAlt: 'Browser Gadgets logo and tagline',
})

onMounted(() => {
  console.log('onMounted hook called');

})

const pageTransitionName = computed(() => {
  // return useRoute().path.startsWith('/blog') ? 'blog-page' : 'page';

  return /^\/blog\/.+/.test(useRoute().path) ? 'blog-page' : 'page';
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}


/* Blog page-specific transition */
.blog-page-enter-active,
.blog-page-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.blog-page-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.blog-page-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* .layout-enter-active,
  .layout-leave-active {
    transition: all 0.4s;
  }
  
  .layout-enter-from,
  .layout-leave-to {
   opacity: 0;
   filter: blur(1rem);
 } */
</style>