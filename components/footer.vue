<template>
  <footer class="">

    <section class="flex flex-row items-center w-full">
      <div class="left-section flex-1 w-full flex flex-col items-center">
        <h1>Browser Gadgets</h1>
    </div>

    <div class="right-section flex-1 w-full flex flex-col items-center">

      <!-- Top Section: Links -->
      <div class="flex flex-wrap justify-center space-x-8 mb-6 w-full">
        <a href="/legal"
           class="footer-link">Legal</a>
        <a href="/about"
           class="footer-link">About</a>
        <a href="/tutorials"
           class="footer-link">Tutorials</a>
      </div>
      <!-- Middle Section: Social Links -->
      <div class="flex flex-wrap justify-center space-x-8 mb-6 w-full">
        <a href="https://x.com"
           target="_blank"
           class="footer-link">X.com</a>
        <a href="https://youtube.com"
           target="_blank"
           class="footer-link">YouTube</a>
        <a href="https://discord.com"
           target="_blank"
           class="footer-link">Discord</a>
      </div>

    </div>
    </section>

    <!-- Bottom Section: Copyright and Powered By -->
    <div class="flex flex-col items-center border-t border-gray-300 pt-4 w-full">
      <p class="text-sm text-gray-600">© {{ new Date().getFullYear() }} browsergadgets.io. All rights reserved.</p>
      <p class="text-xs text-gray-600 mt-2">A <a href="https://prakashh.com"
           target="_blank"
           class="">Prakashh</a> Product</p>
    </div>

  </footer>
</template>

<script setup>
</script>

<style scoped>
footer {
  background-color: #f5f5f5;
  padding: 2rem 0;
  margin-top: 10rem;
  width: 100%;
  text-align: left;
}

.footer-link {
  text-decoration: none;
  font-size: 1.25rem;
  /* Increased font size for better visibility */
  color: #4a4a4a;
  /* Neutral color for links */
  font-family: 'MoreSugar', sans-serif;
  font-weight: 100;
  margin: 0.5rem;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
