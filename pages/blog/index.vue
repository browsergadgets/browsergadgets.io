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

      <!-- Pagination Controls -->
      <div class="pagination-controls mt-4">
        <button @click="prevPage"
                :disabled="currentPage === 1"
                class="prevBlogListButton">
          <Icon icon="grommet-icons:form-previous"
                :ssr="true" />
        </button>
        <span class="flex justify-center items-center p-5">Page {{ currentPage }}</span>
        <button @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="nextBlogListButton">
          <Icon icon="grommet-icons:form-next"
                :ssr="true" />
        </button>
      </div>
    </ContentQuery>
  </main>
</template>


<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { queryContent } from '#imports';

const postsPerPage = 8; // Number of posts per page
const currentPage = ref(1); // Current page number

// Fetch the total number of posts
const { data: totalPosts } = await useAsyncData('totalPosts', async () => {
  const posts = await queryContent('/blog').find();
  return posts.length;
});

// Calculate the total number of pages
const totalPages = computed(() => Math.ceil(totalPosts.value / postsPerPage));

// Navigation methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  // Disable next page if on the last page
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>


<style scoped>
main {
  padding: 1rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.pagination-controls button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
  width: 3rem;
  height: 3rem;

  font-size: 2rem;
  background-color: var(--purple);
  border-radius: .5rem;
  color: var(--purple-lightest);

  cursor: pointer;
}

.pagination-controls button:hover {
  background-color: var(--purple-dark);

}
</style>
