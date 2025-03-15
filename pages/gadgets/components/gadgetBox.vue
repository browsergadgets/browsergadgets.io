<template>
    <div class="gadgetBox max-w-[25rem] max-h-fit overflow-clip hover:scale-105 duration-200"
         :data-gadgetName="gadgetName">

        <Carousel class="relative w-full px-0 mb-2"
                  @init-api="setApi">
            <CarouselContent>
                <CarouselItem v-for="index in totalShowImageCount"
                              class=""
                              :key="index">
                    <div class="p-0 w-full">
                        <img :src="getShowImageImageURL(index)"
                             @click="() => { currentShowImageIndex = index; showExpandedView() }"
                             alt=""
                             class="rounded-lg w-full">
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious class="-left-0" />
            <CarouselNext class="-right-0" />
        </Carousel>


        <NuxtLink :to="'/gadgets/' + props.gadgetName">
            <div class="gadgetBoxDetails_header flex flex-row px-5 items-center cursor-pointer">


                <img :src="gadgetLogoURL"
                     alt=""
                     class="w-10 justify-self-start">

                <div class="w-full flex-1 ml-2">

                    <h2 class="w-full font-extrabold text-xl">{{ gadgetData.name }}</h2>

                </div>
                <div class="metaData-wrapper flex flex-row gap-2 items-center justify-center w-fit">

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger :reference="(userCountRef as Element)"></TooltipTrigger>
                            <TooltipContent>
                                <p>Add to library</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <span class="metaDataSpan userCountSpan  select-none"
                          title="Total Users Across Stores"
                          ref="userCountRef">
                        <Icon icon="flowbite:users-solid" />{{ gadgetData.userCount }}
                    </span>
                    <span class="metaDataSpan avgRatingSpan  select-none"
                          title="Average Rating Across Stores">
                        <Icon icon="solar:stars-bold" />{{ gadgetData.avgRating }}
                    </span>
                </div>
            </div>
        </NuxtLink>

        <div class="gadgetBoxDetails_secondaryHeader cursor-pointer my-2"
             @click="goToGadgetPage">

            <span class="taglineSpan w-full text-md opacity-60">{{ gadgetData.tagline }}</span>

            <div class="supportedBrowsers-wrapper flex flex-row items-center justify-start py-1 mt-1">
                <span class="text-sm opacity-55 mr-2 select-none">Available On </span>
                <Icon :icon="`logos:${browserName}`"
                      class="mx-2"
                      v-for="browserName in gadgetData.supportedBrowsers"
                      :title="browserName" />
            </div>
        </div>

        <div class="description-wrapper">

            <p class="descriptionText p-2 mb-2">{{ expandedDescription ? gadgetData.shortDescription :
                gadgetData.shortDescription.slice(0, 200) + '...' }} <button style="text-shadow: none;"
                        v-show="gadgetData.shortDescription.length > 200"
                        class="readMoreButton bg-transparent p-0 shadow-none text-black hover:bg-transparent px-1 font-bold cursor-pointer select-none"
                        tabIndex="0"
                        @click="() => { expandedDescription = !expandedDescription }">
                    {{ expandedDescription ?
                        'Read Less' :
                        'Read More' }}
                </button></p>
        </div>



    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, useTemplateRef } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'

import { vOnClickOutside } from '@vueuse/components'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { watchOnce } from '@vueuse/core'
import type { CarouselApi } from '@/components/ui/carousel'

const api = ref<CarouselApi>()
const totalCount = ref(0)
const current = ref(0)

function setApi(val: CarouselApi) {
    api.value = val
}

watchOnce(api, (api) => {
    if (!api)
        return


    totalCount.value = api.scrollSnapList().length
    current.value = api.selectedScrollSnap() + 1

    api.on('select', () => {
        current.value = api.selectedScrollSnap() + 1
    })
})

const router = useRouter()

const props = defineProps({
    gadgetName: String,
    gadgetData: Object
});
const goToGadgetPage = () => {
    router.push(`/gadgets/${props.gadgetName}`);
};

const expandedDescription = ref(false)

const onClickOutsideExpandedViewHandler = [
    (ev) => {
        closeExpandedView()
    },
    { ignore: [] },
]

const totalShowImageCount = ref(null)
const expandedViewEnabled = ref(false)
const currentShowImageIndex = ref(1)

function useAsset(path: string): string {
    const assets = import.meta.glob('~/assets/images/**/*', {
        eager: true,
        import: 'default',
    })
    // @ts-expect-error: wrong type info
    return assets['/assets/' + path]
}

const getShowImageImageURL = (index) => {
    // return '_nuxt/assets/images/gadgets/' + props.gadgetName + '/showImage_' + index + '.png'
    return useAsset(`images/gadgets/${props.gadgetName}/showImage_${index}` + '.png')
}
const gadgetLogoURL = useAsset(`images/gadgets/${props.gadgetName}/logo` + '.png')

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

const userCountRef = useTemplateRef<Element>('userCountRef')

onMounted(() => {
    // console.log("import.meta.url", import.meta.url);
    currentShowImageIndex.value = 1
    totalShowImageCount.value = props.gadgetData.showImageCount
})

const showExpandedView = () => {
    expandedViewEnabled.value = true

}
const closeExpandedView = () => {
    expandedViewEnabled.value = false
}

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
