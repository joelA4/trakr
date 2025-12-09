<script setup>
    import { ref } from 'vue'
    import DataCard from '@/components/ui/DataCard.vue'
    import Button from '@/components/ui/Button.vue'
    import WalletModal from '@/components/forms/WalletModal.vue'
    
    //Lista de carteras (por ahora simulada)
    const wallets = ref([
        { id: 1, name: 'Efectivo', balance: 350 },
        { id: 2, name: 'Banco Capital One', balance: 500 },
    ])

    const showModal = ref(false)

    function addWallet(newWallet) {
        wallets.value.push({
            id: Date.now(),
            ...newWallet
        })
    }
</script>

<template>
    <div>
        <h1>Carteras</h1>
        
        <div style="display: grid; gap: 1rem; border: 1px solid red; ">
    
            <!-- Render Dinamico -->
             <DataCard style="border: 2px solid red"
             v-for="wallet in wallets"
             :key="wallet.id"
             :title="wallet.name"
             :value="`$${wallet.balance}`"
             />
        </div>
        <Button label="Agregar cartera" variant="primary" @click="showModal = true"/> 

        <!-- Modal -->
         <WalletModal v-model="showModal" @create="addWallet" />

    </div>

</template>

<style scoped>

</style>
