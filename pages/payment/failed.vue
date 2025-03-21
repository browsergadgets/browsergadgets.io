<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 class="text-3xl font-bold text-red-600">❌ Payment Failed!</h1>
        <p class="text-lg mt-2">Oops! Something went wrong with your payment. Please try again or contact support.</p>
        <NuxtLink to="/"
                  class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Go to Home
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">

</script>