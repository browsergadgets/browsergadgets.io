<template>
    <div>

        <div class="flex flex-col items-center justify-start min-h-screen">


            <header>

                <h1 class="colored-heading font-[MoreSugar] text-8xl mb-4">Browser Gadgets
                </h1>

                <h2 class="subHeading">
                    <span>Find</span>
                    <span>Lovely</span>
                    <span>Browser</span>
                    <span>Extensions</span>
                </h2>
            </header>


            <a href="/gadgets//mywebshortcuts"><img src="../assets/images/gadgetsCharacters/mywebshortcuts-globe.png"
                     alt="logo"
                     class="gadgetCharacters"
                     data-speed="0.3"
                     style="left: 5%; bottom: 20%; rotate: -15deg;"></a>
            <a href="/gadgets/mywebshortcuts"><img src="../assets/images/gadgetsCharacters/mywebshortcuts-keyboard.png"
                     alt="logo"
                     class="gadgetCharacters"
                     data-speed="0.5"

                     style="left: 15%; bottom: 20%; rotate: 10deg;"></a>


            <a href="/grandplan"><img src="../assets/images/gadgetsCharacters/broba.png"
                     alt="logo"
                     class="gadgetCharacters"
                     title="Yet to be launched"
                     data-speed="0.2"
                     style="left: 65%; bottom: 0%; rotate: -8deg; filter: blur(10px)"></a>




            <a href="/grandplan"><img src="../assets/images/gadgetsCharacters/kavach-bigBrother.png"
                     alt="logo"
                     class="gadgetCharacters"
                     title="Yet to be launched"
                     data-speed="0.4"
                     style="right: 0%; bottom: 25%; rotate: 12deg; filter: blur(10px)"></a>



            <a href="/grandplan"><img src="../assets/images/gadgetsCharacters/kavach-littleSister.png"
                     alt="logo"
                     class="gadgetCharacters"
                     title="Yet to be launched"
                     data-speed="0.6"
                     style="right: 0%; bottom: 5%; rotate: -20deg; filter: blur(10px)"></a>






        </div>
        <div class="flex flex-col items-center min-h-screen mt-10">


            <h2 class="subHeading"><span>An</span> <span>Ecosystem</span></h2>

            <p class="text-center text-2xl max-w-2xl font-[MoreSugar] font-thin text-[#000000] p-4"
               style="line-height: 1.5;">
                <span class="underline">Browser Gadgets is an ecosystem of browser extensions</span> and web apps that
                helps you get the
                most out of your browser. From <span class="highlightedYellow">productivity</span> to <span
                      class="highlightedPurple">customization</span>, we have all kinds of extensions to make your web
                experience more enjoyable.
                <br>
                You won't find this blend of <span class="highlightedGreen">creativity</span> and <span
                      class="highlightedRed">functionality</span> anywhere else.
            </p>


        </div>



    </div>

</template>



<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const characters = document.querySelectorAll('.gadgetCharacters');

    characters.forEach((char, index) => {
        char.style.setProperty('--character-index', index);
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Handle characters parallax
        characters.forEach(char => {
            const speed = char.dataset.speed;
            const yPos = -(scrolled * speed);
            
            if (char.matches(':hover')) {
                char.style.transform = `translateY(${yPos}px) scale(1.2) rotate(10deg)`;
            } else {
                char.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    characters.forEach(char => {
        char.addEventListener('mouseenter', () => {
            const scrolled = window.scrollY;
            const speed = char.dataset.speed;
            const yPos = -(scrolled * speed);
            char.style.transform = `translateY(${yPos}px) scale(1.05) rotate(2deg)`;
        });

        char.addEventListener('mouseleave', () => {
            const scrolled = window.scrollY;
            const speed = char.dataset.speed;
            const yPos = -(scrolled * speed);
            char.style.transform = `translateY(${yPos}px)`;
        });
    });
});
</script>


<style>
header {
    width: 80%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 5rem;
}

header h1.colored-heading, .subHeading {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    will-change: transform, opacity;
}

header h1.colored-heading {
    color: #7ed957;
    text-shadow: 0.25rem 0.25rem 0 hsla(0, 0%, 0%, 0.8);
    /* text-shadow: 
       -0.25rem -0.25rem 0 hsla(0, 0%, 0%, 0.8),  
        0.25rem -0.25rem 0 hsla(0, 0%, 0%, 0.8),
        -0.25rem 0.25rem 0 hsla(0, 0%, 0%, 0.8),
        0.25rem 0.25rem 0 hsla(0, 0%, 0%, 0.8); */
    letter-spacing: 0.25rem;
    /* font-weight: 900; */
    /* font-size: 4rem; */
}
.subHeading {
    font-size: 3rem;
    font-family: 'MoreSugar';
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.subHeading span {
    text-shadow: .1rem .1rem rgba(0, 0, 0, 0.905);
}

.subHeading span:nth-child(1n) {
    color: var(--red);
}

.subHeading span:nth-child(2n) {
    color: var(--green);
}

.subHeading span:nth-child(3n) {
    color: var(--purple);
}

.subHeading span:nth-child(4n) {
    color: var(--yellow);
}

.highlightedGreen {
    color: var(--white);
    background-color: var(--green);
    padding: 0.1rem 0.1rem;
}
.highlightedRed {
    color: var(--white);
    background-color: var(--red);
    padding: 0.1rem 0.1rem;
}
.highlightedPurple {
    color: var(--white);
    background-color: var(--purple);
    padding: 0.1rem 0.1rem;
}   
.highlightedYellow {
    color: var(--white);
    background-color: var(--yellow);
    padding: 0.1rem 0.1rem;
}


/* Browser Gadgets Characters */
.gadgetCharacters {
    width: 15rem;
    position: absolute;
    transition: transform 0.2s ease-out;
    cursor: pointer;
}

.gadgetCharacters:hover {
    transition: transform 0.3s ease;
}

/* @keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
} */

</style>