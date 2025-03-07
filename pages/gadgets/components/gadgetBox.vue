<template>
    <div class="gadgetBox max-w-[30rem] max-h-fit overflow-clip"
         :data-gadgetName="gadgetName">


        <Teleport to="body"
                  :disabled="!expandedViewEnabled">
            <div class="imagesScroller-wrapper flex flex-row items-center justify-center gap-2 relative"
                 :class="{
                    'expandedView': expandedViewEnabled
                }">
                <button class="prevImageButton absolute left-0 text-white shadow-none w-fit h-fit"
                        ref="prevImageButtonRef"
                        @click="prevImage">
                    <Icon icon="material-symbols:chevron-left-rounded"
                          width="30"
                          height="30" />
                </button>
                <div class="showImages-wrapper flex flex-row items-center justify-center overflow-x-auto ">

                    <div v-for="index in totalShowImageCount"
                         :key="index"
                         class="flex flex-row items-center justify-center ">
                        <div v-show="index === currentShowImageIndex"
                             class="showImage-wrapper flex flex-row items-center justify-center cursor-pointer rounded-lg"
                             @click="showExpandedView"
                             v-on-click-outside="onClickOutsideExpandedViewHandler">
                            <img :src="getShowImageImageURL(index)"
                                 alt=""
                                 class="">
                        </div>
                    </div>



                </div>

                <button class="nextImageButton absolute right-0 text-white shadow-none w-fit h-fit"
                        ref="nextImageButtonRef"
                        @click="nextImage">
                    <Icon icon="material-symbols:chevron-right-rounded"
                          width="30"
                          height="30" />
                </button>
            </div>
        </Teleport>

        <div class="gadgetBoxDetails_header flex flex-row  items-center cursor-pointer"
             @click="goToGadgetPage">


            <img :src="gadgetLogoURL"
                 alt=""
                 class="w-10 justify-self-start">
            <h2 class="w-full ml-2">{{ gadgetData.name }}</h2>

            <div class="metaData-wrapper flex flex-row gap-2 items-center justify-center flex-1 w-full">

                <span class="metaDataSpan userCountSpan  select-none"
                      title="Total Users Across Stores">
                    <Icon icon="flowbite:users-solid" />{{ gadgetData.userCount }}
                </span>
                <span class="metaDataSpan avgRatingSpan  select-none"
                      title="Average Rating Across Stores">
                    <Icon icon="solar:stars-bold" />{{ gadgetData.avgRating }}
                </span>
            </div>
        </div>

        <div class="gadgetBoxDetails_secondaryHeader cursor-pointer"
             @click="goToGadgetPage">

            <span class="taglineSpan text-md opacity-60 my-4">{{ gadgetData.tagline }}</span>


            <div class="supportedBrowsers-wrapper flex flex-row items-center justify-start my-2 py-1">
                <span class="text-sm opacity-55 mr-2 select-none">Available On </span>
                <Icon :icon="`logos:${browserName}`"
                      class="mx-2"
                      v-for="browserName in gadgetData.supportedBrowsers"
                      :title="browserName" />
            </div>
        </div>

        <div class="description-wrapper">

            <p class="descriptionText p-2 mb-2">{{ expandedDescription ? gadgetData.description :
                gadgetData.description.slice(0, 200) + '...' }} <button style="text-shadow: none;"
                        class="readMoreButton bg-transparent p-0 shadow-none text-black hover:bg-transparent px-1 font-bold cursor-pointer select-none"
                        tabIndex="0"
                        @click="() => { expandedDescription = !expandedDescription }">Read More</button></p>
        </div>



    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, useTemplateRef } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

import { vOnClickOutside } from '@vueuse/components'
import { onClickOutside } from '@vueuse/core'


const router = useRouter()

const props = defineProps({
    gadgetName: String,
    gadgetData: Object
});
const goToGadgetPage = () => {
    router.push(`/gadgets/${props.gadgetName}`);
};

const expandedDescription = ref(false)


const prevImageButtonRef = useTemplateRef<HTMLElement>('prevImageButtonRef')
const nextImageButtonRef = useTemplateRef<HTMLElement>('nextImageButtonRef')
const onClickOutsideExpandedViewHandler = [
    (ev) => {
        closeExpandedView()
    },
    { ignore: [prevImageButtonRef, nextImageButtonRef] },
]

const totalShowImageCount = ref(null)
const expandedViewEnabled = ref(false)
const currentShowImageIndex = ref(1)
const currenShowImageURLFormat = computed(() => {
    return getShowImageImageURL(currentShowImageIndex)
})
const getShowImageImageURL = (index) => {
    return '_nuxt/assets/images/gadgets/' + props.gadgetName + '/showImage_' + index + '.png'
}
const gadgetLogoURL = ref('_nuxt/assets/images/gadgets/' + props.gadgetName + '/logo.png')

const keyPressHandler = (e: KeyboardEvent) => {
    if (expandedViewEnabled.value) {
        if (e.key == 'Escape') {
            closeExpandedView()
        }
        if (['ArrowRight', 'ArrowLeft'].includes(e.key)) {
            switch (e.key) {
                case 'ArrowLeft':
                    prevImage()
                    break;
                case 'ArrowRight':
                    nextImage()

                    break;

                default:
                    break;
            }
        }
    }
}


onMounted(() => {
    // console.log("import.meta.url", import.meta.url);
    currentShowImageIndex.value = 1
    totalShowImageCount.value = props.gadgetData.showImageCount

    document.addEventListener('keydown', keyPressHandler)
})
onUnmounted(() => {
    document.removeEventListener('keydown', keyPressHandler)
})

const showExpandedView = () => {
    expandedViewEnabled.value = true

}
const closeExpandedView = () => {
    expandedViewEnabled.value = false
}

const prevImage = () => {
    if (currentShowImageIndex.value > 1) {
        currentShowImageIndex.value--
    }
    else {
        currentShowImageIndex.value = totalShowImageCount.value
    }
};

const nextImage = () => {
    if (currentShowImageIndex.value < totalShowImageCount.value) {
        currentShowImageIndex.value++
    } else {
        currentShowImageIndex.value = 1

    }
};
</script>

<style scoped>
.gadgetBox {
    border-radius: 2rem;
    /* padding: .2rem .2rem; */
    box-shadow: .2rem .3rem .8rem rgba(55, 55, 55, 0.226);
    background-color: rgb(250, 250, 250);

    background-color: transparent;
    backdrop-filter: blur(20px);
    background: linear-gradient(20deg, rgba(239, 237, 237, 0.65), rgba(244, 244, 244, 0.455));
    transition: transform .2s ease;
}

.gadgetBox:hover {
    transition: transform .2s ease;
    /* transform: scale(1.02); */
}

.imagesScroller-wrapper {
    margin-bottom: 1rem;
}

.imagesScroller-wrapper button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.227);
    border-radius: 100%;
    padding: .5rem;
}

.imagesScroller-wrapper button:hover {
    /* background-color: rgba(208, 208, 208, 0.716); */
}

.showImage-wrapper img {
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
}



.gadgetBox>div:not(:first-child) {
    padding: .1rem 1rem;
}

.description-wrapper p {
    border-radius: 1rem;
    background-color: rgb(235, 235, 235);
}

.metaDataSpan {
    font-size: .8rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: .2rem;
    border: .1rem grey solid;
    border-radius: .5rem;
    padding: .2rem .4rem;
    color: white;
    height: fit-content;
    width: fit-content;
}

.avgRatingSpan {
    background-color: rgb(255, 154, 53);
    border-color: var(--yellow-darker);

}

.userCountSpan {
    background-color: rgb(228, 108, 241);
    border-color: var(--purple-dark);

}



/* Image Scroller and Expanded View Styles */
.expandedView.imagesScroller-wrapper {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 999;
    backdrop-filter: blur(10px) brightness(0.5);
    transition: .5s ease;
}

.expandedView.imagesScroller-wrapper button {
    background-color: rgb(243, 243, 243);
    color: black;
}

.expandedView.imagesScroller-wrapper button:hover {
    background-color: rgba(243, 243, 243, 0.716);
}

.expandedView.imagesScroller-wrapper {
    width: 100%;
}

.expandedView .showImage-wrapper {
    width: 80%;
    border-radius: 1rem;
    height: 100%;
    z-index: 1000;
    padding: 1rem;
}

.expandedView .showImage-wrapper img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    box-shadow: .2rem .2rem 1rem rgba(0, 0, 0, 0.515);
}
</style>
