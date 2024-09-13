<template>
    <div>

        <DesktopNav />
        <slot />
        <Footer/>

    </div>
</template>

<script setup>
import DesktopNav from '~/components/nav/desktopNav.vue';
import footer from '~/components/footer.vue';

</script>

<style lang="scss" scoped>

</style>