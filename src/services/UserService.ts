import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:7000/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'student/student', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'teacher/teacher', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'users/admin', { headers: authHeader() });
  }
  sendForgetEmail(form: any) {
    return axios.post(API_URL + 'users/forgetPassword', form);
  }
  resetForgetPassword(form: any) {
    return axios.post(API_URL + 'users/resetPassword', form);
  }
  changePassword(form: any) {
    return axios.post(API_URL + 'users/changePassword', form, { headers: authHeader() });
  }
  addUser(form: any) {
    return axios.post(API_URL + 'users/signup', form, { headers: authHeader() });
  }
  updateUser(form: any) {
    return axios.put(API_URL + 'users/updateUser/' + form.id, form, { headers: authHeader() });
  }

  getUsers() {
    return axios.get(API_URL + 'users/', { headers: authHeader() });
  }

  getUser(id: any) {
    return axios.get(API_URL + 'users/' + id, { headers: authHeader() });
  }

  deleteUser(id: any) {
    return axios.delete(API_URL + 'users/deleteUser/' + id, { headers: authHeader() });
  }

  addCourse(form: any) {
    return axios.post(API_URL + 'course/create', form, { headers: authHeader() });
  }
  getTeacherCourse() {
    return axios.get(API_URL + 'teacher/courseList', { headers: authHeader() });
  }
}

export default new UserService();
