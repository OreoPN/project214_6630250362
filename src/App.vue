<template>
  <div>
    <MainMenu />
    <router-view />
  </div>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";

export default {
  components: { MainMenu }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  background-color: #E9F8E1;
  font-family: "Prompt", sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
}
</style>
