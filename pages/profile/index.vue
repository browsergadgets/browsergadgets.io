<template>
  <div>

    <section>


      <h1 class="w-fit">Hello {{ displayName ? displayName : 'Buddy' }} 👋</h1>

      <button class="logoutButton red-bg"
              @click="signOut">
        <Icon icon="material-symbols:logout-rounded"
              width="30"
              height="30"
              class="mr-2" />
        <span>Logout</span>
      </button>

    </section>


  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';


definePageMeta({
  middleware: ['auth']
});

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const displayName = ref('')

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}

onMounted(() => {
  console.log(user.value);

  watchEffect(async () => {
    if (!user.value) {
      navigateTo('/',)
    }
    else {
      displayName.value = user.value.user_metadata.display_name


      // const { data, error } = await supabase.from('')

      // console.log("data", data);
        

    }
  })
})

</script>

<style>

.logoutButton{
  display: flex;
  align-items: center;
  width: fit-content;
  color: white;
}


</style>