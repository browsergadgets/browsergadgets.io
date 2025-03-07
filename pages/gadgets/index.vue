<template>
  <section>
    <h1 class="text-[var(--red)]  font-[MoreSugar]">Discover Awesome <span class="text-[var(--green)]">Gadgets</span></h1>



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

</style>