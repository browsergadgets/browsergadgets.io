<template>
    <div class="flex flex-col min-h-screen">
        <DesktopNav />
        <slot></slot>


        <svg class="backgroundStuff redBlob"
             viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg">
            <path fill="#FF5757"
                  d="M48.2,-14.8C55.7,7.4,50.3,34.7,30.7,51C11,67.4,-22.9,72.9,-42.4,58.6C-61.9,44.4,-66.9,10.5,-57.4,-14.4C-48,-39.3,-24,-55.3,-1.8,-54.7C20.3,-54.1,40.7,-37,48.2,-14.8Z"
                  transform="translate(100 100)" />
        </svg>

        <svg class="backgroundStuff purpleBlob"
             viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg">
            <path fill="#CB6CE6"
                  d="M36.4,21.5C22.2,45.5,-31.3,47.2,-43.9,24.1C-56.5,1.1,-28.3,-46.8,-1.5,-47.7C25.2,-48.6,50.5,-2.4,36.4,21.5Z"
                  transform="translate(100 100)" />
        </svg>

        <svg class="backgroundStuff greenBlob"
             viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg">
            <path fill="#00BF63"
                  d="M47.9,-16.9C54.6,5,47.3,30,28.3,45.4C9.3,60.7,-21.5,66.3,-38.7,53.6C-56,41,-59.8,10.2,-51.1,-14.5C-42.4,-39.2,-21.2,-57.7,-0.3,-57.6C20.6,-57.5,41.3,-38.8,47.9,-16.9Z"
                  transform="translate(100 100)" />
        </svg>

        <svg class="backgroundStuff yellowBlob"
             viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFBD59"
                  d="M49.2,-27.9C62.1,-6,69.8,19.4,60.7,36.1C51.7,52.9,25.8,61.1,1.6,60.3C-22.7,59.4,-45.4,49.4,-55.7,31.9C-66,14.4,-63.8,-10.6,-52.4,-31.5C-41,-52.5,-20.5,-69.5,-1.2,-68.8C18.1,-68.1,36.3,-49.7,49.2,-27.9Z"
                  transform="translate(100 100)" />
        </svg>

        <Footer></Footer>

    </div>
</template>

<script setup>
import DesktopNav from '~/components/nav/desktopNav.vue';
import Footer from '~/components/footer.vue';

import { useRoute } from 'vue-router';

const route = useRoute();

// const bgColorOfPages = {
//     "/":'var(--yellow-lightest)',
//     "/learn/":'var(--green-lightest)',
//     "/blog/":'var(--purple-lighter)',
//     "/ecosystem/":'var(--red-lightest)',
//     "/community/":'var(--yellow-lighter)',

// }

// onMounted(()=>{
//     document.body.style.backgroundColor = bgColorOfPages?.[route.path];

//     watch(route, newRoute=>{
//         document.body.style.backgroundColor = bgColorOfPages?.[newRoute.path];
//     })


// })
</script>

<style>
body{
    background-color: var(--yellow-lightest);
}

/* Base styles for all blobs */
.backgroundStuff {
    position: absolute;
    z-index: -1;
    max-width: 30rem;
    pointer-events: none;
    opacity: 0.8;
    --animationDuration: calc(20s + 10s * var(--random-factor, 1));
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
}

/* Unique animations for each blob */

/* Red Blob */
@keyframes shapeChangeRed {
    0% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(0.5rem, -0.5rem) rotate(5deg) scale(1.02);
    }

    50% {
        transform: translate(-0.5rem, 0.5rem) rotate(-5deg) scale(0.98);
    }

    75% {
        transform: translate(0.5rem, -0.5rem) rotate(5deg) scale(1.02);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

.backgroundStuff.redBlob {
    top: 0rem;
    left: -1rem;
    --random-factor: 1;
    animation-name: shapeChangeRed;
    animation-duration: var(--animationDuration);
}

/* Green Blob */
@keyframes shapeChangeGreen {
    0% {
        transform: translate(0, 0) scale(1);
    }

    20% {
        transform: translate(-0.5rem, 0.5rem) rotate(-5deg) scale(1.02);
    }

    40% {
        transform: translate(0.5rem, -0.5rem) rotate(5deg) scale(0.98);
    }

    60% {
        transform: translate(-0.5rem, 0.5rem) rotate(-5deg) scale(1.02);
    }

    80% {
        transform: translate(0.5rem, -0.5rem) rotate(5deg) scale(0.98);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

.backgroundStuff.greenBlob {
    top: 90vh;
    left: 0rem;
    --random-factor: 1.3;
    animation-name: shapeChangeGreen;
    animation-duration: var(--animationDuration);
}

/* Purple Blob */
@keyframes shapeChangePurple {
    0% {
        transform: translate(0, 0) scale(1);
    }

    30% {
        transform: translate(0.5rem, 0.5rem) rotate(5deg) scale(1.02);
    }

    60% {
        transform: translate(-0.5rem, -0.5rem) rotate(-5deg) scale(0.98);
    }

    90% {
        transform: translate(0.5rem, 0.5rem) rotate(5deg) scale(1.02);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

.backgroundStuff.purpleBlob {
    top: -35rem;
    right: -25rem;
    max-width: 70rem;
    --random-factor: 1.5;
    animation-name: shapeChangePurple;
    animation-duration: var(--animationDuration);
}

/* Yellow Blob */
@keyframes shapeChangeYellow {
    0% {
        transform: translate(0, 0) scale(1);
    }

    15% {
        transform: translate(-0.5rem, 0.5rem) rotate(5deg) scale(1.02);
    }

    30% {
        transform: translate(0.5rem, -0.5rem) rotate(-5deg) scale(0.98);
    }

    45% {
        transform: translate(-0.5rem, 0.5rem) rotate(5deg) scale(1.02);
    }

    60% {
        transform: translate(0.5rem, -0.5rem) rotate(-5deg) scale(0.98);
    }

    75% {
        transform: translate(-0.5rem, 0.5rem) rotate(5deg) scale(1.02);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

.backgroundStuff.yellowBlob {
    top: 15rem;
    right: -5rem;
    max-width: 50rem;
    --random-factor: 1.8;
    animation-name: shapeChangeYellow;
    animation-duration: var(--animationDuration);
}

</style>