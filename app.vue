<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->

    <h1>Welcome to BrowserGadgets.io</h1>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Browser Gadgets - Ultimate Browser Extension Hub',
  ogTitle: 'Browser Gadgets - Ultimate Browser Extension Hub',
  description: 'Discover the best browser extensions for productivity, security, and customization. Learn how to develop your own extensions with our expert guides and resources.',
  ogDescription: 'Browser Gadgets is your go-to platform for finding, creating, and mastering browser extensions. Explore our curated collection, development tutorials, and premium resources.',
  ogImage: 'OGimage.png', // Make sure to replace this with your actual image URL
  // twitterCard: 'OGimage.png',
})
</script>
