<script setup>
    import { ref } from 'vue'

    import NavigationBar from './NavigationBar.vue'
    import SideMenu from './SideMenu.vue'
    import QuickActionsFAB from '../dashboard/QuickActionsFAB.vue'
    import TransactionModal from '../forms/TransactionModal.vue';

    // Aqui manejaremos el estado del modal despues 
    const showModal = ref(false)

    function onOpenTransactionModal() {
        showModal.value = true
    }

    function onCloseModal(){
        showModal.value = false
    }

</script>

<template>
    <div class="layout">
        <navigationBar />

        <div class="layuot-body">
            <SideMenu />

            <main class="layout-content">
                <RouterView />
            </main>
        </div>

        <QuickActionsFAB @open-transaction-modal="onOpenTransactionModal" />

        <TransactionModal :show="showModal" @close="onCloseModal" />
    </div>
</template>

<style scoped>

</style>