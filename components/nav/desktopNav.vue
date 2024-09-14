<template>
    <nav class="flex mt-4 p-5 items-center justify-between">

        <NuxtLink to="/"
                  class="navLogoLink">
            <img src="../../assets/images/bgioText_cropped-transparent.png"
                 class="navLogo"
                 alt="">
        </NuxtLink>

        <div class="navLinks">
            <NuxtLink to="/ecosystem/"
                      exact-active-class="active-link"
                      class="nav-link">
                🌐Ecosystem
            </NuxtLink>
            <NuxtLink to="/learn/"
                      exact-active-class="active-link"
                      class="nav-link">
                📖Learn
            </NuxtLink>
            <NuxtLink to="/blog/"
                      exact-active-class="active-link"
                      class="nav-link">
                🗒️Blog
            </NuxtLink>
            <NuxtLink to="/community/"
                      exact-active-class="active-link"
                      class="nav-link">
                🤗Community
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup>
</script>

<style scoped>
.navLogo {
    max-width: 15rem;
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
    transform: scale(0.95);
}


.navLinks{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.nav-link {
    text-shadow: .05rem .05rem .1rem black;
    font-weight: 900;
    text-decoration: none;
    font-size: 1.5rem;
    margin-inline: 1rem;
    border-radius: 1rem;
    padding: .5rem;
    text-align: center;
    transition: .1s ease;
}

.nav-link:nth-child(1n) {
    color: var(--red);
}
.nav-link:nth-child(1n).active-link,
.nav-link:nth-child(1n):focus,
.nav-link:nth-child(1n):hover {
    background-color: var(--red);
    color: var(--white);
}
.nav-link:nth-child(2n) {
    color: var(--green);
}

.nav-link:nth-child(2n).active-link,
.nav-link:nth-child(2n):focus,
.nav-link:nth-child(2n):hover {
    background-color: var(--green);
    color: var(--white);
}

.nav-link:nth-child(3n) {
    color: var(--purple);
}
.nav-link:nth-child(3n).active-link,
.nav-link:nth-child(3n):focus,
.nav-link:nth-child(3n):hover {
    background-color: var(--purple);
    color: var(--white);
}

.nav-link:nth-child(4n) {
    color: var(--yellow);
}
.nav-link:nth-child(4n).active-link,
.nav-link:nth-child(4n):focus,
.nav-link:nth-child(4n):hover {
    background-color: var(--yellow);
    color: var(--white);
}

.nav-link:active {
    transform: scale(0.9);
}

.active-link {
    /* font-weight: 800; */
    /* color: #00b351; */
}
</style>
