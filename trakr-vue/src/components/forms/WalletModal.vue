<script setup>
    import { ref, computed, toRef } from 'vue'
    import { useWalletsStore } from '@/stores/wallets'

    const walletsStore = useWalletsStore()

    const emit = defineEmits(['update:modelValue','create'])

    const props = defineProps({
        modelValue: Boolean
    })

    const isOpen = toRef(props, 'modelValue')
    const name =  ref('')
    const balance = ref(0)

    const errors = computed(() => {
        const e = {}
        if (!name.value || !String(name.value).trim()) { //usamos el trim para evitar que hayan nombres con espacios
            e.name = 'El nombre no puede quedar vacio. '
        }
        if (balance.value === '' || balance.value === null || isNaN(Number(balance.value))) {
            e.balance = 'El saldo debe de ser un numero.'
        } else if ( Number(balance.value) < 0 ){
            e.balance = 'El saldo no puede ser negativo.'
        }

        return e
    })

    const isValid = computed(() => Object.keys(errors.value).length === 0)
    
    function createWallet() {
        if (!isValid.value) return //Guardamos directamente en pinia
        walletsStore.addWallet({ name: name.value, balance: balance.value})
        name.value = ''
        balance.value = 0 // Restablece la variable local 
        emit('update:modelValue', false) // Cierra el modal
    }

    function close() { //Cierra el modal
        emit('update:modelValue', false)
    }
</script>

<template>
    <div v-if="isOpen" class="modal-backdrop"  @click.self="close"  >
        <div class="modal">

            <h2>Nueva cartera</h2>

            <form @submit.prevent="createWallet" novalidate>

                <label>
                    Nombre
                    <input v-model="name" type="text"/> <br/>
                </label>
                <p v-if="errors.name" class="error">{{ errors.name }}</p>

                <label>
                    Balance
                    <input v-model.number="balance" type="number" step="0.01" />
                </label>
                <p v-if="errors.balance" class="error">{{ errors.balance }}</p>
                <div style="margin-top: 1rem; display: flex; gap: 8px;">
                    <button type="submit" :disabled="!isValid">Guardar</button>
                    <button type="button" @click="close">Cancelar</button> 
                </div>
            </form>                
        </div>
    </div>
</template>

<style scoped>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        width: 90%;
        max-width: 420px;
        display: grid;
        gap: 1rem;
    }
    
    .modal-content {
        background: white;
        padding: 1.2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 420px;
    }
    
    .error {
        color: #b00020;
        font-size: 0.85rem;
        margin: 0.25rem 0 0.6rem 0;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
