<template>
  <div class="col-md-12">
    <div class="card card-container shadow">
      <img id="profile-img" src="../assets/hku.jpg" class="profile-img-card" />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">email</label>
          <input
            v-model="user.email"
            v-validate="'required|email'"
            type="text"
            class="form-control"
            name="email"
          />
          <div v-if="errors.has('email')" class="invalid-feedback">
            email is required or Invalid!
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div v-if="errors.has('password')" class="invalid-feedback">
            Password is required!
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="text-center">
          <router-link to="/forget" class="nav-link"
            >Forgot password?</router-link
          >
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Login extends Vue {
  private user: any = { email: "", password: "" };
  private loading: boolean = false;
  private message: string = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  created() {
    if (this.isLoggedIn) {
      this.$router.push("/profile");
    }
  }

  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.email && this.user.password) {
        this.login(this.user).then(
          (data) => {
            this.$router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message = error;
          }
        );

        // .catch(function (error) {
        //   if (error.response) {
        //     console.log(error.response.data.reason);
        //   } else if (error.request) {
        //     console.log(error.request);
        //   } else {
        //     console.log("Error", error.message);
        //   }
        //   console.log(error.config);
        // });
      }
    });
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.invalid-feedback {
  display: inline;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
