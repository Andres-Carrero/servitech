import { Injectable } from '@angular/core';
import { api } from "../config/axios.config";

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  token: string;

  constructor() { }

  getProveedores(body){
    this.token = localStorage.getItem('token');
    return api.post(`/proveedores/list`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }
  savedProveedores(body){
    this.token = localStorage.getItem('token');
    return api.post(`/proveedores/create`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }



}
