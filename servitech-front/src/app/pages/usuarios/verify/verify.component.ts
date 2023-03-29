import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/services/users.service";
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SettingsService } from 'src/app/config/settings.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  num1: any;
  num2: any;
  num3: any;
  num4: any;
  num5: any;
  num6: any;
  deviceInfo = null;
  

  constructor(
    private usersApi: UsersService,
    private settings: SettingsService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  validateNumbers(number){
    let validate = /^[0-9]+$/

    switch (number) {
      case 1:
        if(!this.num1.match(validate)){
          return this.num1 = null;
        }
        document.getElementById('input2').focus()
      break;

      case 2:
        if(!this.num2.match(validate)){
          return this.num2 = null;
        }
        document.getElementById('input3').focus()
      break;

      case 3:
        if(!this.num3.match(validate)){
          return this.num3 = null;
        }
        document.getElementById('input4').focus()
      break;

      case 4:
        if(!this.num4.match(validate)){
          return this.num4 = null;
        }
        document.getElementById('input5').focus()
      break;

      case 5:
        if(!this.num5.match(validate)){
          return this.num5 = null;
        }
        document.getElementById('input6').focus()
      break;

      case 6:
        if(!this.num6.match(validate)){
          return this.num6 = null;
        }
      break;
    
      default:
        break;
    }
  }

  saveVerify(){
    if(!this.num1){
      return this.settings.viewsnack('Falta N1', 'Error');
    }
    if(!this.num2){
      return this.settings.viewsnack('Falta N2', 'Error');
    }
    if(!this.num3){
      return this.settings.viewsnack('Falta N3', 'Error');
    }
    if(!this.num4){
      return this.settings.viewsnack('Falta N4', 'Error');
    }
    if(!this.num5){
      return this.settings.viewsnack('Falta N5', 'Error');
    }
    if(!this.num6){
      return this.settings.viewsnack('Falta N6', 'Error');
    }

    const number = this.num1+this.num2+this.num3+this.num4+this.num5+this.num6

    
    this.usersApi.verifyUser({
      number, 
      info: number, 
      device: this.deviceInfo,
      infoDate:  {
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm:ss'),
      }
    }).then((res:any)=>{
      if(!res.data){
        this.num1 = null;
        this.num2 = null;
        this.num3 = null;
        this.num4 = null;
        this.num5 = null;
        this.num6 = null;
        return this.settings.viewsnack('El codigo es incorrecto o invalido', 'Error');
      }else{
        this.settings.viewsnack('Usuario verificado correctamente', 'Success')
        localStorage.setItem('verify', 'true');
        this.router.navigateByUrl('/dashboard');
      }
      
    })
  }

}
