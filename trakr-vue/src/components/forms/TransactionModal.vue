<script setup>
    import { useTransactionsStore } from '@/stores/transactions'
import TransactionForm from './TransactionForm.vue';

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
</script>

<template>
    <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
        <div class="modal-content">
            <h2 class="modal-content2">Nueva Transaccion</h2>

            <p class="modal-content2">Aqui iria el form despues.</p>

            <TransactionForm @save="onSave" />

            <!-- boton para cerrar el modal-content -->
           <!-- <button @click="emit('close')">Cerrar</button>  --> 
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
