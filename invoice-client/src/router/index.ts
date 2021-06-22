import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EditInvoice from '../views/EditInvoice.vue';
import Invoices from '../views/Invoices.vue';
import Invoice from '../views/Invoice.vue';
import About from '../views/About.vue';
import Wishlists from '../views/Wishlists.vue';
import EditWishlist from '../views/EditWishlist.vue';
import QuickEditWishlist from '../views/QuickEditWishlist.vue';
import Wishlist from '../views/Wishlist.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Invoices',
        component: Invoices,
    },
    {
        path: '/EditInvoice',
        name: 'Edit Invoice',
        component: EditInvoice,
    },
    {
        path: '/Invoice',
        name: 'Invoice',
        component: Invoice,
    },
    {
        path: '/EditWishlist',
        name: 'Edit Wishlist',
        component: EditWishlist,
    },
    {
        path: '/QuickEditWishlist',
        name: 'Quick Edit Wishlist',
        component: QuickEditWishlist,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/Wishlists',
        name: 'Wishlists',
        component: Wishlists,
    },
    {
        path: '/Wishlist',
        name: 'Wishlist',
        component: Wishlist,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
