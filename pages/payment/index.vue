<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 class="text-xl font-semibold">Verifying Payment...</h1>
        <p class="text-gray-600 mt-2">Please wait while we confirm your payment.</p>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useSupabaseUser } from "#imports"; // Ensure user is authenticated

const router = useRouter();
const route = useRoute();
const user = useSupabaseUser();

// Extract query params
const paymentId = route.query.payment_id;
const paymentStatus = route.query.status;

// ✅ Payment Verification Function
const checkPaymentStatus = async (retryCount = 0) => {
    try {
        const result = await $fetch(`/api/payments/verify?payment_id=${paymentId}`);

        if (result.exists) {
            router.replace("/payment/success");
        } else if (retryCount < 5) {
            setTimeout(() => checkPaymentStatus(retryCount + 1), 2000);
        } else {
            router.replace("/payment/failed");
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        router.replace("/payment/failed");
    }
};

// 🔍 Redirect to root if not authenticated or missing params
if (!user.value || !paymentId || paymentStatus !== "succeeded") {
    router.replace("/");
} else {
    checkPaymentStatus();
}

</script>
