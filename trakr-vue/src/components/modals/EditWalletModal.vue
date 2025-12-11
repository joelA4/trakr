<script setup>
    import { defineProps, defineEmits, ref, watch } from 'vue'

    const localWallet = ref({})

    const props = defineProps({
        modelValue: Boolean,
        wallet: Object
    })

    watch(
        () => props.wallet,
        (newWallet) => {
            if (newWallet) {
                localWallet.value = { ...newWallet }
            }
        },
        { immediate: true }
    )

    function saveChanges() {
        emit('save', { ...localWallet.value })
        console.log('Guardando cambios', localWallet.value)
        emit('update:modelValue', false )
    }

    const emit = defineEmits(['update:modelValue', 'save'])
</script>

<template>
    <div  v-if="modelValue" class="modal" @click.self="emit('update:modelValue', false)">
        <div class="modal-content" >
            <h2>Editar cartera</h2>
    
            <form @submit.prevent="saveChanges">
                <label>
                    Nombre:
                    <input v-model="localWallet.name" type="text" /> <br/>
                </label>

                <label>
                    Balance: 
                    <input v-model.number="localWallet.balance" type="number" />
                </label>

                <div style="margin-top: 1rem; display: flex; gap: 10px;">
                    <button type="submit" >Guardar</button>
                    <button type="button" @click="emit('update:modelValue', false)">Cancelar</button>
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
        background: rgba(0, 0, 0, 01.5); /* Fondo oscuro*/
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        width: 90%;
        max-width: 400px;
    }

</style>
