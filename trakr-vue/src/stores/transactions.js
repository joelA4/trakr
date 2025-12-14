import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionsStore = defineStore('transactions', () => {
    const transactions = ref([])

    const addTransaction = (transaction) => {
        transactions.value.push({
            ...transaction,
            id: Date.now()
        })
    }

    const deleteTransaction = (id) => {
        transactions,value = transactions.value.filter(t => t.id !== id)
    }

    return {
        transactions,
        addTransaction,
        deleteTransaction
    }
})