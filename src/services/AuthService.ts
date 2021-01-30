import axios from 'axios';

const API_URL = 'http://localhost:7000/api/v1/';

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + 'users/signin', {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(email: string, password: string) {
    return axios.post(API_URL + 'users/signup', {
      email,
      password
    });
  }
}

export default new AuthService();
