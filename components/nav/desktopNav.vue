<template>
    <nav class="flex p-4 my-4 items-center justify-between">


        <div class="flex items-center justify-center"
             @mouseenter="logoImageHovered" @mouseleave="logoImageLeft">
            <NuxtLink to="/"
                      class="navLogoLink">
                <img :src="logoImageSrc"
                     class="navLogo"
                     ref="logoImage"
                     alt="">
            </NuxtLink>
        </div>

        <div class="navLinks">
            <NuxtLink to="/ecosystem/"
                      exact-active-class="active-link"
                      class="nav-link">
                Signup
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const logoImage = ref(null);
const logoImageSrc = ref(new URL('../../assets/images/logo-transparent.png', import.meta.url).href);

function logoImageHovered() {
    console.log('hovered');
    logoImageSrc.value = new URL('../../assets/images/logoCharacters-transparent.png', import.meta.url).href;
}

function logoImageLeft() {
    console.log('left');
    logoImageSrc.value = new URL('../../assets/images/logo-transparent.png', import.meta.url).href;
}

</script>

<style scoped>
.navLogo {
    width: 100%;
    max-width: 4rem;
    z-index: -2;
    pointer-events: none;
    /* mix-blend-mode: multiply; */
}
.navLogoLink{
    /* mix-blend-mode: multiply; */
    margin-left: 1rem;
    transition: .3s ease;
}
.navLogoLink:active {
    transform: scale(0.9);
}


.navLinks{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.nav-link {
    font-family: 'MoreSugar';
    text-shadow: .1rem .1rem rgb(0, 0, 0);
    font-weight: 900;
    text-decoration: none;
    font-size: 1.5rem;
    margin-inline: 1rem;
    border-radius: 1rem;
    padding: .5rem;
    text-align: center;
    transition: .1s ease;
    letter-spacing: .1rem;
}

.nav-link:nth-child(1n) {
    color: var(--white);
    background-color: var(--green);
    box-shadow: .1rem .1rem rgb(0, 0, 0);
    /* color: var(--green-light); */
}
.nav-link:nth-child(1n):focus,
.nav-link:nth-child(1n):hover {
    /* transform: scale(1.05); */
}

.nav-link:active {
    transform: scale(0.9);
}

/* .active-link {
    /* font-weight: 800; */
    /* color: #00b351; */
/*}  */
</style>
