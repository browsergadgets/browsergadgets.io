    <template>
        <nav class="flex p-4 my-4 items-center justify-between">


            <div class="flex items-center justify-center"
                 @mouseenter="logoImageHovered"
                 @mouseleave="logoImageLeft">
                <NuxtLink to="/"
                          v-if="!user || route.path !== '/'"
                          class="navLogoLink">
                    <img src="../../assets/images/logo-transparent.png"
                         class="navLogo"
                         ref="logoImage"
                         alt="">
                </NuxtLink>
            </div>

            <div class="navLinks relative">


                <NuxtLink v-if="!user"
                          :to="user ? 'profile' : '/auth/signup'"
                          exact-active-class="active-link"
                          class="nav-link"
                          style="color: var(--white); background-color: var(--green); box-shadow: .1rem .1rem rgb(0, 0, 0);">
                    <Icon :icon="user ? 'material-symbols:account-circle' : 'material-symbols:login-rounded'"
                          width="30"
                          height="30"
                          class="mr-2" />
                    <span>{{ user ? 'Profile' : 'Sign Up' }}</span>
                </NuxtLink>
                <NuxtLink to="/gadgets"
                          v-if="!user"
                          exact-active-class="active-link"
                          class="nav-link exploreGadgets-link"
                          style="">
                    <Icon icon="mdi:explore"
                          width="30"
                          height="30"
                          class="mr-2" />
                    <span>Explore Gadgets</span>
                </NuxtLink>


                <!-- ✅ Button stays active when dropdown is open -->
                <button class="dropDownButton bg-transparent shadow-none p-2 text-6xl mx-5 hover:bg-transparent hover:rotate-12 active:scale-75 duration-200 select-none"
                        :class="{ 'dropdown-open': dropdownVisible }"
                        @click="toggleDropdown"
                        @keydown.esc="dropdownVisible = false"
                        @keydown.down.prevent="focusFirstItem"
                        aria-haspopup="true"
                        :aria-expanded="dropdownVisible"
                        ref="dropdownButton"
                        v-if="user">
                    <span>{{ todayEmoji }}</span>
                </button>

                <!-- ✅ Dropdown with better accessibility -->
                <Transition name="fade"
                            mode="default">
                    <div v-if="dropdownVisible && user"
                         class="dropdown-wrapper flex flex-col min-h-20 absolute border-[#8d8d8d] border-2 top-[85%] right-8 rounded-xl p-2 shadow-lg z-10"
                         ref="dropdownMenu"
                         role="menu"
                         @keydown.esc="dropdownVisible = false"
                         @keydown.tab="handleTabNavigation">
                        <NuxtLink to="/profile"
                                  exact-active-class="dropdown-active-link"
                                  class="dropdownItem"
                                  role="menuitem"
                                  ref="firstDropdownItem">
                            <span class="dropdownIcon">{{ todayEmoji }}</span>
                            <span>Profile</span>
                        </NuxtLink>
                        <NuxtLink to="/gadgets"
                                  exact-active-class="dropdown-active-link"
                                  class="dropdownItem"
                                  href="#"
                                  role="menuitem">
                            <Icon icon="mage:dashboard-2-fill"
                                  width="30"
                                  height="30"
                                  class="dropdownIcon" />
                            <span>Gadgets</span>
                        </NuxtLink>
                        <NuxtLink to="/dashboard"
                                  exact-active-class="dropdown-active-link"
                                  class="dropdownItem"
                                  href="#"
                                  role="menuitem">
                            <Icon icon="material-symbols:space-dashboard"
                                  width="30"
                                  height="30"
                                  class="dropdownIcon" />
                            <span>Dashboard</span>
                        </NuxtLink>
                        <a class="dropdownItem red-bg"
                           href="#"
                           @click.prevent="signOut"
                           role="menuitem">
                            <Icon icon="material-symbols:logout-rounded"
                                  width="30"
                                  height="30"
                                  class="dropdownIcon" />
                            <span>Logout</span>
                        </a>
                    </div>
                </Transition>

            </div>
        </nav>
    </template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { Icon } from '@iconify/vue';


const todayEmoji = ref('🐼')
const emojiesList = ref(['🐼'])


const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute();


const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
}

const dropdownVisible = ref(false);
const dropdownButton = ref(null);
const dropdownMenu = ref(null);
const firstDropdownItem = ref(null);

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;

    if (dropdownVisible.value) {
        nextTick(() => {
            firstDropdownItem.value?.focus();
        });
    }
};

const closeDropdown = (event) => {
    if (
        dropdownMenu.value && !dropdownMenu.value.contains(event.target) &&
        dropdownButton.value && !dropdownButton.value.contains(event.target)
    ) {
        dropdownVisible.value = false;
    }
};

const focusFirstItem = () => {
    nextTick(() => {
        firstDropdownItem.value?.focus();
    });
};

const handleTabNavigation = (event) => {
    const focusableItems = dropdownMenu.value?.querySelectorAll('a, button');
    const firstItem = focusableItems?.[0];
    const lastItem = focusableItems?.[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
    }
};

// Close dropdown when clicking outside
onMounted(() => {
    console.log("user", user.value);
    
    document.addEventListener("click", closeDropdown);
});
onUnmounted(() => {
    document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
.navLogo {
    width: 100%;
    max-width: 4rem;
    z-index: -2;
    pointer-events: none;
    /* mix-blend-mode: multiply; */
}

.navLogoLink {
    /* mix-blend-mode: multiply; */
    margin-left: 1rem;
    transition: .3s ease;
}

.navLogoLink:active {
    transform: scale(0.9);
}

.navLinks {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.dropDownButton.dropdown-open {
    transform: rotate(-20deg) scale(1.2);
}

.dropdown-wrapper {
    background-color: transparent;
    background: linear-gradient(20deg, rgba(214, 214, 214, 0.577), rgba(244, 244, 244, 0.64));

    backdrop-filter: blur(20px);
}

.dropdownItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.3rem;
    background-color: rgb(246, 246, 246);
    margin: .15rem .1rem;
    color: rgb(64, 64, 64);
    border-radius: .2rem;
    outline: .1rem transparent solid;
    /* border: .1rem transparent solid; */
}
.dropdownItem:focus {
    outline: .1rem black solid;
}
.dropdownItem:hover {
    outline: .1rem rgba(157, 157, 157, 0.372) solid;
    transition: .2s ease;
    background-color: rgb(226, 226, 226);
}

.dropdownItem.red-bg {
    /* outline: none; */
    color: white;
    transition: .2s ease;
    background-color: var(--red);
}

.dropdownItem.red-bg:hover {
    /* outline: none; */
    transition: .2s ease;
    background-color: var(--red-dark);
}

.dropdownItem.green-bg {
    outline: none;
    transition: .2s ease;
    /* background-color: var(--green); */
}

.dropdownItem.green-bg:hover {
    color: white;
    outline: none;
    transition: .2s ease;
    background-color: var(--green-light);
}

.dropdownItem .dropdownIcon {
    margin-left: .8rem;
    margin-right: .5rem;
}

.dropdownItem span {
    text-align: center;
    margin: .8rem 1.8rem;
    margin-left: .5rem;
}

.dropdownItem:first-of-type {
    border-top-right-radius: .6rem;
    border-top-left-radius: .6rem;
}

.dropdownItem:last-of-type {
    border-bottom-right-radius: .6rem;
    border-bottom-left-radius: .6rem;
}


.nav-link {
    font-family: 'MoreSugar';
    text-shadow: .1rem .1rem rgb(0, 0, 0);
    font-weight: 900;
    text-decoration: none;
    font-size: 1.5rem;
    margin-inline: 1rem;
    border-radius: 1rem;
    padding: .5rem;
    text-align: center;
    transition: transform .2s ease, border-color .3s ease;
    letter-spacing: .1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid transparent;
}

.nav-link:hover {
    border: .1rem solid var(--white);
    /* transition: .2s ease; */
}

.exploreGadgets-link {
    color: var(--white);
    background: linear-gradient(120deg, var(--purple-light), var(--red-light), var(--yellow-light), var(--green-light));
    box-shadow: .1rem .1rem rgb(0, 0, 0);
    transition: background 0.5s ease, border 0.5s ease, transform 0.2s ease, border-color 0.1s ease;
    background-size: 200% 200%;
    animation: gradientAnimation 5s ease infinite;
    /* animation-play-state: paused; */
    animation-play-state: running;

}

.exploreGadgets-link:hover {}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.nav-link:active {
    transform: scale(0.9);
}

/* .active-link {
        /* font-weight: 800; */
/* color: #00b351; */
/*}  */
</style>
