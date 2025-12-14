<script setup>
    import { useTransactionsStore } from '@/stores/transactions'
    import TransactionForm from './TransactionForm.vue';
    import { computed } from 'vue'
    import { useWalletsStore } from '@/stores/wallets'

    const walletsStore = useWalletsStore()

    const wallets = computed(() => walletsStore.wallets)

    const transactionsStore = useTransactionsStore()
    
    const emit = defineEmits(['close']) //funcion para cerrar modal

    defineProps({
        show: {
            type: Boolean,
            default:false
        }
    })

    const onSave = (transactionData) => {
        transactionsStore.addTransaction(transactionData)
        emit = defineEmits(['close'])
    }

    //Intento
</script>

<template>
    <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
        <div class="modal-content">

            <h2 class="modal-content2">Nueva Transaccion</h2>
            
            <TransactionForm :wallets="wallets" @save="onSave" />

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
        border-radius: 12px;
        width: 300px;
    }
    .modal-content2{
        margin: 30px;
    }
</style>
