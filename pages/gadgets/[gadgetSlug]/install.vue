<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { detectBrowser } from '#imports';

const route = useRoute();
const gadgetSlug = route.params.gadgetSlug;
const gadgetData = ref(null);


definePageMeta({
    layout: 'empty',
});

const getExtensionInstallURL = () => {
    const browser = detectBrowser()
    let storeURL = '';
    if (browser) {
        if (['brave', 'chrome'].includes(browser)) {
            storeURL = gadgetData.value.storeURLs.chromeWebStore
        }
        else if (['microsoft-edge'].includes(browser)) {
            storeURL = gadgetData.value.storeURLs.msEdgeAddons
        }
    }
    if (!storeURL) {
        return gadgetData.value.storeURLs.chromeWebStore
    }
    else {
        return storeURL
    }

}


onMounted(async () => {
    gadgetData.value = await $fetch('/api/g/getGadgetData?name=' + gadgetSlug)
    window.location.replace(getExtensionInstallURL()) // Redirect to the store
});
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <p>Redirecting to the store...</p>
    </div>
</template>
