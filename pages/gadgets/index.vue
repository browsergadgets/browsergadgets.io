<template>
  <section>
    <div class="gadgetsPageHeader rounded-2xl p-4">

      <h1 class="gadgetsPageHeader">Discover Awesome <span class="gradientText">Gadgets</span>👀✨
      </h1>
    </div>



    <div class="gadgets-wrapper mt-10 p-5">
      <gadgetBox v-for="(gadgetData, gadgetName) in gadgetsData"
                 :key="gadgetName"
                 :gadgetName="gadgetName"
                 :gadgetData="gadgetData" />
    </div>



  </section>
</template>

<script lang="ts" setup>
import gadgetBox from './components/gadgetBox.vue';
import { gadgetsData } from '~/data/gadgets';


</script>

<style>


.gadgetsPageHeader h1{
  font-family: 'Akaya Kanadaka';
  line-height: 5rem;
}
.gradientText {
  background: linear-gradient(90deg, #ffee7e, hsl(0, 100%, 63%), #e97eff, #58f949);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 5s infinite alternate ease-in-out;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
} 
</style>