<template>
  <div class="col-md-12">
    <div class="card">
      <div class="mt-2">
        <h2>Add new user</h2>
        <hr />
      </div>
      <form name="form" @submit.prevent="handleSubmit">
        <div v-if="!successful">
          <div class="form-group row">
            <div class="col mb-3">
              <label for="email">Name</label>

              <input
                v-model="user.name"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="name"
                placeholder="name"
              />
              <div v-if="submitted && errors.has('name')" class="alert-danger">
                {{ errors.first("name") }}
              </div>
            </div>
            <div class="col mb-3">
              <label for="username">Username</label>
              <input
                v-model="user.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="username"
                placeholder="username"
              />
              <div
                v-if="submitted && errors.has('username')"
                class="alert-danger"
              >
                {{ errors.first("username") }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label for="email">Email</label>
              <input
                v-model="user.email"
                v-validate="'required|email|max:50'"
                type="email"
                class="form-control"
                name="email"
                placeholder="email"
              />
              <div v-if="submitted && errors.has('email')" class="alert-danger">
                {{ errors.first("email") }}
              </div>
            </div>
            <div class="col">
              <label for="password">Password</label>
              <input
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
                placeholder="password"
              />
              <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
              >
                {{ errors.first("password") }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label for="roles">Role</label>
              <select
                v-model="user.roles"
                v-validate="'required'"
                class="form-control"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              <div v-if="submitted && errors.has('roles')" class="alert-danger">
                {{ errors.first("roles") }}
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import UserService from "@/services/UserService";
const Auth = namespace("Auth");

@Component
export default class AddUpdateUser extends Vue {
  private user: any = {
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    roles: "",
  };

  private submitted: boolean = false;
  private successful: boolean = false;
  private message: string = "";

  @Auth.Getter
  private isLoggedIn!: boolean;
  created() {
    if (this.$route.params.id) {
      this.user.id = this.$route.params.id;
      /* we will send request for single and patch it data this user obj */
      UserService.getUser(this.$route.params.id).then((response) => {
        if (response && response.status == 200) {
          this.user = response.data;
        }
      });
    }
  }

  handleSubmit() {
    this.message = "";
    this.submitted = true;
    this.user.roles = [this.user.roles];

    if (this.$route.params.id) {
      /* write put request here */
      UserService.updateUser(this.user).then(
        (data) => {
          this.message = data.data.message;
          this.successful = true;
          this.$router.push("/admin");
        },
        (error) => {
          this.message = error;
          this.successful = false;
        }
      );
    } else {
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          UserService.addUser(this.user).then(
            (data) => {
              this.message = data.data.message;
              this.successful = true;
              this.$router.push("/admin");
            },
            (error) => {
              this.message = error;
              this.successful = false;
            }
          );
        }
      });
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 500px !important;
  padding: 20px 40px;
}

.card {
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
}
</style>
