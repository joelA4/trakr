<script setup>
    import { computed, ref } from 'vue'
    import DataCard from '@/components/ui/DataCard.vue'
    import Button from '@/components/ui/Button.vue'
    import WalletModal from '@/components/forms/WalletModal.vue'
    import EditWalletModal from '@/components/modals/EditWalletModal.vue'
    import { useWalletsStore } from '@/stores/wallets'
    import { useTransactionsStore } from '@/stores/transactions'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const transactionsStore = useTransactionsStore() 
    const walletsStore = useWalletsStore()
    
    const walletId = Number(route.params.id)
    
    //Lista de carteras: llamadas desde el stores
    const wallets = computed(()  => walletsStore.wallets)

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

    function addWallet(newWallet) {
        walletsStore.addWallet(newWallet)
    }

    const onDelete = (id) => {
        if (confirm('Quieres eliminar esta carterta?')){
            walletsStore.deleteWallet(id)
        }
    }

    const walletTransactions = computed(() => {
        return transactionsStore.transactionByWallet(walletId)
    })
    
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
                <Button label="Editar" variant="secondary" @click="startEdit(wallet)" />
                <Button label="Eleminar" variant="secondary" @click="onDelete" />
            </template>
            </DataCard>
        </div>
        <Button label="Agregar cartera" variant="primary" @click="showModal = true"/> 

        <!-- Modal -->
         <WalletModal v-model="showModal" @create="addWallet" />
         <EditWalletModal v-model="showEditModal" :wallet="editingWallet" @save="applyEdit"/>
        </div>

        <HistoryItem
        v-for="transaction in walletTransactions"
        :key="transaction.id"
        :transaction="transaction"
        />

</template>

<style scoped>

</style>
