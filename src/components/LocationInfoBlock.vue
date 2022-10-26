<script setup>
const props = defineProps(["ipAddress", "location", "timezone", "isp"]);

</script>

<template>
    <div class="info-box">
        <div class="info-item">
            <h3>ip address</h3>
            <p>{{ props.ipAddress }}</p>
        </div>
        <div class="info-item">
            <h3>location</h3>
            <p>{{ props.location }}</p>
        </div>

        <div class="info-item">
            <h3>timezone</h3>
            <p>UTC {{ props.timezone }}</p>
        </div>

        <div class="info-item">
            <h3>isp</h3>
            <p>{{ props.isp }}</p>
        </div>

    </div>
</template>

<style scoped>
.info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, .2);
}

.info-item {
    flex-grow: 1;
    padding-left: 2rem;
    text-align: center;
    margin-bottom: 2rem;
}


.info-item h3 {
    text-transform: uppercase;
    font-size: 1rem;
    color: var(--dark-gray);
    letter-spacing: 2px;
    margin-bottom: .8rem;
}

.info-item p {
    font-size: 2rem;
    font-weight: 500;
}


@media screen and (min-width: 768px) {
    .info-box {
        flex-direction: row;
        padding: 3rem 2rem 2rem 0rem;
    }
    .info-item:not(:last-child) {
        border-right: 1px solid var(--dark-gray);
    }

}
</style>