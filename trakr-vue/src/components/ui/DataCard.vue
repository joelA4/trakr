<script setup>
    defineProps({
        tittle: String,
        value: [String, Number]
    })
</script>

<template>
    <div class="data-card">
        <h3>{{ tittle }}</h3>
        <p>{{ value }}</p>
    </div>
</template>

<style scoped>

</style>
