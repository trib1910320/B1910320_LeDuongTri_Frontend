import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import { useAuthStore } from '@/stores/store';

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true ,// Truyền các biến trong $route.params vào làm props
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: "/add_contact", 
        name: "contact.add", 
        component: () => import("@/views/ContactAdd.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/account",
        name: "account",
        component: () => import("@/views/Account.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!authStore.login) {
            next({ name: 'account' })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router;
