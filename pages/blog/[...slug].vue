<template>
    <main class="flex flex-col justify-center items-center my-20 w-full">

        <ContentDoc>

            <template v-slot="{doc}">

                
                <div class="thumbnail_wrapper">
                    <img :src="doc.thumbnail"
                    alt="Article Thumbnail"
                    class="rounded-3xl shadow-xl w-full">
                </div>

                <h1 class="blogPostTitle mt-5">{{ doc.title }}</h1>

                <div class="blogContent_wrapper mt-5 flex flex-row w-4/5">

                    <aside class="tableOfContents w-1/5">
                        <ul class="p-5 flex flex-col">
                            <li><a href="#">A Subheading Link</a></li>
                            <li><a href="#">A Subheading Link</a></li>
                            <li><a href="#">A Subheading Link</a></li>
                            <li><a href="#">A Subheading Link</a></li>
                        </ul>
                    </aside>

                    <article class="flex p-5 pt-0 text-left w-full">
                        
                        <ContentRenderer :value="doc"
                        class="w-full"/>
                        
                    </article>
                </div>

            </template>
        </ContentDoc>
    </main>
</template>

<script setup>
</script>

<style>
.thumbnail_wrapper{
    display: flex;
    width: 50%;
}
.tableOfContents ul{
    position: sticky;
    top: 0rem;
}
.tableOfContents li{
    margin-block: .5rem;
}
article{
    font-size: 1.2rem;
    
}


article h1 {
    font-size: 3.5rem;
    /* Largest size */
    font-weight: 800;
    /* Heaviest weight */
}

article h2 {
    font-size: 3rem;
    /* Slightly smaller */
    font-weight: 700;
    /* Slightly lighter */
    margin-top: 1.5rem;
}

article h3 {
    font-size: 2.5rem;
    /* Smaller */
    font-weight: 600;
    margin-top: 1.25rem;
}

article h4 {
    font-size: 2rem;
    /* Even smaller */
    font-weight: 500;
    margin-top: 1rem;
}

article h5 {
    font-size: 1.75rem;
    /* Smaller still */
    font-weight: 400;
    margin-top: 0.75rem;
}

article h6 {
    font-size: 1.5rem;
    /* Smallest size */
    font-weight: 300;
    /* Lightest weight */
    margin-top: 0.5rem;
}
/* Base styles for headings */
article h2,
article h3,
article h4,
article h4,
article h5,
article h6 {
    position: relative;
    cursor: pointer;
    width: fit-content;
}

/* ::after pseudo-element for article h1 */
article h2:hover::after,
article h3:hover::after, 
article h4:hover::after, 
article h5:hover::after, 
article h6:hover::after 
{
    content: "#";
    /* The hash symbol to show on hover */
    position: absolute;
    /* Position relative to the heading */
    left: -1.5rem;
    top: 0rem;
    /* Adjust the position to your preference */
    color: rgb(123, 123, 123);
    /* Color of the hash symbol */
    font-size: inherit;
    /* Adjust size relative to the heading */
    font-weight: inherit;
    /* Font weight of the hash symbol */
    opacity: 0;
    /* Initially hidden */
    transition: opacity 0.2s ease;
    /* Smooth fade-in */
}

/* Show the ::after element on hover */
article h2:hover::after,
article h3:hover::after,
article h4:hover::after,
article h5:hover::after,
article h6:hover::after {
    opacity: 1;
    /* Show the hash symbol */
}


</style>
