<script setup>
    import { ref, watch, computed } from 'vue'
    import { useWalletsStore } from '@/stores/wallets'
    
    const walletsStore = useWalletsStore()
    const emit = defineEmits(['update:modelValue', 'save'])

    // Recibimos la wallet a editar desde el padre
    const props = defineProps({
        modelValue: Boolean,
        wallet: {
            type: Object,
            require: true
        }
    })

    // Creamos estado local para el formulario
    // Importante: Copiamos los valores, no usamos props directos
    const name = ref('')
    const balance = ref(0)

    
    //Errores Calculados por cambios: errors Es un computed que verifica los campos y devuelve mensajes
    const errors = computed(() => { 
        const e = {}
        if (!name.value || !String(name.value).trim() ){
            e.name = 'El nombre no puede quedar vacio.'
        }
        
        if (balance.value === '' || balance.value === null || isNaN(Number(balance.value))) {
            e.balance = 'El saldo debe ser un numero.'
        } else if (Number(balance.value) < 0){
            e.balance = 'El saldo no puede ser negativo.'
        }
        
        return e
    })
    
    // Cuando el props.wallet cambia, clonamos el local cargando 
    // los datos en el formulario
    watch(
        () => props.wallet,
        (newWallet) => {
            if (newWallet) {
                name.value = newWallet.name
                balance.value = newWallet.balance
            }
        },
        { immediate: true }
    )
    
    //validez global: depende de errors
    const isValid = computed(() => Object.keys(errors.value).length === 0)

    // Guardar los cambios
    const saveChanges = () => {
        walletsStore.updateWallet(props.wallet.id, {
            name: name.value,
            balance: balance.value
        })
    emit('update:modelValue', false)
    }

    function close() { //Cierra el modal
        emit('update:modelValue', false)
    }
</script>

<template> 
                <!-- Modal de editar-->
    <div  v-if="modelValue" class="modal" @click.self="close">
        <div class="modal-content" >

            <h2>Editar cartera</h2> <!--Titulo-->
    
            <form @submit.prevent="saveChanges" novalidate>

                <label>
                    Nombre: 
                    <input v-model="name" type="text" /> <br/> 
                </label>
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
                <label>
                    Balance: 
                    <input v-model.number="balance" type="number" />
                </label>
                <p v-if="errors.balance" class="error">{{ errors.balance }}</p> <!--Dar formato de error-->

                <div style="margin-top: 1rem; display: flex; gap: 10px;">
                    <button type="submit" :disabled="!isValid" >Guardar</button><!--El boton se deshabilita si isValid es falso-->
                    <button type="button" @click="close">Cancelar</button>
                </div>

            </form>
        </div>
    </div>
</template>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        inset: 0;
        background: rgba(0, 0, 0, 0.45); /* Fondo oscuro*/
        display: flex;
        justify-content: center;
        align-items: center;
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
