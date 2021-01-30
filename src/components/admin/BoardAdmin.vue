<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="mb-2">
      <router-link to="/add-user" tag="button" class="nav-link btn btn-success">
        New User
      </router-link>
    </div>
    <table class="table table-hover table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col" colspan="3">email</th>
          <th scope="col">role</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody v-if="users && users.length">
        <tr v-for="data in users">
          <th scope="row">{{ data.id }}</th>
          <td>{{ data.name }}</td>
          <td colspan="3">{{ data.email }}</td>
          <td>
            {{
              data.roles && data.roles[0] && data.roles[0].name
                ? data.roles[0].name
                : ""
            }}
          </td>
          <td>
            <router-link
              class="btn btn-info btn-sm mr-2"
              :to="{ name: 'update-user', params: { id: data.id } }"
              >edit</router-link
            >
            <button
              type="button"
              class="btn btn-danger btn-sm"
              data-toggle="modal"
              data-target="#myModal"
            >
              delete
            </button>
          </td>

          <!-- modal for confirm, delete -->
          <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <p class="modal-title">
                    Are you sure, you wants to delete this user
                  </p>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                    @click.prevent="deleteUser(data.id)"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    class="btn btn-info"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- end moda for confirm delete -->
        </tr>
      </tbody>
      <tbody v-if="!users || !users.length">
        No users added yet
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/services/UserService";

@Component
export default class AdminBoard extends Vue {
  private content = "";
  private users = [];

 deleteUser(id){
      UserService.deleteUser(id).then(
      (response) => {
        // this.users = response.data.users;
        this.getUsers();
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    }
    getUsers(){
UserService.getUsers().then(
      (response) => {
        this.users = response.data.users;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    }

  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
   
this.getUsers();
    
  }
}
</script>


<style >
table,
th,
td {
  text-align: center !important;
}
</style>