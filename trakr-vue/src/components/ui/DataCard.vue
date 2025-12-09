<script setup>
    defineProps({
        title: String,
        value: [String, Number]
    })
</script>

<template>
    <div class="data-card">
        <h3>{{ title }}</h3>
        <p>{{ value }}</p>
    </div>
</template>

<style scoped>

</style>
