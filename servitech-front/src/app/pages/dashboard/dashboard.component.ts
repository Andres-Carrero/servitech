import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/config/settings.service';
import { GeneralService } from 'src/app/services/general.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rol: number;
  listTipo: any = [];
  listProductos: any = [];

  constructor(
    private movimientosApi: MovimientosService,
    private usersApi: UsersService,
    private router: Router,
    private settings: SettingsService,
    private generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.rol = JSON.parse(localStorage.getItem('role'))
    if(this.rol == 2){this.getInfoClient()}
    
  }

  selectTipo(item){
    for (let i = 0; i < this.listTipo.length; i++) {
      this.listTipo[i].active = false;
    }
    item.active = true;
    this.getProductos(item.tipr_id)
  }

  getProductos(tipo){
    this.movimientosApi.getProductosAllByTipo(tipo).then((res:any)=>{
      let carrito = localStorage.getItem('carrito');

      if(carrito != undefined && carrito != null){
        for (let p = 0; p < res.data.length; p++) {
          for (let i = 0; i < JSON.parse(carrito).length; i++) {
            const car = JSON.parse(carrito)[i];
            if(res.data[p].prod_id == car){
              res.data[p].carrito = true;
            }
          }
        }
      }

    
      console.log(res.data);
      
      
      this.listProductos = res.data;
    })
  }

  verdetalle(item){
    const uuid = item.prod_id;
    this.router.navigate(['verDetalles/' + uuid]);
  }


  newBuy(item){
    let carrito = localStorage.getItem('carrito');
    item.carrito = true;

    if(!carrito){
      localStorage.setItem('carrito',JSON.stringify([item.prod_id]))
    }else{
      let arrayCar = [];
      for (let i = 0; i < JSON.parse(carrito).length; i++) {
        const car = JSON.parse(carrito)[i];
        arrayCar.push(car);
      }


      for (let i = 0; i < arrayCar.length; i++) {
        const car = arrayCar[i];
        if(item.prod_id == car){
          this.settings.viewsnack('Este producto ya fue agregado al carrito', 'Error');
          return;
        }
      }

      arrayCar.push(item.prod_id);
      localStorage.setItem('carrito', JSON.stringify(arrayCar))
    }


    console.log(localStorage.getItem('carrito'));
    
  }

  getInfoClient(){
    this.listTipo = [];
    this.getProductos(0);
    this.generalService.getAllList().then((res:any)=>{
      this.listTipo = [{
        tipr_id: 0,
        tipr_descripcion: 'Todos',
        icon: 'home',
        active: true,
        class: 1
      }];

      for (let i = 0; i < res.tipos.length; i++) {
        const tipo = res.tipos[i];
        tipo.active = false;

        switch (tipo.tipr_id) {
          case 1: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'earbuds'; 
            tipo.class= 1; 
          break;
          case 2: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'es';
            tipo.icon = 'settings_input_component'; 
            tipo.class= 1; 
          break;
          case 3: 
            tipo.icon = 'headphones'; 
            tipo.class= 1; 
          break;
          case 4: 
            tipo.tipr_descripcion = tipo.tipr_descripcion.split(' ')[0]+'s '+tipo.tipr_descripcion.split(' ')[1]+'s';
            tipo.icon = ['fa-solid','fa-fan']; 
            tipo.class= 2;  
          break;
          case 5: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'confirmation_number'; 
            tipo.class= 1; 
          break;
          case 6: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'cable'; 
            tipo.class= 1; 
          break;
          case 7: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'photo_camera'; 
            tipo.class= 1; 
          break;
          case 8: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'es';
            tipo.icon = 'smartphone'; 
            tipo.class= 1; 
          break;
          case 9: 
            tipo.icon = ['fa-solid','fa-hard-drive']; 
            tipo.class= 2;  
          break;
          case 10: 
            tipo.tipr_descripcion = tipo.tipr_descripcion.split(' ')[0]+'s';
            tipo.icon = 'card_giftcard'; 
            tipo.class= 1; 
          break;
          case 11: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'es';
            tipo.icon = ['fa-solid','fa-computer']; 
            tipo.class= 2; 
          break;
          case 12: 
            tipo.tipr_descripcion = tipo.tipr_descripcion.split(' ')[0]+'s';
            tipo.icon = 'videogame_asset'; 
            tipo.class= 1; 
          break;
          case 13: 
            tipo.icon = 'save'; 
            tipo.class= 1; 
          break;
          case 14: 
            tipo.icon = 'save'; 
            tipo.class= 1; 
          break;
          case 15: 
            tipo.tipr_descripcion = tipo.tipr_descripcion.split(' ')[0]+'s'
            tipo.icon = 'screenshot'; 
            tipo.class= 1; 
          break;
          case 16: 
            tipo.tipr_descripcion = tipo.tipr_descripcion.split(' ')[0]+'s '+tipo.tipr_descripcion.split(' ')[1]+' '+tipo.tipr_descripcion.split(' ')[2]
            tipo.icon = 'power'; 
            tipo.class= 1; 
          break;
          case 17: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'stay_primary_landscape'; 
            tipo.class= 1; 
          break;
          case 18: 
            tipo.icon = ['fa-solid','fa-spray-can-sparkles']; 
            tipo.class= 2;
          break;
          case 19: 
            tipo.icon = 'laptop'; 
            tipo.class= 1; 
          break;
          case 20: 
            tipo.icon = 'lightbulb'; 
            tipo.class= 1; 
          break;
          case 21: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'widgets'; 
            tipo.class= 1; 
          break;
          case 22: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = ['fa-solid','fa-sd-card']; 
            tipo.class= 2;
          break;
          case 23: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'keyboard_voice'; 
            tipo.class= 1; 
          break;
          case 24: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'es';
            tipo.icon = 'tv'; 
            tipo.class= 1; 
          break;
          case 25: 
            tipo.icon = 'mouse'; 
            tipo.class= 1; 
          break;
          case 26: 
            tipo.icon = ['fa-solid','fa-mattress-pillow']; 
            tipo.class= 2;
          break;
          case 27: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'outlet'; 
            tipo.class= 1; 
          break;
          case 28: 
            tipo.icon = 'devices_other'; 
            tipo.class= 1; 
          break;
          case 29: 
            tipo.icon = 'speaker'; 
            tipo.class= 1; 
          break;
          case 30: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'es';
            tipo.icon = ['fa-solid','fa-microchip']; 
            tipo.class= 2; 
          break;
          case 31: 
            tipo.icon = ['fa-solid','fa-memory']; 
            tipo.class= 2; 
          break;
          case 32: 
            tipo.icon = 'ac_unit'; 
            tipo.class= 1; 
          break;
          case 33: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'chair'; 
            tipo.class= 1; 
          break;
          case 34: 
            tipo.icon = 'extension'; 
            tipo.class= 1; 
          break;
          case 35: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'tablet_android'; 
            tipo.class= 1;
          break;
          case 36: 
            tipo.tipr_descripcion = tipo.tipr_descripcion.split(' ')[0]+'s '+tipo.tipr_descripcion.split(' ')[1]+'s';
            tipo.icon = ['fa-solid','fa-tachograph-digital']; 
            tipo.class= 2; 
          break;
          case 37: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'keyboard'; 
            tipo.class= 1; 
          break;
          case 38: 
            tipo.icon = ['fa-solid','fa-compact-disc']; 
            tipo.class= 2; 
          break;
          case 39: 
            tipo.icon = 'security_update_good'; 
            tipo.class= 1; 
          break;
          case 40: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'directions_car'; 
            tipo.class= 1; 
          break;
          case 41: 
            tipo.icon = 'local_printshop'; 
            tipo.class= 1; 
          break;
          case 42: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'es';
            tipo.icon = 'broadcast_on_personal'; 
            tipo.class= 1; 
          break;
          case 43: 
            tipo.icon = 'scanner'; 
            tipo.class= 1; 
          break;
          case 44: 
            tipo.tipr_descripcion = tipo.tipr_descripcion+'s';
            tipo.icon = 'router'; 
            tipo.class= 1; 
          break;
          case 45: 
            tipo.icon = 'smart_display';
            tipo.class= 1; 
          break;
          case 46: 
            tipo.icon = ['fa-solid','fa-sim-card']; 
            tipo.class= 2; 
          break;
          case 47: 
            tipo.icon = 'watch'; 
            tipo.class= 1; 
          break;
          
          default:
          break;
        }
        this.listTipo.push(tipo)
      }
    })
  }

}
