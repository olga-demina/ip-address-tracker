<script setup>
import { ref } from 'vue';

const props = defineProps(["userIp"]);

const ipToSearch = ref(props.userIp);

const emit = defineEmits(["search"]);

function startSearch() {
    emit('search', ipToSearch.value.trim());
}

</script>

<template>
    <div>
        <input @keyup.enter="startSearch" type="text" v-model="ipToSearch">
        <button @click="startSearch">></button>
    </div>
</template>

<style lang="scss" setup>
</style>