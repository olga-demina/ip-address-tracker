<script setup>
import { ref } from 'vue';

const props = defineProps(["userIp"]);
const ipToSearch = ref(props.userIp);
const emit = defineEmits(["search"]);

function startSearch() {
    const isIp = validateIpAddress(ipToSearch.value.trim());
    emit('search', {"needle": ipToSearch.value.trim(), isIp});
}

function validateIpAddress(value) {
    if(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(value)) {
        return true;
    }
    return false;
}


</script>

<template>
    <div class="search-box">
        <input @keyup.enter="startSearch" type="text" v-model="ipToSearch" placeholder="Search for any IP address or domain">
        <button @click="startSearch">&rsaquo;</button>
    </div>
</template>

<style scoped>
.search-box {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
}

.search-box input {
    color: var(--very-dark-gray);
    font-size: 1.8rem;
    padding: 1rem 1.5rem;
    border-radius: 10px 0 0 10px;
    border: 0;
    min-width: 30%;
}

.search-box input:focus-visible {
    outline: 0;
    border: 1px solid var(--dark-gray);
}

.search-box button {
    border: 0;
    font-size: 2rem;
    padding: .8rem 1.5rem;
    border-radius: 0 10px 10px 0;
    color: white;
    background-color: var(--very-dark-gray);
    cursor: pointer;
    transition: all .2s linear;
}

.search-box button:hover {
    background-color: var(--dark-gray);
}
</style>