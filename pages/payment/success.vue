<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 class="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
        <p class="text-lg mt-2">Thank you for your purchase. Your order has been processed successfully.</p>
        <NuxtLink to="/"
                  class="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Go to Home
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">

onMounted(()=>{
    const browserObject = window.chrome || window.browser
    sendMessageToExtension(browserObject, 'info', 'user_purchased');

})
</script>