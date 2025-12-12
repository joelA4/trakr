<script setup>
import { defineEmits, ref, watch, computed } from 'vue'

    // const localWallet = ref({}) //Ya la declare de nuevo abajo

    const props = defineProps({
        modelValue: Boolean,
        wallet: Object
    })

    //Cuando el props.wallet cambia, clonamos el local
    watch(
        () => props.wallet,
        (newWallet) => {
            if (newWallet) {
                localWallet.value = { ...newWallet }
            }
        },
        { immediate: true }
    )

    // function saveChanges() {
    //     emit('save', { ...localWallet.value })
    //     console.log('Guardando cambios', localWallet.value)
    //     emit('update:modelValue', false )
    // }

    const emit = defineEmits(['update:modelValue', 'save'])

    const localWallet = ref({ id: null, name: '', balance: 0 })

    // cuando props.wallet cambia, clonamos al local
    watch(
        () => props.wallet,
        (w) => {
            if (w) {
                localWallet.value = { ...w }
            } else {
                localWallet.value = { id: null, name: '', balance: 0 }
            }
        },
        { immediate: true }
    )

    //Errores Calculados por cambios: errors Es un computed que verifica los campos y devuelve mensajes
    const errors = computed(() => { 
        const e = {}
        const name = localWallet.value.name
        const balance = localWallet.value.balance

        if (!name || !String(name).trim() ){
            e.name = 'El nombre no puede quedar vacio.'
        }

        if (balance === '' || balance === null || isNaN(Number(balance))) {
            e.balance = 'El saldo debe ser un numero.'
        } else if (Number(balance) < 0){
            e.balance = 'El saldo no puede ser negativo.'
        }

        return e
    })

    //validez global: depende de errors
    const isValid = computed(() => Object.keys(errors.value).length === 0)

    function saveChanges() { //Guarda cambios: emite 'save' solo si todo es valido y cierra el modal
        if (!isValid.value) return
        emit('save', { ...localWallet.value})
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
                    <input v-model="localWallet.name" type="text" /> <br/> 
                </label>
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
                <label>
                    Balance: 
                    <input v-model.number="localWallet.balance" type="number" />
                </label>
                <p v-if="errors.balance" class="error">{{ errors.balance }}</p> <!--Dar formato de error-->

                <div style="margin-top: 1rem; display: flex; gap: 10px;">
                    <button type="submit" :disabled="!isValid" >Guardar</button><!--El boton se deshabilita si isValid es falso-->
                    <button type="button" @click="close">Cancelar</button>
                </div>

            </form>
            <!-- Boton para cerrar -->
        <!--<button @click="emit('update:modelValue', false)">Cerrar</button>-->
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
