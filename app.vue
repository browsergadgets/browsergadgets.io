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

<script setup lang="ts">




const websiteTitle = ref("Browser Gadgets - Solving your Browsing Problems")


function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/images/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/' + path]
}

const getShowImageImageURL = (index) => {
  return useAsset(`images/gadgets/${gadgetSlug}/showImage_${index}` + '.png')
}

useSeoMeta({
  // Basic Meta Tags
  title: websiteTitle.value,
  description: 'Discover ultra useful and premium quality browser extensions and make your web a better place to be in.',
  keywords: 'browser extensions, Chrome extensions, Firefox add-ons, extension development, browser tools, useful chrome extensions, best chrome extensions, top 5 most useful chrome extensions in 2025, useful browser extensions, chrome webstore, how to improve productivity, customize web, make browsing easier',
  author: 'Browser Gadgets',

  // Open Graph (OG) for Facebook, LinkedIn, etc.
  ogTitle: websiteTitle.value,
  ogDescription: 'Make your browsing faster and more joyful with our highly efficient browser extensions.',
  ogImage: '/OGimage.png', // Recommended dimensions: 1200x630px
  ogUrl: 'https://browsergadgets.io/',
  ogSiteName: 'Browser Gadgets',
  ogType: 'website',
  // ogLocale: 'en_US', // Change to your preferred locale

  // Twitter Cards
  twitterCard: 'summary_large_image',
  twitterTitle: websiteTitle.value,
  twitterDescription: 'Make your browsing faster and more joyful with our highly efficient browser extensions.',
  twitterImage: '/OGimage.png', // Recommended dimensions: 1200x675px
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