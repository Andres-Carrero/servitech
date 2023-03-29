import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UsersService } from "src/app/services/users.service";
import * as moment from 'moment';
import { SettingsService } from 'src/app/config/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typePass: string = 'password';
  deviceInfo = null;
  email: string;
  pass: string;

  constructor(
    private userAPI: UsersService,
    private settings: SettingsService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    //localStorage.clear();
  }


  passVisible(number){
    if(number == 1){
        document.getElementById("iconVisibility").style.display = 'none';
        document.getElementById("iconVisibilityOff").style.display = 'block';
        this.typePass = 'text';
    }
    if(number == 2){
        document.getElementById("iconVisibility").style.display = 'block';
        document.getElementById("iconVisibilityOff").style.display = 'none';
        this.typePass = 'password';
    }
  }

  login(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  
    if(!this.email){
      return this.settings.viewsnack('Falta ingresar el correo', 'Error');
    }
    if(!this.pass){
      return this.settings.viewsnack('Falta ingresar la contraseña', 'Error');
    }
    if(!emailRegex.test(this.email)){
      return this.settings.viewsnack('El formato del email es invalido', 'Error');
    }

    const datos = {
      email: this.email,
      password: this.pass,
      device: this.deviceInfo,
      infoDate: {
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm:ss'),
      }
    };



    this.userAPI.login(datos).then((res:any)=>{
      localStorage.setItem('token', res.token);
      localStorage.setItem('expired', res.expired);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      localStorage.setItem('theme', !res.data.usu_tema ? 'false' : res.data.usu_tema);
      localStorage.setItem('role', JSON.stringify(res.role));
      this.settings.viewsnack(res.msg, 'Success');

      if(res.data.usu_verificacion == 0){
        localStorage.setItem('verify', 'false');
        this.router.navigateByUrl('/verificacion');
      }else{
        localStorage.setItem('verify', 'true');
        this.router.navigateByUrl('/dashboard');
      }

      this.settings.onSetTheme();
    })
  }

  

}
