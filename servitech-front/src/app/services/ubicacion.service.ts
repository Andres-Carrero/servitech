import { Injectable } from '@angular/core';
import { api } from "../config/axios.config";

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  token: string;

 constructor() { }
 
  getUbicacion(body){
   this.token = localStorage.getItem('token');
   return api.post(`/ubicaciones/list`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
   .then((res) => res.data)
    .catch((err) => {
     throw err.response
    })  
 }
  savedUbicacion(body){
   this.token = localStorage.getItem('token');
    return api.post(`/ubicaciones/create`, body, {
     headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
     throw err.response
    })  
 }


}
  