import { createRouter, createWebHistory } from "vue-router";

import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import Budgeting from '../views/Budgeting.vue'
import Reports from '../views/Reports.vue'
import Settings from '../views/Settings.vue'

const routes = [
    { path: '/', redirect: 'dashboard' },
    { path: '/dashboard', component: Dashboard },
    { path: '/transactions', component: Transactions },
    { path: '/budgeting', component: Budgeting },
    { path: '/reports', component: Reports },
    { path: '/settings', component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes
}) 

export default router