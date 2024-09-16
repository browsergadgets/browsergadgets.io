<template>
    <div class="w-full p-10">
        <!-- Search Bar -->
        <div class="search-bar mb-6 flex justify-center">
            <input v-model="searchQuery"
                   type="text"
                   placeholder="Search blog posts..."
                   class="search-input px-4 py-2 border rounded-md w-1/2" />
        </div>
        <!-- Category Filter Buttons -->
        <div class="categories-filter mb-10 flex flex-wrap justify-center">
            <button v-for="category in categories"
                    :key="category"
                    @click="toggleCategory(category)"
                    :class="['category-button', { active: selectedCategories.includes(category) }]">
                {{ category }}
            </button>
        </div>

        <!-- Blog Posts -->
        <ul class="grid grid-cols-4 gap-8 w-full">
            <li v-for="article in filteredData"
                :key="article._path"
                class="blogPostListItem rounded-2xl text-white">
                <NuxtLink :to="article._path + '/'">
                    <div class="blogPost_wrapper flex flex-col">
                        <div class="postThumbnail_wrapper">
                            <img :src="article.thumbnail"
                                 class="postThumbnail"
                                 alt="Blog post Thumbnail">
                        </div>
                        <div class="blogPostInfoText p-4">
                            <p class="text-sm py-2 opacity-80">
                                {{ $formatDate(article.date) }}
                            </p>
                            <h2 class="text-2xl text-center">
                                {{ article.headline }}
                            </h2>
                            <p>{{ article.excerpt }}</p>
                        </div>
                    </div>
                </NuxtLink>
            </li>
        </ul>

        <!-- No Posts Message -->
        <p v-if="filteredData.length === 0"
           class="w-full md:w-7/12 text-h3 leading-h3 font-bold dark:text-white">
            {{ message }}
        </p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        default: "There are no posts right now, but stay tuned for newer releases in the future."
    }
});
const { $formatDate } = useNuxtApp();


// Categories for filtering
const categories = [
    'Security',
    'Marketing',
    'Interviews',
    'Success Stories',
    'Developing',
    'Designing',
    'Concept Teaching',
    'Other'
];
const selectedCategories = ref([]);
const searchQuery = ref(''); // Search query state


// Toggle category selection
const toggleCategory = (category) => {
    if (selectedCategories.value.includes(category)) {
        selectedCategories.value = selectedCategories.value.filter(cat => cat !== category);
    } else {
        selectedCategories.value.push(category);
    }

};

// Filtered data based on selected categories and search query
const filteredData = computed(() => {
    let filtered = props.data;

    // Filter by categories
    if (selectedCategories.value.length > 0) {
        filtered = filtered.filter(article =>
            selectedCategories.value.includes(article.category || 'Other')
        );
    }

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();

        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(query) || article.headline.toLowerCase().includes(query)

        );
    }
    return filtered;
});


</script>

<style scoped>
/* Category Button Styles */
.category-button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.category-button.active {
    background-color: #4a90e2;
    color: white;
    border-color: #4a90e2;
}

.category-button:not(.active) {
    background-color: white;
    color: #333;
}

.category-button:hover {
    background-color: #4a90e2;
    color: white;
}

/* Existing Styles */
.postThumbnail_wrapper {
    /* max-height: 5rem; */
}

.postThumbnail {
    width: 100%;
    height: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.blogPostListItem {
    /* background:linear-gradient(20deg, var(--green), var(--yellow)); */
    box-shadow: 0 .2rem .5rem rgba(0, 0, 0, 0.584);
    transition: .2s ease;
}

.blogPostInfoText h2 {
    text-shadow: .1rem .1rem .1rem black;
    font-weight: 700;
    text-align: left;
}

.blogPostListItem:nth-of-type(1n) {
    background: linear-gradient(180deg, var(--red-light), var(--red-dark));
}

.blogPostListItem:nth-of-type(1n):hover {
    background: linear-gradient(170deg, var(--red-light), var(--red-dark));
}

.blogPostListItem:nth-of-type(2n) {
    background: linear-gradient(180deg, var(--purple-light), var(--purple-dark));
}

.blogPostListItem:nth-of-type(2n):hover {
    background: linear-gradient(170deg, var(--purple-light), var(--purple-dark));
}

.blogPostListItem:nth-of-type(3n) {
    background: linear-gradient(180deg, var(--green-light), var(--green-dark));
}

.blogPostListItem:nth-of-type(3n):hover {
    background: linear-gradient(170deg, var(--green-light), var(--green-dark));
}

.blogPostListItem:nth-of-type(4n) {
    background: linear-gradient(180deg, var(--yellow-light), var(--yellow-dark));
}

.blogPostListItem:nth-of-type(4n):hover {
    background: linear-gradient(170deg, var(--yellow-light), var(--yellow-dark));
}

.blogPostListItem:hover {
    transform: scale(1.02);
}
</style>
