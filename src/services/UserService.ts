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

}

export default new UserService();
