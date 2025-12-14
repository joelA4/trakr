<script setup>
    import Button from '../ui/Button.vue'
    import { ref } from 'vue'

    const props = defineProps({
        wallets: {
            type: Array,
            requiered: true
        }
    })

    const emit = defineEmits(['save'])

    const amount = ref('')
    const date = ref('')
    const type = ref('expense')
    const walletId = ref(null)
    

    const onSubmit = () => {
        emit('save', {
            amount: Number(amount.value),
            date: date.value,
            type: type.value,
            walletId: walletId.value
        })
    }
</script>

<template>
    <form action="">
        <!-- Wallet id -->
        <select v-model="walletId" required>
            <option disabled value="">Selecciona una cartera </option>
            <option 
                v-for="wallet in wallets"
                :key="walletId"
                :value="wallet.id"
            >
            {{ wallet.name }}
            </option>
        </select><br>
        
        <!-- Tipo -->
         <select v-model="type">
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
         </select> <br>

         <!-- monto -->
          <input 
          type="number"
          v-model="amount"
          placeholder="Monto"
          required
          /> <br>

          <!-- Fecha -->
           <input 
           type="date"
           v-model="date"
           required
           /> <br/>
    </form>

    <div class="button-conteiner">
        <Button label="Guardar" variant="secundary" @click="onSubmit"/>
    </div>
</template>

<style scoped>
.button-conteiner{
background: rgb(247, 247, 255);
display: grid;
align-items: center;
justify-content: center;
border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
border: 1px solid rgb(142, 142, 247);
height: 28px;
width: 99%;
}

</style>
