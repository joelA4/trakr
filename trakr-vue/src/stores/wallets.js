    import { defineStore } from 'pinia'
    import { ref } from 'vue'
     
    export const useWalletsStore = defineStore('wallets', () => { //Estado global, aqui van todas las wallets
        const wallets = ref([
            {id: 1, name: 'Cash', balance: 120}
        ])
        
        const addWallet = (wallet) => {
            const newWallet = {
                ...wallet,
                id:Date.now()
            }
            wallets.value.push(newWallet)
        }
        
        const updateWallet = (id, updateData) => {
            const index = wallets.value.findIndex(w => w.id === id)
            if (index !== -1) {
                wallets.value[index] = { ...wallets.value[index], ...updateData}
            }
        } 
        
        const deleteWallet = (id) =>{
            wallets.value = wallets.value.filter(w => w.id !== id)
        }
        
        return {
            wallets,
            addWallet,
            updateWallet,
            deleteWallet
        }  
    })

    //falta agregar el DELETE