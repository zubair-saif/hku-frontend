<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="mb-2">
      <button type="button" class="btn btn-success">New User</button>
    </div>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col" colspan="3">email</th>
          <th scope="col">role</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>zubair saif</td>
          <td colspan="3">zubairsaif700@gmail.com</td>
          <td>admin</td>
          <td>
            <button type="button" class="btn btn-info btn-sm mr-2">edit</button>
            <button type="button" class="btn btn-danger btn-sm">delete</button>
          </td>
        </tr>
        <tr>
          <th scope="row">1</th>
          <td>zubair saif</td>
          <td colspan="3">zubairsaif700@gmail.com</td>
          <td>admin</td>
          <td>
            <button type="button" class="btn btn-info btn-sm mr-2">edit</button>
            <button type="button" class="btn btn-danger btn-sm">delete</button>
          </td>
        </tr>
        <tr>
          <th scope="row">1</th>
          <td>zubair saif</td>
          <td colspan="3">zubairsaif700@gmail.com</td>
          <td>admin</td>
          <td>
            <button type="button" class="btn btn-info btn-sm mr-2">edit</button>
            <button type="button" class="btn btn-danger btn-sm">delete</button>
          </td>
        </tr>
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
  }
}
</script>

