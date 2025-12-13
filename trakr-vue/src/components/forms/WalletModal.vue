<script setup>
    import { ref, computed } from 'vue'
    import { useWalletsStore } from '@/stores/wallets';
    import Button from '../ui/Button.vue';

    
    const isOpen = defineModel() //Esto non lo tengo del todo claro
    
    const walletsStore = useWalletsStore()
    
    const emit = defineEmits(['update:modelValue','create'])
    
    const props = defineProps({
        modelValue: Boolean
    })
    
//Funcion de crar antes de las validaciones
    // function createWallet() {
    //     if (!title.value) return 
    //     emit('create', {name: title.value, balance: Number(balance.value) })
    //     title.value = ''
    //     balance.value = 0
    //     isOpen.value = false
    // }
    
    const name =  ref('')
    const balance = ref(0)

    const local = ref({ name, balance}) //Lo hago asi para poder usar las validaciones en lo que descubro como hacerlo
    //Tanto aqui como en el template uso el local.value para entrar al valor de las variables (En lo que lo resuelvo)
    const errors = computed(() => {
        const e = {}
        if (!local.value.name || !String(local.value.name).trim()) { //usamos el trim para evitar que hayan nombres con espacios
            e.name = 'El nombre no puede quedar vacio. '
        }
        if (local.value.balance === '' || local.value.balance === null || isNaN(Number(local.value.balance))) {
            e.balance = 'El saldo debe de ser un numero.'
        } else if ( Number(local.value.balance) < 0 ){
            e.balance = 'El saldo no puede ser negativo.'
        }

        return e
    })

    const isValid = computed(() => Object.keys(errors.value).length === 0)
    
    function createWallet() {
        if (!isValid.value) return //Guardamos directamente en pinia
        walletsStore.addWallet({ name: name.value, balance: balance.value})
        // emit('create', { id: Date.now(), name: local.value.name.trim(), balance: Number(local.value.balance) })

        local.value = { name: '', balance: 0} //Restablece la variable local 
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
                    <input v-model="local.name" type="text"/> <br/>
                </label>
                <p v-if="errors.name" class="error">{{ errors.name }}</p>

                <label>
                    Balance
                    <input v-model="local.balance" type="number" step="0.01" />
                </label>
                <p v-if="errors.balance" class="error">{{ errors.balance }}</p>
                <!-- <input v-model="title" placeholder="nombre de la cartera" />
                <input v-model="balance" type="number" placeholder="saldo inicial" /> primer form -->
                <div style="margin-top: 1rem; display: flex; gap: 8px;">
                    <!-- <Button label="Guardar" variant="primary" @click="createWallet" />
                    <Button label="Cancelar" variant="secundary" @click="isOpen = false" /> -->
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
