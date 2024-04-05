import { createWebHistory, createRouter } from "vue-router";
import BookView from "@/views/BookView.vue";
const routes = [
    {
        path: "/",
        name: "bookview",
        component: BookView,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;