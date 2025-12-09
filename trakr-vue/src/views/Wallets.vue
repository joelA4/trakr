<script setup>
    import DataCard from '@/components/ui/DataCard.vue'
    import Button from '@/components/ui/Button.vue'
</script>

<template>
    <h1>Carteras</h1>

    <DataCard tittle="Efectivo" value="$350" />
    <DataCard tittle="Banco Capital one" value="$350" />
    <DataCard tittle="Ahorros" value="$1050" />

    <Button label="Agregar cartera" variant="primary" />
</template>

<style scoped>

</style>
