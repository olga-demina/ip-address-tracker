<script setup>
import { onMounted, reactive } from 'vue';
import { computed } from '@vue/reactivity';

import Searchbar from './components/Searchbar.vue';
import IpInfoBlock from './components/LocationInfoBlock.vue';
import LocationMap from './components/LocationMap.vue';

import useFetch from './hooks/use-fetch';

const env = import.meta.env;


const state = reactive({
  ip: "",
  location: {
    city: "",
    country: "",
    geonameId: "",
    lat: 0,
    lng: 0,
    postalCode: "",
    region: "",
    timezone: "",
  },
  isp: "",
  // ip: "93.55.85.5",
  // isp: "Fastweb SpA",
  // location: {
  //   city: "Simonetta",
  //   country: "IT",
  //   geonameId: 12022946,
  //   lat: 45.4911,
  //   lng: 9.16707,
  //   postalCode: "",
  //   region: "Lombardia",
  //   timezone: "+02:00",
  // }
});

const locationTxt = computed(() => {
  return `${state.location.city}, ${state.location.region} ${state.location.postalCode}`;
})

onMounted(async () => {
  await getUserIp();
});

async function getUserIp() {
  const params = {
    apiKey: env.VITE_GEO_IPFY_API_KEY,
    ipAddress: state.ip ? state.ip : ""
  }
  const { response, error, fetchData } = useFetch("https://geo.ipify.org/api/v2/country,city", params);
  await fetchData();
  state.ip = response.value.ip;
  state.location = response.value.location;
  state.isp = response.value.isp;
}

async function changeIp(newIp) {
  state.ip = newIp
  await getUserIp();
}
</script>

<template>
  <header>
    <h1>IP Address Tracker</h1>
    <Searchbar :userIp="state.ip" @search="changeIp" />
    <IpInfoBlock :ipAddress="state.ip" :location="locationTxt" :timezone="state.location.timezone" :isp="state.isp" />
  </header>
  <section class="map-section">
    <LocationMap v-if="state.location.lat && state.location.lng" :lat="state.location.lat" :lng="state.location.lng" />
  </section>
</template>

<style scoped>
header {
  background-image: url("@/assets/images/pattern-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
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
