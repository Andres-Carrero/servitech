import { Injectable } from '@angular/core';
import { api } from "../config/axios.config";

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  token: string;

  constructor() { }

  getProductosAll(body){
    this.token = localStorage.getItem('token');
    return api.post(`/movimiento/productos`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }

  getProductosAllByTipo(tipo){
    this.token = localStorage.getItem('token');
    return api.get(`/movimiento/productos/${tipo}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  }


  getClienteAll(body){
    this.token = localStorage.getItem('token');
    return api.post(`/movimiento/usuarios`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  createdNewVenta(body){
    this.token = localStorage.getItem('token');
    return api.post(`/movimiento/create/venta`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  createdNewCompra(body){
    this.token = localStorage.getItem('token');
    return api.post(`/movimiento/create/compra`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  createdNewCarrito(body){
    this.token = localStorage.getItem('token');
    return api.post(`/movimiento/create/carrito`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

}
