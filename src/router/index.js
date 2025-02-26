import { createWebHistory, createRouter } from "vue-router";
import ListBoard from "../components/ListBoard.vue";
import ReadBoard from "../components/ReadBoard.vue";
import CreateBoard from "../components/CreateBoard.vue";
import ListComment from "../components/ListComment.vue";
import CreateComment from "../components/CreateComment.vue";

const routes = [
    {path: "/", component: ListBoard},
    {path: "/read/:id", component: ReadBoard},
    {path: "/create_board", component: CreateBoard},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;