<template>
  <main class="flex flex-col justify-center items-center">

    <BlogHero />


    <ContentQuery path="/blog"
                  :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image', 'thumbnail']"
                  :sort="{
                    date: -1
                  }"
                  v-slot="{ data }">
                  <BlogList :data="data" />
                </ContentQuery>
                <!-- :limit="blogCountLimit" -->

    
  </main>
</template>

<script setup>
const blogCountLimit = 6;
// const { data } = await useAsyncData(`content-/blog`, async () => {
//   const _posts = await queryContent('/blog').only('headline').find()
//   return Math.ceil(_posts.length / blogCountLimit);
// });
</script>


<style scoped>
main{
  padding: 1rem

}


</style>