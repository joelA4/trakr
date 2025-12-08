<script setup>
    defineProps({
        show: {
            type: Boolean,
            default:false
        }
    })
    const emit = defineEmits(['close'])
</script>

<template>
    <div v-if="show" class="modal-backdrop">
        <div class="modal-content">
            <h2>Nueva Transaccion</h2>

            <p>Aqui iria el form despues.</p>

            <button @click="emit('close')">Cerrar</button>
        </div>
    </div>
</template>

<style scoped>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 12px;
        width: 300px;
    }
</style>
