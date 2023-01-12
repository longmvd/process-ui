import { createRouter, createWebHistory } from "vue-router";

import UserPage from '@/pages/UserPage';
import IncomingPage from '@/pages/IncomingPage';

const routes = [
    {path: '/', component: UserPage},
    {path: '/users', component: UserPage},
    {path: '/:pathMatch(.*)*', component: IncomingPage},

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router