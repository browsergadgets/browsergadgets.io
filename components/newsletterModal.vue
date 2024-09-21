<template>
    <dialog class="newsletterDialog flex rounded-2xl relative"
            :open="modalOpen">

        <div class="leftSection w-1/2">


        </div>

        <div class="rightSection">

            <h2>Subscribe to our newsletter to get updates</h2>

            <iframe src="https://browsergadgets.substack.com/embed"
                    width="480"
                    height="320"
                    style="background:inherit;"
                    frameborder="0"
                    scrolling="no"></iframe>

            <span>Or you can join any of <a href="/community">our communities on Discord or Reddit</a> for the
                same!</span>

                <button class="closeNewsletterModalButton text-2xl absolute top-0 right-0" @click="closeNewsletterModal">X</button>
        </div>


    </dialog>
</template>

<script setup>

import { defineProps } from 'vue';

// Define the modalOpen prop
const props = defineProps({
    modalOpen: {
        type: Boolean,
        required: true,
    }
});

const closeNewsletterModal = () => {
}



</script>

<style>

.leftSection{
    /* background-image: ; */
}

dialog:not([open]) {
    display: none;
}

dialog::backdrop {
    background-color: black;
    display: flex;
    justify-content:center ;
    align-items: center;
}
</style>