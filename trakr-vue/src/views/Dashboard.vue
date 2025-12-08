<script setup>
    import Button from '../components/ui/Button.vue'
    import DataCard from '../components/ui/DataCard.vue'
    import AlertMessage from '../components/ui/AlertMessage.vue'
</script>

<template>
    <h1>Dashboard</h1>

    <AlertMessage type="success" message="Todo esta funcando bien" />

    <DataCard tittle="Balance Total" value="$12,450" />

    <Button label="Agregar Transaccion" variant="primary" />
</template>

<style scoped>

</style>
