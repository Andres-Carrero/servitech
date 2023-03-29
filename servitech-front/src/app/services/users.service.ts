import { Injectable } from '@angular/core';
import { api } from "../config/axios.config";
import { SettingsService } from '../config/settings.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(
  private settings: SettingsService,
) { }
public userUrl: string = 'usuarios'
  token: string;

  login(body){
    return api.post(`loged`, body, {}).then((res:any)=>{
      if (res.data) {return res.data} 
      else {
        this.settings.viewsnack(res.response.data.msg, 'Error')
        return;
      }
    }).catch((error)=>{throw error})
  }

  registrerClients(body){
    return api.post(`/register/client/1`, body, {
      headers: {Authorization: ""}
    })
    .then((res) => res.data)
    .catch((err) => {throw err.response})
  }

  registrerUser(body, type){
    this.token = localStorage.getItem('token');
    return api.post(`/register/users/${type}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  deleteUser(identificacion, status){
    this.token = localStorage.getItem('token');
    return api.get(`/${this.userUrl}/delete/${identificacion}/${status}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  logout(){
    this.token = localStorage.getItem('token');
    return api.post(`/${this.userUrl}/logoutWeb`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  updateUser(body){
    this.token = localStorage.getItem('token');
    return api.post(`/${this.userUrl}/update`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  updateUserSettings(body){
    this.token = localStorage.getItem('token');
    return api.post(`/${this.userUrl}/updateSettings`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  detailsUser(identificacion, body){
    this.token = localStorage.getItem('token');
    return api.post(`/${this.userUrl}/details/${identificacion}`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  getUserByIdentificacion(identificacion){
    this.token = localStorage.getItem('token');
    return api.get(`/${this.userUrl}/${identificacion}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

  getAllUsers(body){
    this.token = localStorage.getItem('token');
    return api.post(`/${this.userUrl}/all`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }


  verifyUser(body){
    this.token = localStorage.getItem('token');
    return api.post(`/verify`, body, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })  
  }

}
