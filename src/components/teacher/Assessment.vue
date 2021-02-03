<template>
  <div class="col-md-12">
    <div class="card">
      <div class="mt-2">
        <h2>Add new Assessment</h2>
        <hr />
      </div>
      <form name="form" @submit.prevent="handleSubmit">
        <div v-if="!successful">
          <div class="form-group row">
            <div class="col mb-3">
              <label for="title">title</label>

              <input
                v-model="assessment.title"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="title"
                placeholder="title"
              />
              <div
                v-if="submitted && errors.has('courseName')"
                class="invalid-feedback"
              >
                {{ errors.first("courseName") }}
              </div>
            </div>
            <div class="col mb-3">
              <label for="courseCode">Course Code</label>
              <input
                v-model="course.courseCode"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="courseCode"
                placeholder="course code"
              />
              <div
                v-if="submitted && errors.has('courseCode')"
                class="invalid-feedback"
              >
                {{ errors.first("courseCode") }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label for="description">Description</label>
              <input
                v-model="course.description"
                v-validate="'required|max:50'"
                type="description"
                class="form-control"
                name="description"
                placeholder="description"
              />
              <div
                v-if="submitted && errors.has('description')"
                class="invalid-feedback"
              >
                {{ errors.first("description") }}
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
export default class Assessment extends Vue {
  private assessment: any = {
    id: "",
    title: "",
    phases: {},
    tags: "",
  };

  private submitted: boolean = false;
  private successful: boolean = false;
  private message: string = "";

  @Auth.Getter
  private isLoggedIn!: boolean;
  created() {
    if (this.$route.params.id) {
      this.assessment.id = this.$route.params.id;
      /* we will send request for single and patch it data this user obj */
      UserService.getUser(this.$route.params.id).then((response) => {
        if (response && response.status == 200) {
          this.assessment = response.data;
        }
      });
    }
  }

  handleSubmit() {
    this.message = "";
    this.submitted = true;

    if (this.$route.params.id) {
      /* write put request here */
      UserService.addCourse(this.assessment).then(
        (data) => {
          this.message = data.data.message;
          this.successful = true;
          this.$router.push("/mod");
        },
        (error) => {
          this.message = error;
          this.successful = false;
        }
      );
    } else {
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          UserService.addCourse(this.assessment).then(
            (data) => {
              this.message = data.data.message;
              this.successful = true;
              this.$router.push("/mod");
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
.invalid-feedback {
  display: inline;
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
