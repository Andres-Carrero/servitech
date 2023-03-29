import { Injectable } from '@angular/core';
import { api } from "../config/axios.config";
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  token: string;

  constructor() {}


  getProductos(body){
    this.token = localStorage.getItem('token');
    return api.post(`/productos/list`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }


  /////////////////////
  getProductosArray(body){
    this.token = localStorage.getItem('token');
    return api.post(`/productos/array`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  uploadExcel(body){
    this.token = localStorage.getItem('token');
    return api.post(`/productos/upload`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }


  getProductoByCodigo(codigo){
    this.token = localStorage.getItem('token');
    return api.get(`/productos/${codigo}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  getProductoEmpty(){
    this.token = localStorage.getItem('token');
    return api.get(`/productos/empty`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  savedProductos(body){
    this.token = localStorage.getItem('token');
    return api.post(`/productos/create`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  deleteProductos(code ,body){
    this.token = localStorage.getItem('token');
    return api.post(`/productos/delete/${code}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }


  
}

