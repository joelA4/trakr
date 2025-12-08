<script setup>
    defineProps({
        label: String,
        variant: {
            type: String,
            default: 'primary'
        }
    })
</script>

<template>
    <button :class="variant">
        {{ label }}
    </button>
</template>

<style scoped>

</style>
