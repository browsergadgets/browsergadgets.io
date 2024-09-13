<template>
    <div class="flex flex-col items-center justify-center min-h-screen">


        <h1 class="text-center text-6xl font-extrabold">Browser Gadgets</h1>
        
    </div>
    <div class="flex flex-col items-center justify-center min-h-screen">


        <h1 class="text-center text-5xl font-bold">What exactly do we do</h1>
        
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
.backgroundStuff {
    position: absolute;
    z-index: -2;
    max-width: 30rem;

    --animationDuration:4s;
}
@keyframes shapeChange {
    0% {
        transform: translate(0) scale(1);
    }
    
    50% {
        transform: translate(1rem, 1rem) scale(1.05);
    }

    100% {
        transform: translate(0) scale(1);
    }
}
.redBlob {
    top: -5rem;
    left: -15rem;
    animation: shapeChange var(--animationDuration) infinite ease-in-out;
}

.greenBlob {
    top: 25rem;
    left: -15rem;
    animation: shapeChange var(--animationDuration) infinite ease-in-out;
}

.purpleBlob {
    top: 0rem;
    right: -25rem;
    max-width: 50rem;
    animation: shapeChange var(--animationDuration) infinite ease-in-out;
}
.yellowBlob {
    top: 50rem;
    right: -25rem;
    max-width: 50rem;
    animation: shapeChange var(--animationDuration) infinite ease-in-out;
}


</style>