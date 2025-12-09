<script setup>
    import { ref } from 'vue'
    import Button from '../ui/Button.vue';

    const isOpen = defineModel()
    const title = ref('')
    const balance = ref(0)

    const emit = defineEmits(['create'])

    function createWallet() {
        if (!title.value) return 
        emit('create', {name: title.value, balance: Number(balance.value) })
        title.value = ''
        balance.value = 0
        isOpen.value = false
    }
</script>

<template>
    <div v-if="isOpen" class="modal-backdrop">
        <div class="modal">
            <h2>Nueva cartera</h2>

            <input v-model="title" placeholder="nombre de la cartera" />
            <input v-model="balance" type="number" placeholder="saldo inicial" />

            <Button label="Guardar" variant="primary" @click="createWallet" />
            <Button label="Cancelar" variant="secundary" @click="isOpen = false" />

        </div>

    </div>
</template>

<style scoped>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: #0004;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        width: 300px;
        display: grid;
        gap: 1rem;
    }
</style>
