<script setup>
    import { useTransactionsStore } from '@/stores/transactions'

    const transactionStore = useTransactionsStore().addTransaction
    
    const emit = defineEmits(['open-transaction-modal'])

    function handleClick(data) {
        useTransactionsStore.addTransaction({
            ...data,
            walletId:currentWalletId
        })
    }
</script>

<template>
    <button class="fab" @click="handleClick" >
        +
    </button>
</template>

<style scoped>
    .fab {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        font-size: 32px;
    }
</style>
