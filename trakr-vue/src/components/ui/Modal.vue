<script setup>
    const props = defineProps({
        show: Boolean
    })

    const emit = defineEmits(['close'])

    const close = () => emit('close')
</script>

<template>
    <div></div>
</template>

<style scoped>

</style>
