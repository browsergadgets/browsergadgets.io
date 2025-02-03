<template>
  <div class="legal-container">
    <h1>Legal</h1>
    <div class="legal-box">
      <p>Welcome to our legal section. Here you will find important documents that outline the terms and conditions, privacy policy, and refund policy of our services. It is crucial to read and understand these documents to ensure you are fully informed about your rights and obligations.</p>
      <ul>
        <li>
          <a href="/legal/termsandconditions">Terms and Conditions</a>
          <p>Our Terms and Conditions document outlines the rules and regulations for using our services. It is important to read this document to understand your responsibilities and our commitments.</p>
        </li>
        <li>
          <a href="/legal/privacypolicy">Privacy Policy</a>
          <p>Our Privacy Policy explains how we collect, use, and protect your personal information. Please read this document to understand how your data is handled.</p>
        </li>
        <li>
          <a href="/legal/refundpolicy">Refund Policy</a>
          <p>Our Refund Policy provides information on the conditions under which refunds are issued. It is important to read this document to understand your rights regarding refunds.</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.legal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 150vh;
}

.legal-box {
  max-width: 800px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.legal-box ul {
  list-style-type: none;
  padding: 0;
}

.legal-box li {
  margin: 1rem 0;
}

.legal-box a {
  font-weight: bold;
  color: #007BFF;
  text-decoration: none;
}

.legal-box a:hover {
  text-decoration: underline;
}

.legal-box p {
  margin: 0.5rem 0 0;
}

</style>