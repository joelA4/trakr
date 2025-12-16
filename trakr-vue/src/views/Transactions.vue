
<script setup>

    import { useTransactionsStore } from '@/stores/transactions'

    const transactionsStore = useTransactionsStore() 
    
    const walletTransactions = computed(() => {
        return transactionsStore.transactionByWallet(walletId)
    })
    
</script>

<template>
    <h1>Transactions</h1>
    
    <HistoryItem
    v-for="transaction in walletTransactions"
    :key="transaction.id"
    :transaction="transaction"
    />
    
</template>

<style scoped>

</style>
