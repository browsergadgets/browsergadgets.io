<template>
  <div>

    <h1>We are building an ecosystem of browser extensions</h1>
    <button @click="openNewsletterModal">Stay updated</button>

    <newsletterModal :modal-open="openModal"/>

  </div>
</template>

<script setup>
import newsletterModal from '~/components/newsletterModal.vue';
import { ref } from 'vue';

const openModal = ref(false);
const openNewsletterModal = ()=>{
  openModal.value=true
}
</script>




<style>

</style>