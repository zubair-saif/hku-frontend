<template>
  <div id="app">
    <nav
      class="navbar navbar-expand navbar-dark bg-infos"
      v-if="!['login', 'forget', 'reset-password'].includes($route.name)"
    >
      <a class="navbar-brand">
        <img
          src="/favicon.ico"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt="logo"
        />
        Vox Assessment
      </a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <!-- <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link> -->
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link"
            >Admin Dashboard</router-link
          >
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/assessment" class="nav-link"
            >Assessment</router-link
          >
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link"
            >Teacher Dashboard</router-link
          >
        </li>
        <!-- <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link"
            >User</router-link
          >
        </li> -->
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <!-- <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item"></li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Sign out
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class App extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  get showAdminBoard(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("admin");
    }

    return false;
  }

  get showModeratorBoard(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("teacher");
    }

    return false;
  }

  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
}
</script>

<style>
.navbar-dark .navbar-nav .nav-link {
  color: #fff;
}
.bg-infos {
  background-color: rgb(50, 196, 252) !important;
}
</style>