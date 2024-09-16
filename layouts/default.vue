<template>
    <div>

        <DesktopNav />
        <slot />
        <Footer />

    </div>
</template>

<script setup>
import DesktopNav from '~/components/nav/desktopNav.vue';
import Footer from '~/components/footer.vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const bgColorOfPages = {
    "/":'var(--yellow-lightest)',
    "/learn/":'var(--green-lightest)',
    "/blog/":'var(--yellow-lightest)',
    "/ecosystem/":'var(--red-lightest)',
    "/community/":'var(--yellow-lighter)',

}

onMounted(()=>{
    document.body.style.backgroundColor = bgColorOfPages?.[route.path];

    watch(route, newRoute=>{
        document.body.style.backgroundColor = bgColorOfPages?.[newRoute.path];
    })


})
</script>

<style>

</style>