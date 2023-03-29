import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { api } from "../config/axios.config";


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public generalUrl: string = 'general';
  token: string;

constructor() { }

  getAllList(){
    this.token = localStorage.getItem('token');
    return api.get(`/${this.generalUrl}/list`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
     throw err.response
    })  
  }

  convertMoney(from, value){
    this.token = localStorage.getItem('token');
    return api.get(`/${this.generalUrl}/convert/${from}/${value}`, {
      headers: {Authorization: "Bearer " + this.token}
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
   
    
  }

  downloadFiles(type, data?){
    let urlDown = `${environment.apiUrl}/${this.generalUrl}/download/${type}?token=${localStorage.getItem('token')}`;
    if(type == 2) urlDown += `&invoice=${data.invoice}`;

    window.location.href = urlDown;
  }

}
