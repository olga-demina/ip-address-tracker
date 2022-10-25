<script setup>
const props = defineProps(["ipAddress", "location", "timezone", "isp"]);

</script>

<template>
    <div>
        <h3>ip address</h3>
        <p>{{ props.ipAddress }}</p>

        <h3>location</h3>
        <p>{{ props.location }}</p>

        <h3>timezone</h3>
        <p>UTC {{ props.timezone }}</p>

        <h3>isp</h3>
        <p>{{ props.isp }}</p>
    </div>
</template>

<style lang="scss" scoped>

</style>