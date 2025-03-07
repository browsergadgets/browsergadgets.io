<template>
    <div>
        <!-- <DesktopNav /> -->
        <slot></slot>
        <!-- <Footer></Footer> -->


    </div>
</template>

<script setup>
import DesktopNav from '~/components/nav/desktopNav.vue';
import Footer from '~/components/footer.vue';

import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style>
body {
    background-color: var(--yellow-lightest);
    overflow-y: hidden;
}
</style>