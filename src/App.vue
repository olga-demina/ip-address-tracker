<script setup>
import { onMounted, reactive } from 'vue';
import { computed } from '@vue/reactivity';

import Searchbar from './components/Searchbar.vue';
import IpInfoBlock from './components/LocationInfoBlock.vue';
import LocationMap from './components/LocationMap.vue';


const state = reactive({
  ip: "93.55.85.5",
  location: {},
  isp: "",
  map: ""
});

const location = computed(() => {
  return `${state.location.city}, ${state.location.region} ${state.location.postalCode}`;
})

onMounted(async () => {
  console.log("mount");
  await getUserIp();
});

async function getUserIp() {
  console.log("getting location");
  const params = {
    apiKey: "at_g3naFAGd8HRTmapbconMMbXQqODZV",
    ipAddress: state.ip ? state.ip : ""
  }
  const url = new URL("https://geo.ipify.org/api/v2/country,city");
  for (let key in params) {
    url.searchParams.append(key, params[key]);
  }
  const ipData = await (await fetch(url)).json();
  console.log(ipData);
  state.ip = ipData.ip;
  state.location = ipData.location;
  console.log(state.location);
}



async function changeIp(newIp) {
  console.log("changeIp", newIp);
  state.ip = newIp
  await getUserIp(); 
}
</script>

<template>
  <Searchbar :userIp="state.ip" @search="changeIp" />
  <IpInfoBlock :ipAddress="state.ip" :location="location" :timezone="state.location.timezone" :isp="state.isp" />
  <LocationMap v-if="state.location.lat && state.location.lng" :lat="state.location.lat" :lng="state.location.lng" />
</template>

<style scoped lang="scss">
#map {
  height: 500px;
}
</style>
