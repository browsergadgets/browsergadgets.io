<template>
    <nav class="flex p-5 items-center justify-between">

        <NuxtLink to="/"
                  class="navLogoLink">
            <img src="../../assets/images/bgioText_cropped.png"
                 class="navLogo"
                 alt="">
        </NuxtLink>

        <div class="navLinks">
            <NuxtLink to="/ecosystem/"
                      exact-active-class="active-link"
                      class="nav-link">
                Ecosystem
            </NuxtLink>
            <NuxtLink to="/learn/"
                      exact-active-class="active-link"
                      class="nav-link">
                Learn
            </NuxtLink>
            <NuxtLink to="/blog/"
                      exact-active-class="active-link"
                      class="nav-link">
                Blog
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup>
</script>

<style scoped>
.navLogo {
    mix-blend-mode: multiply;
    max-width: 15rem;
    z-index: -2;
    pointer-events: none;
}
.navLogoLink{
    margin-left: 1rem;
}


.navLinks{

}

.nav-link {
    color: #333;
    text-decoration: none;
    font-size: 1.2rem;
    margin-inline: 2rem;
    border-radius: 4px;
    padding: .2rem;
    transition: .2s ease;
}

.nav-link:hover {}

.active-link {
    font-weight: 800;
    color: #00b351;
}
</style>
