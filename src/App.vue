<script setup>
import { onMounted, reactive } from 'vue';
import { computed } from '@vue/reactivity';

import Searchbar from './components/Searchbar.vue';
import IpInfoBlock from './components/LocationInfoBlock.vue';
import LocationMap from './components/LocationMap.vue';

const env = import.meta.env;


const state = reactive({
  ip: "93.55.85.5",
  // location: {},
  location: {
    city: "Simonetta",
    country: "IT",
    geonameId: 12022946,
    lat: 45.4911,
    lng: 9.16707,
    postalCode: "",
    region: "Lombardia",
    timezone: "+02:00",
  },
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
    apiKey: env.VITE_GEO_IPFY_API_KEY,
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
  state.isp = ipData.isp;
  console.log(state.location);
}

async function changeIp(newIp) {
  console.log("changeIp", newIp);
  state.ip = newIp
  await getUserIp();
}
</script>

<template>
  <header>
    <h1>IP Address Tracker</h1>
    <Searchbar :userIp="state.ip" @search="changeIp" />
    <IpInfoBlock :ipAddress="state.ip" :location="location" :timezone="state.location.timezone" :isp="state.isp" />
  </header>
  <section class="map-section">
    <LocationMap v-if="state.location.lat && state.location.lng" :lat="state.location.lat" :lng="state.location.lng" />
  </section>
</template>

<style scoped>

header {
  background-image: url("@/assets/images/pattern-bg.png");
  padding: 2.5rem; 
  position: relative;
  height: var(--header-height);
}

header h1 {
  color: white; 
  font-size: 3.2rem;
  text-align: center;
  margin-bottom: .8em; 
}

.map-section {
  height: calc(100vh - var(--header-height));
}

</style>
