<template>
  <div class="container">
    <!-- <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header> -->

    <div
      class="row page-actions justify-content-start"
      style="margin-top: 16px; margin-bottom: 8px"
    >
      <div class="col-md-auto">
        <button type="button" class="btn btn-success">Add Course</button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course 1</h5>
            <p class="card-text text-truncate">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div class="card-footer text-center">
            <button type="button" class="btn btn-primary btn-sm mr-2">
              view assessment
            </button>
            <button type="button" class="btn btn-success btn-sm mr-2">
              Setting
            </button>
            <button type="button" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course 1</h5>
            <p class="card-text text-truncate">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.the card's content. bulk of the card's
              content.the card's content.
            </p>
          </div>
          <div class="card-footer text-center">
            <button type="button" class="btn btn-primary btn-sm mr-2">
              view assessment
            </button>
            <button type="button" class="btn btn-success btn-sm mr-2">
              Setting
            </button>
            <button type="button" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course 1</h5>
            <p class="card-text text-truncate">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.the card's content. bulk of the card's
              content.the card's content.
            </p>
          </div>
          <div class="card-footer text-center">
            <button type="button" class="btn btn-primary btn-sm mr-2">
              view assessment
            </button>
            <button type="button" class="btn btn-success btn-sm mr-2">
              Setting
            </button>
            <button type="button" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/services/UserService";

@Component
export default class ModeratorBoard extends Vue {
  private content = "";

  mounted() {
    UserService.getModeratorBoard().then(
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
