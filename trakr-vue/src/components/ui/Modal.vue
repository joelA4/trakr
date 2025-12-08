<script setup>
    const props = defineProps({
        show: Boolean
    })

    const emit = defineEmits(['close'])

    const close = () => emit('close')
</script>

<template>
    <div v-if="show" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 45);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-content{
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        min-width: 300px;
    }
</style>
