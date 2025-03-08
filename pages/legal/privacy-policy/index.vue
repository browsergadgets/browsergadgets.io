<template>
  <div class="privacy-policy-container">
    <h1 class="font-[MoreSugar] font-normal">Privacy Policy</h1>
    <p class="my-4"><strong>Effective Date:</strong> 02 February, 2025</p>

    <div class="partOfDoc-wrapper">
      <h2>Introduction</h2>
      <p>BrowserGadgets.io is committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it, and your rights.</p>
    </div>

    <div class="partOfDoc-wrapper">
      <h2>Data We Collect</h2>
      <ul>
        <li><strong>Account Data:</strong> Email address during signup.</li>
        <li><strong>Extension Data:</strong>
          <ul>
            <li><strong>Free users:</strong> All data is stored locally.</li>
            <li><strong>Premium users:</strong> Data is synced securely using encryption.</li>
          </ul>
        </li>
        <li><strong>Usage Data:</strong> Basic analytics to improve our services.</li>
      </ul>
    </div>

    <div class="partOfDoc-wrapper">
      <h2>How We Use Your Data</h2>
      <ul>
        <li>Provide, maintain, and improve our services.</li>
        <li>Process payments for premium features.</li>
        <li>Offer cloud sync for premium users.</li>
      </ul>
    </div>

    <div class="partOfDoc-wrapper">
      <h2>Data Security & Retention</h2>
      <ul>
        <li>All synced data is encrypted.</li>
        <li>Users can delete their data at any time.</li>
        <li>Data is removed from our servers if a user downgrades to free.</li>
      </ul>
    </div>

    <div class="partOfDoc-wrapper">
      <h2>Third-Party Sharing</h2>
      <ul>
        <li>We do not share or sell user data to third parties.</li>
        <li>Payments are securely handled by Dodo Payments.</li>
      </ul>
    </div>

    <div class="partOfDoc-wrapper">
      <h2>Your Rights</h2>
      <ul>
        <li>Users can request data deletion at any time.</li>
        <li>Users can access or modify their data via the web app.</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.privacy-policy-container {
  max-width: 800px;
  margin: 2rem auto;
  margin-bottom: 5rem;
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1ba, #ffffff);
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  color: #333;
}

p, ul {
  color: #555;
  line-height: 1.6;
}

ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.partOfDoc-wrapper {
  margin-bottom: 2rem;
}
</style>