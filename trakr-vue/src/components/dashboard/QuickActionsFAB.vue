<script setup>
    const emit = defineEmits(['open-transaction-modal'])

    function handleClick() {
        emit('open-transaction-modal')
    }
</script>

<template>
    <button class="fab" @click="handleClick">
        +
    </button>
</template>

<style scoped>
    .fab {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        font-size: 32px;
    }
</style>
