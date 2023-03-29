import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
initialTab: number = 1;
currentTab: number
optionsTabs: any = [{
  code: 1,
  name: 'Configuración General',
  show: true,
  disabled: false
},{
  code: 2,
  name: 'Metodos de Pago',
  show: true,
  disabled: true
}];

  constructor() { }

  ngOnInit() {
  }

}
