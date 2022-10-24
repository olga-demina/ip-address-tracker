<script setup>
import { onMounted, reactive } from 'vue';

const state = reactive({
  ip: "",
  location: {}
});

onMounted(() => {
  getUserIp();
});

async function getUserIp() {
  const params = {
    apiKey: "at_g3naFAGd8HRTmapbconMMbXQqODZV",
    ipAddress: ""
  }
  const url = new URL("https://geo.ipify.org/api/v2/country,city");
  for (let key in params) {
    url.searchParams.append(key, params[key]);
  }
  const ipData = await (await fetch(url)).json();
  state.ip = ipData.ip;
  state.location = ipData.location;
}

</script>

<template>
</template>

<style scoped lang="scss">

</style>
