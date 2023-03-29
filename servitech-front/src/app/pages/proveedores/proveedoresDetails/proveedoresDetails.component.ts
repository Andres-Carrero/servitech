import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from "src/app/services/proveedores.service";
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/config/settings.service';

@Component({
  selector: 'app-proveedoresDetails',
  templateUrl: './proveedoresDetails.component.html',
  styleUrls: ['./proveedoresDetails.component.scss']
})
export class ProveedoresDetailsComponent implements OnInit {
  codigo: number;
  nombre: string;
  email: string;
  telefono: number;
  
  constructor(
    private proveedoresAPI: ProveedoresService,
    private settings: SettingsService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  guardar(){

    if(!this.codigo){
      return this.settings.viewsnack('El codigo es obligatorio', 'Error');
    }
    if(!this.nombre){
      return this.settings.viewsnack('El nombre es obligatorio', 'Error');
    }
    if(!this.email){
      return this.settings.viewsnack('El email es obligatoria', 'Error');
    }
    if(!this.telefono){
      return this.settings.viewsnack('El Telefono es obligatorio', 'Error');
    }

    const body = {
      codigo: this.codigo,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      fecha: moment().format('YYYY-MM-DD HH:mm:ss')
    };
   

    this.proveedoresAPI.savedProveedores(body).then((res:any)=>{
      this.settings.viewsnack('Se guardo el proveedor correctamente', 'Success');
      this.router.navigateByUrl('/proveedores');

      
    }).catch((err)=>{
      console.log(err);
      
    })
  }

}
