<template>
  <div class="flex flex-col items-center p-10 py-20 mt-10 w-full min-h-screen">

    <h1 class="">An Awesome Community of Extension Enthusiasts!</h1>


    <section class="flex my-28 p-5 px-10 justify-center items-center">


      <section class="communitySpecificSections discordCommunity">

        <h2>Wanna chat? We have Discord!</h2>
        <a href="https://discord.gg/MeMA7SFxtW"
           class="socialCommunityLinks discordLink"
           target="_blank">
          <Icon icon="ic:baseline-discord"
                :ssr="true"
                class="mr-4" /> Join Discord
        </a>
      </section>
      <section class="communitySpecificSections redditCommunity">

        <h2>Wanna Redd-it? We have Reddit!</h2>
        <a href="https://www.reddit.com/r/browserextensions/"
           class="socialCommunityLinks redditLink"
           target="_blank">
          <Icon icon="ic:baseline-reddit"
                :ssr="true"
                class="mr-4" /> Join Reddit
        </a>
      </section>
    </section>



  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>

<style scoped>
h1 {
  font-size: 6rem;
  text-shadow: 0.3rem 0.3rem rgba(8, 8, 8, 0.745);
  color: var(--yellow);
  font-weight: 900;
  text-align: center;
  /* background: linear-gradient(90deg, var(--green), var(--yellow)); */
  /* -webkit-background-clip: text; */
  /* color: transparent; */
}
h2{
  font-size: 3rem;
  text-shadow: .1rem .1rem rgb(8, 8, 8);
  font-weight: 900;
  text-align: center;
}

.communitySpecificSections{
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  
  padding: 2rem;
  margin-top: 2rem;
}
.socialCommunityLinks {
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: fit-content;
  color: white;
  padding: 1.2rem;
  margin-block: 1.2rem;
  border-radius: 1rem;
  font-weight: 800;
  font-size: 2rem;
  /* text-shadow: .15rem .15rem rgb(0, 0, 0); */
  box-shadow: .2rem .2rem rgb(7, 7, 7);
  transition: .2s ease;
}

.discordCommunity h2 {
  color: #5865F2;
}
.redditCommunity {
  /* align-items: end; */
}
.redditCommunity h2 {
  color: #FE4400;
  /* text-align: right; */
}



.socialCommunityLinks:active {
  transform: scale(.95);
}
.socialCommunityLinks svg {
  width: 2.5rem;
  height: 2.5rem;
}


.discordLink {
  background-color: #5865F2;
}
.discordLink:hover {
  background-color: #4755f1;
}

.redditLink {
  background-color: #FE4400;
}
.redditLink:hover {
  background-color: #e44105;
}
</style>