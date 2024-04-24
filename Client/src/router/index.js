import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/admin",
    name: "HomePageAdmin",
    component: () => import("@/views/HomePageAdmin.vue"),
  },
  {
    path: "/storesystem",
    name: "StoreSystem",
    component: () => import("@/views/StoreSystem.vue"),
  },
  {
    path: "/allproduct",
    name: "AllProduct",
    component: () => import("@/views/AllProduct.vue"),
  },
  {
    path: "/introduce",
    name: "Introduce",
    component: () => import("@/views/Introduce.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    path: "/cartStore",
    name: "Cart",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: () => import("@/views/DetailsProduct.vue"),
  },
  {
    path: "/findProduct/:name",
    name: "FindProduct",
    component: () => import("@/views/FindProduct.vue"),
  },
  {
    path: "/editBook/:id",
    name: "EditBook",
    component: () => import("@/views/EditBook.vue"),
  },
  {
    path: "/editPublisher/:id",
    name: "EditPublisher",
    component: () => import("@/views/EditPublisher.vue"),
  },
  {
    path: "/order",
    name: "OrderPage",
    component: () => import("@/views/OrderPage.vue"),
  },
  {
    path: "/order_complete/:id",
    name: "OrderCompletPage",
    component: () => import("@/views/OrderComplete.vue"),
  },
  {
    path: "/infoUser/:id",
    name: "infoUser",
    component: () => import("@/views/InfoUser.vue"),
  },
  {
    path: "/editinfoUser/:id",
    name: "editInfoUser",
    component: () => import("@/views/EditUser.vue"),
  },
  {
    path: "/detailorder/:id",
    name: "DetailOrder",
    component: () => import("@/views/DetailOrder.vue"),
  },
  {
    path: "/detailorderadmin/:id",
    name: "DetailOrderAdmin",
    component: () => import("@/views/DetailOrderAdmin.vue"),
  },
  {
    path: "/changepassword/:id",
    name: "ChangePassword",
    component: () => import("@/views/changePassword.vue"),
  },
  {
    path: "/editorder/:id",
    name: "editOrder",
    component: () => import("@/views/EditOrder.vue"),
  },
  {
    path: "/editStore/:id",
    name: "EditStore",
    component: () => import("@/views/EditStore.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () => import("@/views/404page.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
