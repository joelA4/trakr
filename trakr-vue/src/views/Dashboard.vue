<script setup>
    import { ref } from 'vue'

    import Button from '../components/ui/Button.vue'
    import DataCard from '../components/ui/DataCard.vue'
    import AlertMessage from '../components/ui/AlertMessage.vue'
    import Modal from '../components/ui/Modal.vue'

    const showModal = ref(false)
</script>

<template>
    <h1>Dashboard</h1>

    <AlertMessage type="success" message="Todo esta funcando bien" />

    <DataCard title="Balance Total" value="$12,450" />

    <Button label="Agregar Transaccion" variant="primary" />

    <Button label="Abrir Modal" @click="showModal = true" />
    
    <Modal :show="showModal" @close="showModal = false">
        <h2>Hola desde el Modal 🎉 </h2>
        <Button label="cerrar" @click="showModal = false" variant="secondary" />
    </Modal>
</template>

<style scoped>

</style>
