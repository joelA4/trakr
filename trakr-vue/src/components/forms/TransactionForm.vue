<script setup>
import Button from '../ui/Button.vue'
import { ref } from 'vue'

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
