<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  // Basic Meta Tags
  title: 'Browser Gadgets - Everything about Browser Extensions',
  description: 'Discover and master browser extensions with Browser Gadgets. Learn to build, find the best tools, and enhance your browsing experience.',
  keywords: 'browser extensions, Chrome extensions, Firefox add-ons, extension development, browser tools',
  author: 'Browser Gadgets',

  // Open Graph (OG) for Facebook, LinkedIn, etc.
  ogTitle: 'Browser Gadgets - Everything about Browser Extensions',
  ogDescription: 'Master browser extensions with our expert guides, curated collections, and premium tools.',
  ogImage: 'https://browsergadgets.io/assets/OGimage.png', // Recommended dimensions: 1200x630px
  ogUrl: 'https://browsergadgets.io/',
  ogSiteName: 'Browser Gadgets',
  ogType: 'website',
  ogLocale: 'en_US', // Change to your preferred locale

  // Twitter Cards
  twitterCard: 'summary_large_image',
  twitterTitle: 'Browser Gadgets - Everything about Browser Extensions',
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
</script>

<style>

</style>