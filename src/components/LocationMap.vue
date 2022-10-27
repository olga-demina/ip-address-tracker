<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, ref, watch } from "vue";

const props = defineProps(["lat", "lng"]);
const map = ref({});

onMounted(() => {
    initMap();
    setMapLocation();
})

watch(props, () => {
    setMapLocation();
});

function initMap() {
    map.value = L.map("map");
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
}

function setMapLocation() {
    console.log("setting map location");
    if (map.value) {
        map.value.setView([props.lat, props.lng], 13);
        const myIcon = L.icon({
            iconUrl: '/src/assets/images/icon-location.svg',
        });
        L.marker([props.lat, props.lng], { icon: myIcon }).addTo(map.value);
    }
}
</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
    height: 100%;
}
</style>