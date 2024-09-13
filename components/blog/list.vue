<template>
    <ul class="grid grid-cols-3 gap-8 p-10">

        <li v-for="article in data"
            :key="article._path"
            class="">


            <NuxtLink :to="article._path + '/'"
                      class="">


                <div class="blogPost_wrapper flex flex-col rounded-2xl  text-white">

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
    <p v-if="data.length == 0"
       class="w-full md:w-7/12 text-h3 leading-h3 font-bold dark:text-white">{{ message }}</p>
</template>

<script setup>
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


</script>


<style scoped>
.postThumbnail_wrapper {
    /* max-height: 5rem; */
}

.postThumbnail {
    height: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.blogPost_wrapper {
    background-color: var(--green);

    background:linear-gradient(20deg, var(--green), var(--yellow));
    box-shadow: 0 .2rem .5rem rgba(0, 0, 0, 0.584);
    transition: .2s ease;
}

.blogPost_wrapper:hover {
    transform: scale(1.02);
}

</style>
