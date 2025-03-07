<template>
    <section class="flex flex-row p-0 my-0 justify-center items-center font-[MoreSugar] text-3xl">

        <div class="sideView w-1/2 h-screen">

            <!-- <video autoplay
                   muted
                   loop
                   id="sideVideo">
                <source src="@/assets/videos/sideVideo.mp4"
                        type="video/mp4">
            </video> -->
        </div>
        <div class="authContainer flex flex-col justify-center items-center  w-1/2 h-screen relative">
            <button v-show="totalSteps.indexOf(currentStep) !== 0"
                    class="prevButton rounded-xl"
                    @click="prevStep">

                <Icon icon="material-symbols:chevron-left-rounded"
                      width="30"
                      height="30" />
            </button>
            <NuxtLink class="homeButton absolute top-10 right-10 bg-white p-2 rounded-lg pointer-events-auto"
                      to="/"
                      title="Go to Home">
                <img src="@/assets/images/logo-transparent.png"
                     alt="Browser Gadgets Logo"
                     class="w-10 active:scale-95 duration-200 pointer-events-none">
            </NuxtLink>

            <div class="form-wrapper w-full flex flex-col items-center justify-around relative h-3/4">


                <div class="flex flex-col justify-center items-start px-10">

                    <div class="nameInput-wrapper step-container flex flex-col justify-center w-full"
                         v-if="currentStep === 'name'">
                        <label for="firstNameInput"
                               class="text-[#333] my-2">And who this might be?🤔</label>

                        <div class="flex flex-row justify-start items-start gap-4 flex-nowrap">

                            <input type="text"
                                   name="firstName"
                                   autofocus
                                   id="firstNameInput"
                                   minlength="2"
                                   placeholder="First Name"
                                   v-model="firstName"
                                   class="">
                            <input type="text"
                                   name="lastName"
                                   id="lastNameInput"
                                   minlength="2"
                                   placeholder="Last Name"
                                   v-model="lastName"
                                   class="">
                        </div>
                        <button class="authButton yellow-bg self-end"
                                :disabled="!nameValid"
                                @click.prevent="nextStep">That's me!</button>
                    </div>
                    <div class="emailInput-wrapper step-container flex flex-col justify-center items-start w-full"
                         v-if="currentStep === 'email'">
                        <label for="user_email"
                               class="text-[#333] my-2">Please enter your email below 👇</label>

                        <!-- <span class="text-base opacity-70 w-full"
                              v-show="isSignUp">You'll need to verify </span> -->
                        <input type="email"
                               name="email"
                               id="user_email"
                               required
                               autofocus
                               placeholder="someonecool@mymail.com"
                               class=""
                               v-model="email"
                               @input="validateEmail">

                        <button class="authButton self-end"
                                :class="{ bounce: isValidEmail }"
                                :disabled="!isValidEmail"
                                @click.prevent="nextStep">{{ isSignUp ? buttonText : 'Next' }}</button>
                    </div>
                    <div class="passwordInput-wrapper step-container flex flex-col justify-center items-start w-full"
                         v-if="currentStep === 'password'">
                        <label for="passwordInput"
                               class="text-[#333] my-2">{{ isSignUp ? `Create an ultra-secure password`
                            : 'Enter your password' }}</label>
                        <input type="password"
                               name="password"
                               id="passwordInput"
                               autofocus
                               placeholder="Your Password"
                               v-model="password">
                        <label for="confirmPasswordInput"
                               v-if="isSignUp"
                               class="text-[#333] my-2 mt-8">Confirm password:</label>
                        <input type="password"
                               v-if="isSignUp"
                               name="confirmPassword"
                               id="confirmPasswordInput"
                               placeholder="Same Password here"
                               v-model="confirmPassword">
                        <button class="authButton red-bg my-8 self-end"
                                @click.prevent="nextStep"
                                :disabled="!passwordValid">{{ isSignUp ? `Save Password 🔐` : 'Proceed' }}</button>
                    </div>
                    <div class="verifyMail-wrapper step-container flex flex-col justify-center items-center text-center w-full"
                         v-if="currentStep === 'verifyMail'">
                        <span>You'll get a mail to verify the Email address you have provided</span>

                        <button class="authButton purple-bg my-8"
                                :disabled="otp.length < 4">Alright</button>
                    </div>
                    <div class="otpInput-wrapper step-container flex flex-col justify-center items-center text-center w-full"
                         v-if="currentStep === 'otp'">
                        <label for="otpInput"
                               class="text-[#333] my-2">Please enter the OTP sent to your email:</label>
                        <v-otp-input ref="otpInput"
                                     input-classes="otp-input"
                                     :conditionalClass="['one', 'two', 'three', 'four']"
                                     separator=""
                                     inputType="number"
                                     :num-inputs="4"
                                     v-model="otp"
                                     :should-auto-focus="true"
                                     :should-focus-order="true"
                                     @on-change="handleOnChange"
                                     @on-complete="handleOnComplete"
                                     :placeholder="['🍎', '🌲', '🌻', '🌷']" />

                        <button class="authButton purple-bg my-8"
                                :disabled="otp.length < 4">Let's Go🔥</button>
                    </div>


                </div>

                <div class="oAuthbuttons-wrapper flex flex-row justify-center items-center w-full gap-5">

                    <button class="oAuthButtons signUpWithGoogleButton"
                            @click="signInWithGoogle">

                        <Icon icon="logos:google-icon"
                              width="24"
                              height="24"
                              class="mr-2" />
                        <span>{{ isSignUp ? 'Sign up' : 'Login' }}
                        </span>
                    </button>
                    <button class="oAuthButtons signUpWithGithubButton"
                            @click="signInWithGithub">
                        <Icon icon="logos:github-icon"
                              width="24"
                              height="24"
                              class="mr-2" />
                        <span>{{ isSignUp ? 'Sign up' : 'Login' }}
                        </span>
                    </button>
                </div>
            </div>
            <!-- <a href="#"
               class="existingUserLink absolute bottom-10"
               @click="changeFormType">{{ isSignUp ? 'Already have an account?' : "I don't have an account :(" }}</a> -->

            <NuxtLink class="existingUserLink absolute bottom-10"
                      :to="isSignUp ? '/auth/login' : '/auth/signup'">
                {{ isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up" }}
            </NuxtLink>
        </div>

    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VOtpInput from "vue3-otp-input";
import { Icon } from '@iconify/vue/dist/iconify.js';

const supabase = useSupabaseClient()
const user = useSupabaseUser()
// const isSignUp = ref(true)

const route = useRoute();
const router = useRouter();

const isSignUp = computed(() => route.params.mode === 'signup');

definePageMeta({
    layout: 'auth',
    middleware: ['auth']
});
watchEffect(() => {
    useSeoMeta({
        title: isSignUp.value ? 'Sign Up - Browser Gadgets' : 'Login - Browser Gadgets'
    });
});

if (!['login', 'signup'].includes(route.params.mode)) {
    router.replace('/auth/login'); // Default to login
}

const totalSteps = computed(() =>
    isSignUp.value ? ['name', 'email', 'password', 'verifyMail'] : ['email', 'password']
)

const currentStep = ref(totalSteps.value[0])


const firstName = ref('');
const lastName = ref('');
const email = ref('');
const isValidEmail = ref(false);
const buttonText = ref('Done!🙂‍↕️');
const otp = ref('')
const password = ref('')
const confirmPassword = ref('')


const nameValid = computed(() => {

    if (!firstName.value || !lastName.value) return false;

    if (firstName.value.length < 1 || lastName.value.length < 1) return false;

    return true
});
const passwordValid = computed(() => {
    if (!isSignUp.value) return true;
    if (password.value !== confirmPassword.value) {
        return false; // Passwords do not match
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!\-_\s])[A-Za-z\d@#$%^&*!\-_\s]{8,}$/
        ;

    return strongPasswordRegex.test(password.value);
    // return true;
});

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValidEmail.value = emailPattern.test(email.value);
    if (isValidEmail.value) {
        buttonText.value = 'Done! 🎉';
    } else {
        buttonText.value = 'Okay🙂‍↕️';
    }
};

const nextStep = async () => {
    if (currentStep.value == 'password') {
        if (isSignUp.value) {
            console.log("signing up new user!");
            await signUpNewUser()
            // await signUp(email.value, password.value)
        } else {
            console.log("signing in existing user!");
            await signInExistingUser()
        }
    }
    if (totalSteps.value.includes(currentStep.value) && totalSteps.value.indexOf(currentStep.value) + 1 < totalSteps.value.length) {
        let currentStepValue = currentStep.value
        let nextStepIndex = totalSteps.value.indexOf(currentStep.value) + 1
        currentStep.value = totalSteps.value[nextStepIndex]
    }

};
const prevStep = () => {
    if (totalSteps.value.includes(currentStep.value) && totalSteps.value.indexOf(currentStep.value) !== 0) {
        // if (isSignUp.value) {
        let currentStepValue = currentStep.value
        let prevStepIndex = totalSteps.value.indexOf(currentStep.value) - 1
        currentStep.value = totalSteps.value[prevStepIndex]
        // }
    }
};


async function signUp(email, password, provider = "email") {
    const existingProvider = await checkEmailExists(email);

    if (existingProvider) {
        return alert(
            `An account already exists with this email. Please log in using ${existingProvider.toUpperCase()}.`
        );
    }

    if (provider === "email") {
        await supabase.auth.signUp({ email, password });
    } else {
        await supabase.auth.signInWithOAuth({ provider });
    }
}

async function linkOAuthToExistingUser(provider: string) {
    // const { data, error } = await supabase.auth.getUser();

    if (!user.value) return console.error("User not logged in");

    const userEmail = user.value.email;

    // Check if email is already registered
    const existingProvider = await checkEmailExists(userEmail as string);

    if (existingProvider && existingProvider !== provider) {
        return alert(`This email is already linked with ${existingProvider.toUpperCase()}. Please log in using that.`);
    }

    // Proceed with OAuth login
    await supabase.auth.signInWithOAuth({ provider });
}


async function signUpNewUser() {
    console.log("Creating a new user with this email: ", email.value);
    console.log("Password: ", password.value);

    // const existingProvider = await checkEmailExists(email.value);

    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            data: {
                firstName: firstName.value,
                lastName: lastName.value,
                display_name: `${firstName.value} ${lastName.value}`
            }
            // emailRedirectTo: 'https://browsergadgets.io/welcome',

        },

    })
    console.log("data", data);
    console.log("error name", error?.name);
    console.log("error cause", error?.cause);
    console.log("error code", error?.code);
    console.log("error message", error?.message);

}

async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })

    console.log("data", data);
    console.log("error name", error?.name);
    console.log("error cause", error?.cause);
    console.log("error code", error?.code);
    console.log("error message", error?.message);
}
async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })

    console.log("data", data);
    console.log("error name", error?.name);
    console.log("error cause", error?.cause);
    console.log("error code", error?.code);
    console.log("error message", error?.message);
}

async function signInExistingUser() {
    console.log("Signing in existing user with this email: ", email.value);
    console.log("Password: ", password.value);
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
        options: {
            // emailRedirectTo: 'https://browsergadgets.io/welcome',

        },
    })
    console.log("data", data);
    console.log("error name", error?.name);
    console.log("error cause", error?.cause);
    console.log("error code", error?.code);
    console.log("error message", error?.message);
}

async function checkEmailExists(email: string) {
    const { data, error } = await supabase
        .from("auth.users") // Internal table for users
        .select("id, identities")
        .eq("email", email)
        .single();

    if (error) {
        return false; // No user found, safe to sign up
    }

    // If user exists, check how they signed up
    if (data.identities.length > 0) {
        const provider = data.identities[0].provider; // Could be 'email', 'google', 'github'
        return provider;
    }

    return "email"; // Default to email/password if no provider is stored
}





const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindModal = ref("");

const handleOnComplete = (value: string) => {
    console.log("OTP completed: ", value);
};

const handleOnChange = (value: string) => {
    console.log("OTP changed: ", value);
};

const clearInput = () => {
    otpInput.value?.clearInput();
};

const fillInput = (value: string) => {
    console.log(value);
    otpInput.value?.fillInput(value);
};


function handleKeyPress(e: KeyboardEvent) {

    if (e.key === 'Enter') {

        if (currentStep.value == 'name' && nameValid.value) {
            nextStep()
        } else if (currentStep.value == 'email' && isValidEmail.value) {
            nextStep()
        } else if (currentStep.value == 'password' && passwordValid.value) {
            nextStep()
        } else if (currentStep.value == 'otp' && otp.value.length == 4) {
            // nextStep()
            console.log("OTP: ", otp.value);

        }
    }
}

onMounted(() => {
    console.log("Login page")

    document.addEventListener('keypress', handleKeyPress)

    watchEffect(() => {
        if (user.value) {
            navigateTo('/profile',)
        }
    })

})
</script>

<style>
.authContainer {
    background-color: rgba(233, 233, 233, 0.979);
    background-image: url('@/assets/images/colourfulbg.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    box-shadow: inset 1rem 1rem 5rem rgba(0, 0, 0, 0.44);

}

input {
    font-weight: 200;
    border-radius: .4rem;
    box-shadow: .1rem .2rem rgba(87, 87, 87, 0.524);
    padding: .4rem .3rem;
    background-color: rgb(232, 232, 232);
}

input:focus {
    /* outline: .3rem #202020 solid; */
    outline: none;
    box-shadow: .1rem .2rem .5rem rgba(0, 0, 0, 0.328);
    transform: scale(1.05);
    transition: transform .2s ease;
}


input[type="email"] {
    width: 100%;
    flex: 1;
}

.nameInput-wrapper input {
    /* min-width: 10rem; */
}

input[data-test="single-input"] {
    width: 5rem;
    height: 5rem;
    text-align: center;
    margin-inline: .5rem;
    padding: .4rem .4rem;
    font-size: 3rem;
    background-color: var(--purple-lightest);
    box-shadow: .1rem .2rem var(--green-light);
    color: white;
}

input[data-test="single-input"]:focus {
    box-shadow: .1rem .2rem .3rem var(--green-dark);
}

input[data-test="single-input"]::placeholder {
    opacity: .5;
}

input[data-test="single-input"]:valid:not(:placeholder-shown) {
    background-color: var(--green-light);
    box-shadow: .1rem .2rem var(--green-darker);
}

input[data-test="single-input"]:invalid {
    background-color: var(--red-light);
}



.prevButton {
    background-color: rgb(255, 174, 0);
    padding: .5rem;
    color: white;
    position: absolute;
    left: 2rem;
    top: 2rem;
}

.prevButton:hover {
    background-color: rgb(247, 185, 49);

}

.prevButton:active {
    transform: scale(0.9);

}

.form-wrapper {
    /* min-width: 10rem;
    min-height: 35rem; */
    /* width: fit-content; */
    border-radius: 1rem;
    /* background: rgb(222, 222, 222); */
    /* border: .2rem rgb(189, 189, 189) solid; */
}

button.oAuthButtons {
    /* text-shadow: none; */
    font-size: 1.2rem;
    border-radius: 1rem;
    background-color: var(--green-light);
    color: #f0f0f0;
    min-width: 10rem;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem .5rem;
}

button.oAuthButtons.signUpWithGithubButton {
    background-color: #dddddd;
    color: var(--black);
    text-shadow: none;
}

button.oAuthButtons.signUpWithGithubButton:hover {
    background-color: #afafaf;
}

button.oAuthButtons:hover {
    background-color: var(--green);
    /* box-shadow: .1rem .2rem .2rem rgb(0, 0, 0); */

}

button.oAuthButtons img {
    max-width: 2rem;
    margin-right: .8rem;
}

button.authButton:active {
    transform: scale(0.9);
}

button.bounce {
    animation: bounce 0.5s;
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-30px);
    }

    60% {
        transform: translateY(-15px);
    }
}

.sideView {
    position: relative;
    overflow: hidden;
    background-image: url('@/assets/images/shops.gif');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    box-shadow: inset 1rem 1rem 10rem rgb(0, 0, 0);
}

.sideView:hover {
    box-shadow: inset 1rem 1rem 5rem rrgba(0, 0, 0, 0.543)
}

#sideVideo {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
}

a.existingUserLink {
    font-weight: 200;
    font-size: 1.2rem;
    color: #202020;

}

a.existingUserLink:hover {
    text-decoration: underline .2rem #202020;
}

/* Ensure parent container maintains relative positioning */
.step-container {
    position: relative;
    width: 100%;
    height: auto;
    /* Adjust based on your content */
}
</style>