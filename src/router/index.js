import { createWebHistory, createRouter } from "vue-router";
import ListBoard from "/src/components/ListBoard.vue";
import ReadBoard from "/src/components/ReadBoard.vue";
import CreateBoard from "/src/components/CreateBoard.vue";

const routes = [
    {path: "/", component: ListBoard},
    {path: "/board/:id", component: ReadBoard},
    {path: "/create", component: CreateBoard},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;