<script setup>
    defineProps({
        type: {
            type: String,
            default: 'info' // info | success | error | warning
        },
        message: String
    })
</script>

<template>
    <div :class="`alert alert-${type}`">
        {{ message }}
    </div>
</template>

<style scoped>

</style>