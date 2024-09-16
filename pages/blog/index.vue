<template>
  <main class="flex flex-col justify-center items-center">
    <BlogHero />

    <!-- Define pagination control properties -->
    <ContentQuery path="/blog"
                  :only="['title', 'headline', 'excerpt', 'date', 'tags', '_path', 'image', 'thumbnail', 'category']"
                  :sort="{ date: -1 }"
                  :limit="postsPerPage"
                  :skip="(currentPage - 1) * postsPerPage"
                  v-slot="{ data, refresh }">
      <BlogList :data="data" />
    </ContentQuery>

    <!-- Pagination Controls -->
    <div class="pagination-controls mt-4">
      <button @click="prevPage"
              :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const postsPerPage = 6; // Number of posts per page
const currentPage = ref(1); // Current page number

// Navigation methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  currentPage.value++;
};
</script>

<style scoped>
main {
  padding: 1rem;
}

.pagination-controls {
  display: flex;
  gap: 1rem;
}
</style>
