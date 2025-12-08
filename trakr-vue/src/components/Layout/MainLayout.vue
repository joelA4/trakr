<script setup>
    import NavigationBar from './NavigationBar.vue'
    import SideMenu from './SideMenu.vue'

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
    </div>
</template>

<style scoped>

</style>