import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/config/settings.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-ubicacionDetails',
  templateUrl: './ubicacionDetails.component.html',
  styleUrls: ['./ubicacionDetails.component.scss']
})
export class UbicacionDetailsComponent implements OnInit {
  codigo: number;
  nombre: string;
  

  constructor(
    private ubicacionAPI: UbicacionService,
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

    const body = {
      codigo: this.codigo,
      nombre: this.nombre
    };
   

    this.ubicacionAPI.savedUbicacion(body).then((res:any)=>{
      this.settings.viewsnack('Se guardo la ubicacion correctamente', 'Success');
      this.router.navigateByUrl('/ubicacion');

      
    }).catch((err)=>{
      console.log(err);
      
    })
  }

}
