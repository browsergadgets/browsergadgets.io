<template>
  <section class=""
           v-if="gadgetData">


    <!--
    Logo and Name | Install button for correct browser
    Images and an Intro video
    Description
    -->

    <main
          class="flex flex-col justify-center items-center w-full text-[#272727] p-5 bg-[#f3f3f379] backdrop-blur-lg h-full rounded-2xl shadow-xl">

      <!-- <Teleport to="body"
                :disabled="!expandedViewEnabled">
        <div class="imagesScroller-wrapper w-full flex flex-row items-center justify-center gap-2 relative"
             :class="{
              'expandedView': expandedViewEnabled
            }">
          <div class="showImages-wrapper flex flex-row items-center justify-center">
            <button class="prevImageButton text-white shadow-none w-fit h-fit"
                    ref="prevImageButtonRef"
                    @click="prevImage">
              <Icon icon="material-symbols:chevron-left-rounded"
                    width="30"
                    height="30" />
            </button>

            <div v-for="index in totalShowImageCount"
                 :key="index"
                 class="flex flex-row items-center justify-center ">
              <div v-show="index === currentShowImageIndex"
                   class="showImage-wrapper flex flex-row items-center justify-evenly cursor-pointer rounded-lg gap-5"
                   v-on-click-outside="onClickOutsideExpandedViewHandler">
                <img :src="getShowImageImageURL(index)"
                     @click="() => { currentShowImageIndex = index; showExpandedView() }"
                     alt=""
                     class="">
                <img :src="getShowImageImageURL(index == totalShowImageCount ? 1 : index + 1)"
                     v-if="!expandedViewEnabled"
                     @click="() => { currentShowImageIndex = (index == totalShowImageCount ? 1 : index + 1); showExpandedView() }"
                     alt=""
                     class="">
              </div>
            </div>


            <button class="nextImageButton text-white shadow-none w-fit h-fit"
                    ref="nextImageButtonRef"
                    @click="nextImage">
              <Icon icon="material-symbols:chevron-right-rounded"
                    width="30"
                    height="30" />
            </button>

          </div>

        </div>
      </Teleport> -->

      <Carousel class="relative w-full px-0"
                @init-api="setApi">
        <CarouselContent>
          <CarouselItem v-for="index in totalShowImageCount"
                        class="md:basis-1/2 lg:basis-1/3"
                        :key="index">
            <div class="p-1">
              <img :src="getShowImageImageURL(index)"
                   @click="() => { currentShowImageIndex = index; showExpandedView() }"
                   alt=""
                   class="rounded-2xl">
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="-left-0" />
        <CarouselNext class="-right-0" />
      </Carousel>

      <div class="firstPartDiv w-full flex justify-between items-start px-40 my-5 mt-10">

        <div class="flex justify-center items-center gap-8">

          <div class="max-w-28">

            <img :src="gadgetLogoURL"
                 :alt="gadgetData.name + ' Logo'"
                 class="w-full">
          </div>
          <div class="logoAndNameWrapper flex flex-col">
            <h1>{{ gadgetData.name }}</h1>
            <p class="text-xl opacity-70">{{ gadgetData.tagline }}</p>
          </div>
        </div>
        <button class="button installButton"
                @click="installExtension"
                ref="installButtonRef"
                v-if="gadgetData.supportedBrowsers"
                :disabled="!gadgetData.supportedBrowsers.includes(detectBrowser())">
          <Icon :icon="detectBrowser() ? 'logos:' + detectBrowser() : 'material-symbols:install-desktop-rounded'">
          </Icon>
          <span>{{ gadgetData.supportedBrowsers.includes(detectBrowser()) ? 'Install' : 'Unavailable' }}</span>
        </button>
      </div>

      <div class="secondPartDiv mt-5 flex flex-col items-center px-40">

        <p class="descriptionText p-2 my-5"
           v-html="formattedDescription"></p>


      </div>

      <div class="flex justify-center items-center gap-2 my-20">
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
      </div>

      <div class="pricingSection">
        <div class="pricingSection_header">
          <h1 id="pricing">Pricing</h1>
        </div>
        <div class="pricingPlans-wrapper">

          <div v-for="(planData, index) in gadgetData.plans"
               class="flex flex-col justify-center items-center">

            <div class="plan-wrapper"
                 :style="{
                  'background-color': gadgetData ? gadgetData.theme.primaryColor.dark : 'white'
                }">
              <h2>{{ planData.name }}</h2>
              <p>{{ planData.tagline }}</p>
              <h3>{{ planData.price }}</h3>
              <ul>
                <li v-for="(featureText, index) in planData.features">{{ featureText }}</li>
              </ul>
              <button class="button buyButton"
                      @click="() => { getButtonClicked(planData.code, planData.dodoProductId) }"
                      :style="{
                        'background-color': false ? gadgetData.theme.secondaryColor.medium : ''
                      }">Get</button>
            </div>

          </div>
        </div>

      </div>

      <div class="flex justify-center items-center gap-2 my-20">
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
        <span class="w-2 h-2 bg-black opacity-20 rounded-full"></span>
      </div>


      <div class="faqSection w-1/2 justify-center items-center">
        <h1 class="text-center">FAQs</h1>
        <Accordion type="single"
                   class="w-full mt-5"
                   collapsible
                   :unmountOnHide="false">
          <AccordionItem v-for="item in accordionItems"
                         :key="item.value"
                         :value="item.value"
                         class="">
            <AccordionTrigger class="accordionButton px-4 rounded-lg hover:bg-[#73737318]">{{ item.title }}
            </AccordionTrigger>
            <AccordionContent class="p-4 bg-[#ffffff84] rounded-lg">
              {{ item.content }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </main>

    <Dialog :open="billingDialogOpen"
            @update:open="() => { billingDialogOpen = !billingDialogOpen }">
      <!-- <DialogTrigger>
        Pay now
      </DialogTrigger> -->
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Billing Information</DialogTitle>
          <DialogDescription>
            Please fill in the details below before proceeding to payment.
          </DialogDescription>
        </DialogHeader>

        <form @submit="onSubmit"
              class="flex flex-col justify-center items-center w-full max-w-4xl mx-auto">

          <div class="flex flex-row gap-x-5 my-2 w-full">
            <FormField v-slot="{ componentField }"
                       name="firstName"
                       class="w-1/2">
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text"
                         placeholder="Tony"
                         v-bind="componentField"
                         class="w-full min-w-[12rem]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }"
                       name="lastName"
                       class="w-1/2">
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text"
                         placeholder="Shark"
                         v-bind="componentField"
                         class="w-full min-w-[12rem]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-row gap-x-5 my-2 w-full">
            <FormField v-slot="{ componentField }"
                       name="street"
                       class="w-1/2">
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input type="text"
                         placeholder="364 Kent St"
                         v-bind="componentField"
                         class="w-full min-w-[12rem]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }"
                       name="city"
                       class="w-1/2">
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text"
                         placeholder="Sydney"
                         v-bind="componentField"
                         class="w-full min-w-[12rem]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-row gap-x-5 my-2 w-full">
            <FormField v-slot="{ componentField }"
                       name="state"
                       class="w-1/2">
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input type="text"
                         placeholder="NSW"
                         v-bind="componentField"
                         class="w-full min-w-[12rem]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }"
                       name="country"
                       class="w-1/2">
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent class="">
                    <SelectGroup class="w-full min-w-[12rem]">
                      <SelectItem v-for="country in countries"
                                  :key="country.code"
                                  :value="country.code"
                                  class=" hover:bg-[#2f2f2f90]">
                        <span class="flex justify-center items-center gap-2">
                          <Icon :icon="country.icon" />
                          <span>{{ country.name }}</span>
                        </span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-row gap-x-5 my-2 w-full">
            <FormField v-slot="{ componentField }"
                       name="zipcode"
                       class="w-1/2">
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input type="text"
                         placeholder="2035"
                         v-bind="componentField"
                         class="w-full min-w-[12rem]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }"
                       name="discountCode"
                       class="w-1/2">
              <FormItem>
                <FormLabel>Discount Code</FormLabel>
                <FormControl>
                  <Input type="text"
                         placeholder="DISCOUNTCODE"
                         v-bind="componentField"
                         class="w-full min-w-[12rem]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <Button type="submit"
                  class="mt-4 w-full max-w-xs hover:bg-[#2f2f2f]">
            Submit
          </Button>
        </form>

      </DialogContent>
    </Dialog>
  </section>

  <div class="loader"
       v-if="!gadgetData">
    <Icon icon="line-md:loading-twotone-loop"></Icon>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, useTemplateRef } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { vOnClickOutside } from '@vueuse/components';
import { detectBrowser } from '#imports';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { CarouselApi } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { watchOnce } from '@vueuse/core'
import DodoPayments from 'dodopayments';
import { useToast } from '@/components/ui/toast/use-toast'

import { Input } from '@/components/ui/input'

import { useForm } from 'vee-validate'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const { toast } = useToast()
const toastOptions = {
  duration: 3000
}

const user = useSupabaseUser()
const client = useSupabaseClient()


const countrySchema = z.enum([
  "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ",
  "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR",
  "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC",
  "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO",
  "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA",
  "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT",
  "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP",
  "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI",
  "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX",
  "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI",
  "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN",
  "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS",
  "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS",
  "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK",
  "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "UM", "US", "UY", "UZ", "VU",
  "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"
]);

const formSchema = toTypedSchema(
  z.object({
    // billing: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    discountCode: z.string().min(1, "Last name is required").optional(),
    city: z.string().min(1, "City name is required"),
    country: countrySchema,
    state: z.string().min(1, "State name is required"),
    street: z.string().min(1, "Street address is required"),
    zipcode: z.string().min(1, "Postal code is required"),
  }),

  // customer: z.object({
  //   customer_id: z.string().min(1, "Customer ID is required"),
  // }),

  // discount_code: z.string().optional(),

  // metadata: z
  //   .object({
  //     supabase_user_id: z.string().optional(),
  //   })
  //   .optional(),

  // payment_link: z.boolean().optional().default(false),

  // return_url: z.string().url("Invalid URL format").optional(),
  // })
);

const countries = [
  { code: "AF", name: "Afghanistan", icon: "twemoji:flag-afghanistan" },
  { code: "AX", name: "Åland Islands", icon: "twemoji:flag-åland-islands" },
  { code: "AL", name: "Albania", icon: "twemoji:flag-albania" },
  { code: "DZ", name: "Algeria", icon: "twemoji:flag-algeria" },
  { code: "AS", name: "American Samoa", icon: "twemoji:flag-american-samoa" },
  { code: "AD", name: "Andorra", icon: "twemoji:flag-andorra" },
  { code: "AO", name: "Angola", icon: "twemoji:flag-angola" },
  { code: "AI", name: "Anguilla", icon: "twemoji:flag-anguilla" },
  { code: "AG", name: "Antigua and Barbuda", icon: "twemoji:flag-antigua-barbuda" },
  { code: "AR", name: "Argentina", icon: "twemoji:flag-argentina" },
  { code: "AM", name: "Armenia", icon: "twemoji:flag-armenia" },
  { code: "AU", name: "Australia", icon: "twemoji:flag-australia" },
  { code: "AT", name: "Austria", icon: "twemoji:flag-austria" },
  { code: "AZ", name: "Azerbaijan", icon: "twemoji:flag-azerbaijan" },
  { code: "BD", name: "Bangladesh", icon: "twemoji:flag-bangladesh" },
  { code: "BE", name: "Belgium", icon: "twemoji:flag-belgium" },
  { code: "BR", name: "Brazil", icon: "twemoji:flag-brazil" },
  { code: "CA", name: "Canada", icon: "twemoji:flag-canada" },
  { code: "CN", name: "China", icon: "twemoji:flag-china" },
  { code: "FR", name: "France", icon: "twemoji:flag-france" },
  { code: "DE", name: "Germany", icon: "twemoji:flag-germany" },
  { code: "IN", name: "India", icon: "twemoji:flag-india" },
  { code: "ID", name: "Indonesia", icon: "twemoji:flag-indonesia" },
  { code: "IT", name: "Italy", icon: "twemoji:flag-italy" },
  { code: "JP", name: "Japan", icon: "twemoji:flag-japan" },
  { code: "KR", name: "South Korea", icon: "twemoji:flag-south-korea" },
  { code: "MY", name: "Malaysia", icon: "twemoji:flag-malaysia" },
  { code: "MX", name: "Mexico", icon: "twemoji:flag-mexico" },
  { code: "NL", name: "Netherlands", icon: "twemoji:flag-netherlands" },
  { code: "NZ", name: "New Zealand", icon: "twemoji:flag-new-zealand" },
  { code: "NG", name: "Nigeria", icon: "twemoji:flag-nigeria" },
  { code: "NO", name: "Norway", icon: "twemoji:flag-norway" },
  { code: "PK", name: "Pakistan", icon: "twemoji:flag-pakistan" },
  { code: "PH", name: "Philippines", icon: "twemoji:flag-philippines" },
  { code: "PL", name: "Poland", icon: "twemoji:flag-poland" },
  { code: "PT", name: "Portugal", icon: "twemoji:flag-portugal" },
  { code: "RU", name: "Russia", icon: "twemoji:flag-russia" },
  { code: "SA", name: "Saudi Arabia", icon: "twemoji:flag-saudi-arabia" },
  { code: "ZA", name: "South Africa", icon: "twemoji:flag-south-africa" },
  { code: "ES", name: "Spain", icon: "twemoji:flag-spain" },
  { code: "LK", name: "Sri Lanka", icon: "twemoji:flag-sri-lanka" },
  { code: "SE", name: "Sweden", icon: "twemoji:flag-sweden" },
  { code: "CH", name: "Switzerland", icon: "twemoji:flag-switzerland" },
  { code: "TH", name: "Thailand", icon: "twemoji:flag-thailand" },
  { code: "TR", name: "Turkey", icon: "twemoji:flag-turkey" },
  { code: "UA", name: "Ukraine", icon: "twemoji:flag-ukraine" },
  { code: "AE", name: "United Arab Emirates", icon: "twemoji:flag-united-arab-emirates" },
  { code: "GB", name: "United Kingdom", icon: "twemoji:flag-united-kingdom" },
  { code: "US", name: "United States", icon: "twemoji:flag-united-states" },
  { code: "VN", name: "Vietnam", icon: "twemoji:flag-vietnam" },
  { code: "ZW", name: "Zimbabwe", icon: "twemoji:flag-zimbabwe" },
];
// const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));


const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  console.log("selectedPlan.value", selectedPlan.value);
  console.log("selectedPlanDodoProductID.value", selectedPlanDodoProductID.value);
  console.log("Selected values are", values);
  
  if (!selectedPlan.value || !selectedPlanDodoProductID.value) return;


  const email = user.value?.email
  const name = `${values.firstName} ${values.lastName}`
  const customer_id = user.value?.user_metadata?.dodo_customer_id

  console.log("customer_id", customer_id);
  

  const supabase_user_id = user.value?.id
  const product_id = selectedPlanDodoProductID.value
  const plan_code = selectedPlan.value
  const discount_code = values.discountCode ?? null

  const street = values.street
  const city = values.city
  const state = values.state
  const country = values.country
  const zipcode = values.zipcode

  const return_url = 'localhost:3000/success'

  const billingDetailsQuery = [`street=${street}`, `city=${city}`, `state=${state}`, `country=${country}`, `zipcode=${zipcode}`].join('&')

  const metaDataQuery = [`supabase_user_id=${supabase_user_id}`,`product_id=${product_id}`, `plan_code=${plan_code}`].join('&')


  const customerQuery = customer_id ? `customer_id=${customer_id}` : [`email=${email}`, `name=${name}`].join('&')

  console.log("customerQuery", customerQuery);
  

  let finalQuery = `/api/payments/getPaymentLink?` + billingDetailsQuery + '&' + customerQuery + '&' + metaDataQuery + `&return_url=${return_url}` + `&product_code=${gadgetSlug}` + `&discount_code=${discount_code}`
  console.log("finalQuery", finalQuery);
  
  finalQuery = encodeURI(finalQuery)

  try {
    const paymentObject = await $fetch(finalQuery)
    if (paymentObject) {
      console.log("paymentObject", paymentObject);

      if (!customer_id) {
        const { data, error } = await client.auth.updateUser({
          data: { dodo_customer_id: paymentObject.customer.customer_id }
        });

        if (error) {
          console.error("Failed to update user metadata:", error);
        } else {
          console.log("User metadata updated:", data);
        }
      }

      window.open(paymentObject.payment_link, '_blank')
      
    }
    
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.description);
    console.log(error.statusMessage);
    
    toast({
      ...toastOptions, 
      title: "Something Went Wrong",
      variant: 'destructive'

    })
    
  }

  // If dodo_customer_id didn't existed in query, it means that customer didn't exist in Dodo yet, so we must have received a custmomer id from Dodo (cus_gQyGqLgNdMbBUKAV8YPDT) and should set it in the user meta data

})

const billingDialogOpen = ref(false)
const confirmBillingDetails = async () => {




  // const email = query.email as string;
  // const name = query.name as string;
  // const city = query.city as string;
  // const country = query.country as CountryCode;
  // const state = query.state as string;
  // const street = query.street as string;
  // const zipcode = query.zipcode as string;
  // const product_id = query.product_id as string;
  // const product_code = query.product_code as string;
  // const plan_code = query.plan_code as string;
  // const supabase_user_id = query.supabase_user_id as string;
  // const return_url = query.return_url as string;

  // After checking if customer exists
  // const customer_id = query.customerId as string;

  // const paymentLink = await $fetch(`/api/payments/getPaymentLink?name=${name}&?email=${email}&?city=${city}&?street=${street}&?country=${country}&?state=${state}&?zipcode=${zipcode}&?plan_code=${selectedPlan.value}&product_code=${gadgetSlug.value}&${}`)

  // if (paymentLink) {
  //   window.open(paymentLink)
  // }
}

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


definePageMeta({
  layout: 'gadget-page',
  scrollToTop: true,
});

const accordionItems = [
  { value: 'item-1', title: `Explain me like I'm five, what does this do?`, content: 'Oh well, see that little mouse you use to click on stuff online? You can basically do the same clicking by pressing keys on the keyboard. Saving you the time and effort to find the right element again and again to click it, preventing repetition and frustration! Did ya get it buddy?' },
  { value: 'item-2', title: 'Why should I pay for it?', content: `This extension looks like it solves a very small problem, but sometimes those small itches can be a real pain. If you learn to properly use this tool, you'll find yourself relieved at several points where you had to repeteadly click on elements, but now you can do it just by the press of a button. A major feature in the premium version is the multiple and similar element functionality, it can be a real time saver if you learn to make use of it. Give it a try to and see for yourself!` },]
const route = useRoute();
const router = useRouter();
const gadgetSlug = route.params.gadgetSlug;
const gadgetData = ref(null);

const prevImageButtonRef = useTemplateRef<HTMLElement>('prevImageButtonRef')
const nextImageButtonRef = useTemplateRef<HTMLElement>('nextImageButtonRef')
const expandedViewEnabled = ref(false)
const totalShowImageCount = ref(2)
const currentShowImageIndex = ref(1)
const onClickOutsideExpandedViewHandler = [
  (ev) => {
    closeExpandedView()
  },
  { ignore: [prevImageButtonRef, nextImageButtonRef] },
]
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

watchEffect(() => {
  if (gadgetData.value && gadgetData.value.name) {
    // useSeoMeta({
    //   title: `${gadgetData.value.name} - ${gadgetData.value.tagline}`
    // });

    useSeoMeta({
      // Basic Meta Tags
      title: `${gadgetData.value.name} - ${gadgetData.value.tagline}`,
      description: gadgetData.value.shortDescription,
      keywords: gadgetData.value.keywords,
      // author: 'Browser Gadgets',

      // Open Graph (OG) for Facebook, LinkedIn, etc.
      ogTitle: `${gadgetData.value.name} - ${gadgetData.value.tagline}`,
      ogDescription: gadgetData.value.shortDescription,
      ogImage: getOGImageURL(), // Recommended dimensions: 1200x630px
      ogUrl: 'https://browsergadgets.io/gadgets/' + gadgetSlug,
      ogSiteName: gadgetData.value.name,
      ogType: 'website',

      // Twitter Cards
      twitterCard: 'summary_large_image',
      twitterTitle: `${gadgetData.value.name} - ${gadgetData.value.tagline}`,
      twitterDescription: gadgetData.value.shortDescription,
      twitterImage: getOGImageURL(), // Recommended dimensions: 1200x675px
      twitterSite: '@BrowserGadgets', // Your Twitter handle
      // twitterCreator: '@BrowserGadgets', // Your or the author's Twitter handle

      // Robots Meta Tag
      robots: 'index, follow', // Allows search engines to index the page and follow links

      // Twitter and Open Graph Image Alt Texts
      twitterImageAlt: `${gadgetData.value.name} logo and tagline`,
      ogImageAlt: `${gadgetData.value.name} logo and tagline`,
    })

  } else {
    useSeoMeta({
      title: "Loading Gadget... - Browser Gadgets" // ✅ Default title until data loads
    });
  }
});


function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/images/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/' + path]
}

const getShowImageImageURL = (index) => {
  return useAsset(`images/gadgets/${gadgetSlug}/showImage_${index}` + '.png')
}
const getOGImageURL = () => {
  return useAsset(`images/gadgets/${gadgetSlug}/ogImage.jpg`)
}
const gadgetLogoURL = useAsset(`images/gadgets/${gadgetSlug}/logo` + '.png')


const keyPressHandler = (e: KeyboardEvent) => {
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


const selectedPlan = ref('')
const selectedPlanDodoProductID = ref('')
const getButtonClicked = (planCode: string, productId: string) => {
  if (planCode !== 'free') {
    billingDialogOpen.value = !billingDialogOpen.value
    selectedPlan.value = planCode
    selectedPlanDodoProductID.value = productId
  }
  else {
    installExtension()
  }


}

let formattedDescription: ComputedRef<string>;
onMounted(async () => {
  console.log('gadgetSlug', gadgetSlug);
  gadgetData.value = await $fetch('/api/g/getGadgetData?name=' + gadgetSlug)
  if (!gadgetData.value) return;
  formattedDescription = computed<string>(() => {
    return gadgetData.value.description.replace(/\n/g, "<br>");
  });
  totalShowImageCount.value = gadgetData.value.showImageCount
  console.log("gadgetData", gadgetData.value);
  console.log("totalShowImageCount.value", totalShowImageCount.value);

  console.log("detectBrowser", detectBrowser());
  document.addEventListener('keydown', keyPressHandler)

  const themeSetter = () => {
    document.body.style.backgroundColor = gadgetData.value.theme.bgColor.light

    const redBlob = document.querySelector('svg.redBlob path') as SVGPathElement
    const greenBlob = document.querySelector('svg.greenBlob path') as SVGPathElement
    const yellowBlob = document.querySelector('svg.yellowBlob path') as SVGPathElement
    const purpleBlob = document.querySelector('svg.purpleBlob path') as SVGPathElement
    redBlob.style.fill = gadgetData.value.theme.primaryColor.medium
    greenBlob.style.fill = gadgetData.value.theme.primaryColor.light
    yellowBlob.style.fill = gadgetData.value.theme.secondaryColor.medium
    purpleBlob.style.fill = gadgetData.value.theme.secondaryColor.medium
    // document.querySelector('.plan-wrapper').style.backgroundColor = gadgetData.value.theme.secondaryColor.medium

  }

  themeSetter()
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyPressHandler)
})


const installExtension = () => {
  const browser = detectBrowser()
  let storeURL = '';
  if (browser) {
    if (['brave', 'chrome'].includes(browser)) {
      storeURL = gadgetData.value.storeURLs.chromeWebStore
    }
    else if (['microsoft-edge'].includes(browser)) {
      storeURL = gadgetData.value.storeURLs.msEdgeAddons
    }
  }

  if (storeURL) {
    window.open(storeURL, '_blank')
  }
}


</script>

<style scoped>
.pricingSection {
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-inline: 4rem;
  /* margin-bottom: 5rem; */
}


.pricingSection_header {
  padding: 1rem;
  margin-bottom: 1rem;

}

.pricingPlans-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.buyButton {
  background-color: rgb(252, 169, 2);
  /* text-shadow: none; */
  /* color: black; */
  margin: 0;
  margin-top: 1rem;
  min-width: 5rem;
  font-size: 1.5rem;
  padding-block: .2rem;
  font-weight: 800;
  font-family: 'MoreSugar';
  box-shadow: .2rem .2rem .0rem rgba(0, 0, 0, 0.76)
    /* border: .1rem rgb(0, 0, 0) solid; */
}

.buyButton:hover {
  transition: .1s ease;
  transform: scale(1.1);
}

.buyButton:active {
  transition: .1s ease;
  transform: scale(.9);
}

.plan-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* background-color: rgb(232, 232, 232); */
  /* background-color: rgb(43, 43, 43); */
  color: #f2f2f2;
  /* background: linear-gradient(0deg, rgba(156, 154, 154, 0.344), rgb(244, 244, 244)); */
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 2rem;
  box-shadow: .2rem .2rem .5rem rgba(38, 38, 38, 0.62);
  max-width: 25rem;
  min-height: fit-content;
  transition: .1s ease;
}

.plan-wrapper:hover {
  transition: .1s ease;
  /* transform: translateY(-.5rem); */
}

.plan-wrapper h2 {
  font-size: 2rem;
  font-family: 'MoreSugar';
  padding: .2rem;
  text-align: center;
  text-shadow: .2rem .2rem .0rem rgba(255, 255, 255, 0.195);
  color: #f2f2f2
}

.plan-wrapper h3 {
  font-size: 2rem;
  font-family: 'MoreSugar';
  text-align: center;
  font-weight: 200;
  color: var(--yellow)
}

.plan-wrapper p {
  padding-inline: .5rem;
  text-align: center;
  margin-block: .5rem;
}

.plan-wrapper ul {
  padding: 1rem;
  padding-left: 2rem;
  list-style-type: disc;
  list-style-type: '👉';
  display: flex;
  justify-content: start;
  flex-direction: column;
  border-radius: 2rem;
  background-color: white;
  height: 100%;
  font-weight: 700;
  margin: 0;
}

.plan-wrapper ul li {
  padding-inline: .5rem;
  margin-block: .5rem;
  color: #2f2f2f;
}

button.installButton {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  font-size: 1.5rem;
  text-shadow: none;
  box-shadow: .3rem .3rem .5rem rgba(0, 0, 0, 0.171);
  border-radius: .8rem;
}

button.accordionButton {
  /* background-color: transparent; */
  /* background-color: red; */
  text-shadow: none;
  color: black;
}

button.accordionButton:hover {
  background-color: rgba(147, 147, 147, 0.419);
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

.showImages-wrapper {
  border-radius: 1rem;
}

.imagesScroller-wrapper:not(.expandedView) .showImage-wrapper {}

.showImage-wrapper img {
  border-radius: inherit;
}

.imagesScroller-wrapper:not(.expandedView) .showImage-wrapper img {
  width: 40%;
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