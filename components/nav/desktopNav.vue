    <template>
        <nav class="flex p-4 my-4 items-center justify-between">


            <div class="flex items-center justify-center"
                 @mouseenter="logoImageHovered"
                 @mouseleave="logoImageLeft">
                <NuxtLink to="/"
                          class="navLogoLink">
                    <img src="../../assets/images/logo-transparent.png"
                         class="navLogo"
                         ref="logoImage"
                         alt="">
                </NuxtLink>
            </div>

            <div class="navLinks">
                <NuxtLink to="/login"
                          exact-active-class="active-link"
                          class="nav-link"
                          style="color: var(--white); background-color: var(--green); box-shadow: .1rem .1rem rgb(0, 0, 0);">
                    <Icon icon="mdi:login"
                          width="24"
                          height="24"
                          class="mr-2" />
                    <span>Signup</span>
                </NuxtLink>
                <NuxtLink to="/gadgets"
                          exact-active-class="active-link"
                          class="nav-link exploreGadgets-link"
                          style="">
                    <Icon icon="mdi:explore"
                          width="24"
                          height="24"
                          class="mr-2" />
                    <span>Explore Gadgets</span>
                </NuxtLink>
            </div>
        </nav>
    </template>

<script setup>
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';


</script>

<style scoped>
.navLogo {
    width: 100%;
    max-width: 4rem;
    z-index: -2;
    pointer-events: none;
    /* mix-blend-mode: multiply; */
}

.navLogoLink {
    /* mix-blend-mode: multiply; */
    margin-left: 1rem;
    transition: .3s ease;
}

.navLogoLink:active {
    transform: scale(0.9);
}

.navLinks {
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
    transition: transform .2s ease, border-color .1s ease;
    letter-spacing: .1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid transparent;
}

.nav-link:hover {
    border: .1rem solid var(--white);
}

.exploreGadgets-link {
    color: var(--white);
    background: linear-gradient(120deg, var(--purple-light), var(--red-light), var(--yellow-light), var(--green-light));
    box-shadow: .1rem .1rem rgb(0, 0, 0);
    transition: background 0.5s ease, border 0.5s ease, transform 0.2s ease, border-color 0.1s ease;
    background-size: 200% 200%;
    animation: gradientAnimation 5s ease infinite;
    animation-play-state: paused;

}

.exploreGadgets-link:hover {
    animation-play-state: running;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.nav-link:active {
    transform: scale(0.9);
}

/* .active-link {
        /* font-weight: 800; */
/* color: #00b351; */
/*}  */
</style>
