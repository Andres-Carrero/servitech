import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/config/settings.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  title: string;
  token: string;
  role: string;
  verify: boolean;
  name: string;
  adminOptions: boolean = false;
  movOptions: boolean = false;
  movPerfil: boolean = false;
  movProductos: boolean = false;


  constructor(
    private router: Router,
    private settings: SettingsService,

  ) { }

  ngOnInit() {
    this.settings.onSetTheme();

    setInterval(()=>{
      if(
        this.router.url != '/' && 
        this.router.url != '/login' && 
        this.router.url != '/registrarse' &&
        this.router.url != '/about' && 
        this.router.url != '/ForgetPass'
      ){
        let info = JSON.parse(localStorage.getItem('userInfo'));
        this.name = `${info.usu_nombre} ${info.usu_apellido}`
        this.verify = JSON.parse(localStorage.getItem('verify'));
        this.role = localStorage.getItem('role');
        this.token = localStorage.getItem('token');
      }else{
        this.name = 'Servitech';
        this.role = null;
        this.token = null;
      }
      
    }, 500, localStorage.getItem('token'))
  }

  routers(number, url){
    switch (number) {
      case 1:
        this.router.navigateByUrl(url);
        if(this.adminOptions){this.adminOptions = false} 
      break;

      case 2:
        this.router.navigateByUrl(url);
        if(this.movOptions){this.movOptions = false} 
      break;

      case 3:
        this.router.navigateByUrl(url);
        if(this.movPerfil){this.movPerfil = false} 
      break;

      case 4:
        this.router.navigateByUrl(url);
        if(this.movProductos){this.movProductos = false} 
      break;
    
      default:
      break;
    }
  }

  openOptions(number){
    switch (number) {
      case 1:
        this.adminOptions = !this.adminOptions;
        this.movOptions = false;
        this.movPerfil = false;
        this.movProductos = false;
      break;

      case 2:
        this.movOptions = !this.movOptions;
        this.adminOptions = false;
        this.movPerfil = false;
        this.movProductos = false;
      break;

      case 3:
        this.movPerfil = !this.movPerfil;
        this.adminOptions = false;
        this.movOptions = false;
        this.movProductos = false;
      break;

      case 4:
        this.movProductos = !this.movProductos;
        this.adminOptions = false;
        this.movOptions = false;
        this.movPerfil = false;
      break;
    
      default:
      break;
    }

    setTimeout(() => {
      this.movPerfil = false;
      this.adminOptions = false;
      this.movOptions = false;
      this.movProductos = false;
    }, 5000);

  }

  async logout(){
    

    await localStorage.clear();
    this.settings.onSetTheme();
    await this.router.navigateByUrl('/');
  }





}
