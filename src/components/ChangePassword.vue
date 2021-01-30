<template>
  <div class="col-md-12">
    <div class="card card-container border-0">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="oldPassword">Current Password</label>
          <input
            v-model="user.oldPassword"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="oldPassword"
          />
          <div
            v-if="errors.has('oldPassword')"
            class="alert alert-danger"
            role="alert"
          >
            password is required!
          </div>
        </div>

        <div class="form-group">
          <label for="email">New Password</label>
          <input
            v-model="user.newPassword"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="newPassword"
          />
          <div
            v-if="errors.has('newPassword')"
            class="alert alert-danger"
            role="alert"
          >
            password is required!
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Change password</span>
          </button>
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
import UserService from "@/services/UserService";
const Auth = namespace("Auth");

@Component
export default class ChnagePasswordComponent extends Vue {
  private user: any = { oldPassword: "", newPassword: "" };
  private loading: boolean = false;
  private message: string = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private signOut!: () => void;

  created() {
    // if (this.isLoggedIn) {
    //   this.$router.push("/profile");
    // }
    // console.log(this.user);
  }

  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.oldPassword && this.user.newPassword) {
        UserService.changePassword(this.user).then(
          (data) => {
            if (data.data && data.data.message) {
              this.message = data.data.message;
              setTimeout(() => {
                this.signOut();
                this.$router.push("/login");
              }, 2000);
            }
            // this.$router.push("/login");
          },
          (error) => {
            this.loading = false;
            this.message = error;
          }
        );
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

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
}
</style>
