<template>
    <nav class="flex p-5 justify-center items-center">
        <NuxtLink to="/blog/"
                  class="nav-link">Ecosystem</NuxtLink>
        <NuxtLink to="/blog/"
                  class="nav-link">Learn</NuxtLink>
        <NuxtLink to="/blog/"
                  class="nav-link">Blog</NuxtLink>
    </nav>
</template>

<script setup>
</script>

<style scoped>
.nav-link {
    color: #333;
    text-decoration: none;
    font-size: 1.2rem;
    margin-inline: 2rem;
    border-radius: 4px;
    padding: .2rem;
    transition:.2s ease;
}
.nav-link:hover {
}
.nav-link.exact-active {
    font-weight: bold;
    color: #0056b3;
}
</style>
