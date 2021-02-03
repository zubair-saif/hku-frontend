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
        <router-link to="/course" tag="button" class="btn btn-success">
          Add Course
        </router-link>
      </div>
    </div>

    <div class="row" v-if="content && content.length">
      <div class="col-md-4 mb-4" v-for="data in content" v-bind:key="data.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ data.courseName }}</h5>
            <p class="card-text text-truncate">
              {{ data.description }}
            </p>
          </div>
          <div class="card-footer text-center">
            <router-link
              to="/assessment"
              tag="button"
              class="btn btn-primary btn-sm mr-2"
            >
              view assessment
            </router-link>
            <button type="button" class="btn btn-success btn-sm mr-2">
              Setting
            </button>
            <button type="button" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4" v-if="!content || !content.length">
        Not course added yet
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
    UserService.getTeacherCourse().then(
      (response) => {
        this.content = response.data.teacher.course;
        console.log();
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
