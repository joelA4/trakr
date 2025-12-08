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
    <Button :class="variant">
        {{ label }}
    </Button>
</template>

<style scoped>

</style>
