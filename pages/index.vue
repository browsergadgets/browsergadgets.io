<template>
    <div class="flex flex-col items-center justify-start min-h-screen">


        <header>

            <h1 class="colored-heading"><span class="color-yellow">Browser </span>
                <span class="color-green">Extensions </span><span class="color-purple">Are </span><span
                      class="color-red">Fun!</span>
            </h1>


            <span class="">Welcome to the World of Browser Extensions. You can learn & build amazing extensions, talk
                with other extension developers and users in the community and play with exciting stuff.</span>
        </header>


    </div>
    <div class="flex flex-col items-center justify-center min-h-screen">


        <!-- <h1 class="text-center text-5xl font-bold">What exactly do we do</h1> -->

    </div>





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
</template>



<script setup>


</script>


<style>
header {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    margin-top: 10rem;
}

header h1.colored-heading span {
    /* color: rgb(44, 44, 44); */
    text-shadow: .1rem .1rem .2rem rgb(0, 0, 0);
    font-weight: 900;
    font-size: 7rem;
}

header span:not(h1 span) {
    color: rgb(44, 44, 44);
    opacity: .9;
    font-size: 1.5rem;
    font-weight: 700;
    width: 70%;
    margin-top: 1.5rem;
    text-align: center;
}

.colored-heading span {}

.color-red {
    color: var(--red);
    transform: rotate(-5deg);
}

.color-purple {
    color: var(--purple);
    transform: rotate(3deg);
}

.color-green {
    color: var(--green);
    transform: rotate(-4deg);
}

.color-yellow {
    color: var(--yellow);
    transform: rotate(2deg);
}


/* Base styles for all blobs */
.backgroundStuff {
    position: absolute;
    z-index: -1;
    max-width: 30rem;
    pointer-events: none;
    opacity: 0.8;
    --animationDuration: calc(20s + 10s * var(--random-factor, 1));
    /* Random duration */
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
        transform: translate(4rem, -2rem) rotate(45deg) scale(1.1);
    }

    50% {
        transform: translate(-3rem, 3rem) rotate(-90deg) scale(0.9);
    }

    75% {
        transform: translate(2rem, -4rem) rotate(135deg) scale(1.2);
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
        transform: translate(-5rem, 2rem) rotate(-30deg) scale(1.2);
    }

    40% {
        transform: translate(3rem, -4rem) rotate(60deg) scale(0.8);
    }

    60% {
        transform: translate(-2rem, 3rem) rotate(-120deg) scale(1.1);
    }

    80% {
        transform: translate(4rem, -3rem) rotate(180deg) scale(0.9);
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
        transform: translate(2rem, 4rem) rotate(120deg) scale(1.2);
    }

    60% {
        transform: translate(-4rem, -2rem) rotate(-45deg) scale(0.9);
    }

    90% {
        transform: translate(3rem, 5rem) rotate(90deg) scale(1.3);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

.backgroundStuff.purpleBlob {
    top: 0rem;
    right: -2rem;
    max-width: 50rem;
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
        transform: translate(-4rem, 3rem) rotate(30deg) scale(1.1);
    }

    30% {
        transform: translate(5rem, -5rem) rotate(-90deg) scale(1.2);
    }

    45% {
        transform: translate(-3rem, 2rem) rotate(45deg) scale(0.8);
    }

    60% {
        transform: translate(2rem, -4rem) rotate(-180deg) scale(1);
    }

    75% {
        transform: translate(-5rem, 5rem) rotate(120deg) scale(1.3);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

.backgroundStuff.yellowBlob {
    top: 50rem;
    right: -5rem;
    max-width: 50rem;
    --random-factor: 1.8;
    animation-name: shapeChangeYellow;
    animation-duration: var(--animationDuration);
}
</style>