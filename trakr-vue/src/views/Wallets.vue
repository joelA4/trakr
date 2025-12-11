<script setup>
    import { ref } from 'vue'
    import DataCard from '@/components/ui/DataCard.vue'
    import Button from '@/components/ui/Button.vue'
    import WalletModal from '@/components/forms/WalletModal.vue'
    import EditWalletModal from '@/components/modals/EditWalletModal.vue'
    
    //Lista de carteras (por ahora simulada)
    const wallets = ref([
        { id: 1, name: 'Efectivo', balance: 350 },
        { id: 2, name: 'Banco Capital One', balance: 500 },
    ])

    const showModal = ref(false)

    const editingWallet = ref(null)
    const showEditModal = ref(false)

    function startEdit(wallet) {
        editingWallet.value = wallet
        showEditModal.value = true
    }

    const applyEdit = (updateWallet)=>{
        Object.assign(editingWallet.value, updateWallet);
    }
    // function applyEdit(updateWallet){
    //     const index = wallets.value.findIndex(w => w.id === updateWallet.id)
    //     if (index !== -1) {
    //         wallets.value[index] = updateWallet
    //     }
    // }

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
             > 
            <template #actions>
                <Button label="Editar" variant="secondary" @click="startEdit(wallet)"/>
            </template>
            </DataCard>
        </div>
        <Button label="Agregar cartera" variant="primary" @click="showModal = true"/> 

        <!-- Modal -->
         <WalletModal v-model="showModal" @create="addWallet" />
         <EditWalletModal v-model="showEditModal" :wallet="editingWallet" @save="applyEdit"/>

    </div>

</template>

<style scoped>

</style>
