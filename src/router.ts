import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
import Login from '@/components/Login.vue';
import AddUpdateUserComponent from '@/components/admin/AddUpdateUser.vue';
import ResetPasswordComponent from '@/components/ResetPassword.vue';
import ChnagePasswordComponent from '@/components/ChangePassword.vue';
import AddUpdateAssessment from '@/components/admin/AddUpdateAssessment.vue'
import Forget from '@/components/Forget.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/reset-password/:id',
    name: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChnagePasswordComponent
  },
  {
    path: '/add-user',
    name: 'new-user',
    component: AddUpdateUserComponent
  },
  {
    path: '/update-user/:id',
    name: 'update-user',
    component: AddUpdateUserComponent
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('./components/Profile.vue')

  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./components/admin/BoardAdmin.vue')
  },
  {
    path: '/mod',
    name: 'moderator',
    component: () => import('./components/teacher/BoardModerator.vue')
  },
  {
    path: '/course',
    name: 'add-course',
    component: () => import('./components/teacher/AddUpdateCourse.vue')
  },
  {
    path: '/assessment',
    name: 'add-assessment',
    component: () => import('./components/teacher/Assessment.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./components/student/BoardUser.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  const publicPages = ['login', 'forget', 'reset-password'];
  const authRequired = !publicPages.includes(to.name || '');
  const loggedIn = JSON.parse(localStorage.getItem('user')!);
  // console.log(loggedIn.roles);
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else if ((to.name == 'new-user' || to.name == 'update-user') && loggedIn && loggedIn.roles != 'admin') {
    next('/profile');
  } else {
    next();
  }
});

export default router;


