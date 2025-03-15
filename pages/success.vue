<template>
  <div>
    <h1>Payment {{route.path}}</h1>
  </div>
</template>

<script lang="ts" setup>



const router = useRouter();
const route = useRoute();



onMounted(()=>{

  if (route.params.status === 'success') {
    notifyExtensionPurchase()
  }
})

</script>

<style>

</style>