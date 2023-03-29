import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const api = axios.create({
  baseURL: `${environment.apiUrl}/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    if(response.data.code){
      if(response.data.code == 'login_failed'){
        localStorage.clear();
         window.location.href = '/login';
         return;
      }
    }
    return response;
  },
  (error) => {
    console.log('Aqui esta el error:', error);
    return error;
  }
);

export { api };