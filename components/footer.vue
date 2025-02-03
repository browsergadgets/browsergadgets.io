<template>
  <footer class="">

    <section class="flex flex-row items-center w-full">
      <div class="left-section flex-1 w-full flex flex-col items-center">
        <!-- <h1>Browser Gadgets</h1> -->
        <img src="../assets/images/browsergadgets_logo_with_text.png"
             alt="Browser Gadgets Logo"
             class="w-1/3">
      </div>

      <div class="right-section flex-1 w-full flex flex-col items-center">

        <!-- Top Section: Links -->
        <div class="grid grid-cols-3 gap-4 justify-center mb-2 w-auto px-4">
          <NuxtLink to="/legal/privacy-policy" class="footer-link">Privacy Policy</NuxtLink>
          <NuxtLink to="/legal/refund-policy" class="footer-link">Refund Policy</NuxtLink>
          <NuxtLink to="/legal/terms-and-conditions" class="footer-link">Terms & Conditions</NuxtLink>
          <NuxtLink to="/about" class="footer-link">About</NuxtLink>
          <NuxtLink to="/tutorials" class="footer-link">Tutorials</NuxtLink>
          <a href="https://prakashh.com/careers"
             class="footer-link">Careers</a>
        </div>

      </div>
    </section>

    <!-- Social Links -->
    <div class="flex flex-wrap justify-center space-x-8 my-2 w-full">
      <a href="https://x.com/browsergadgets"
         target="_blank"
         class="footer-link">
        <Icon icon="mdi:twitter"
              width="24"
              height="24" />
      </a>
      <a href="https://www.youtube.com/@browsergadgets"
         target="_blank"
         class="footer-link">
        <Icon icon="mdi:youtube"
              width="24"
              height="24" />
      </a>
      <a href="https://discord.gg/kPGKshWBgT"
         target="_blank"
         class="footer-link">
        <Icon icon="mdi:discord"
              width="24"
              height="24" />
      </a>
    </div>
    <!-- Bottom Section: Copyright and Powered By -->
    <div class="flex flex-col items-center border-t border-black pt-4 w-full">
      <p class="text-sm text-gray-600">© {{ new Date().getFullYear() }} browsergadgets.io. All rights reserved.</p>
      <p class="text-xs text-gray-600 mt-2">A <a href="https://prakashh.com"
           target="_blank"
           class="">Prakashh</a> Product</p>
    </div>

  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>

<style scoped>
footer {
  background-color: #f2ecaa87;
  padding: 2rem 0;
  margin-top: 10rem;
  width: 100%;
  text-align: left;
}

.footer-link {
  text-decoration: none;
  font-size: 1rem;
  /* Increased font size for better visibility */
  color: #4a4a4a;
  /* Neutral color for links */
  /* font-family: 'MoreSugar', sans-serif; */
  font-weight: 300;
  margin: 1rem;
  opacity: 0.8;
  text-align: left;
}

.footer-link:hover {
  text-decoration: underline;
  opacity: 1;
}
</style>
