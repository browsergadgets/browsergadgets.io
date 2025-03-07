<template>
  <section class="">

    <main>
      <img :src="`@/_nuxt/assets/images/gadgets/${gadgetName}/logo.png`"
           alt="">
    </main>

  </section>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';
import { gadgetsData } from '~/data/gadgets';
import DodoPayments from 'dodopayments';


const route = useRoute()
const gadgetName = route.path.replace('/gadgets/', '')
const currentGadgetData = gadgetsData[gadgetName]
const logoURL = '_nuxt/assets/images/gadgets/' + gadgetName + '/logo.png'
definePageMeta({
  // layout: 'auth',
  // middleware: ['auth']
});


watchEffect(() => {
  useSeoMeta({
    title: currentGadgetData.name + ' - ' + currentGadgetData.tagline

  });
});


onMounted(() => {
  console.log(gadgetName);

})

// Logo and Name | Install button for correct browser

// Images and an Intro video
// Description
// 


</script>

<style></style>