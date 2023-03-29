import { Component, NgZone, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { SettingsService } from 'src/app/config/settings.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-ventasV2',
  templateUrl: './ventasV2.component.html',
  styleUrls: ['./ventasV2.component.scss']
})
export class VentasV2Component implements OnInit {
  internationalNumberFormat: any = new Intl.NumberFormat('en-US');
  initialTab: number = 1;
  currentTab: number
  optionsTabs: any = [{
    code: 1,
    name: 'Información del Cliente',
    show: true,
    disabled: false
  },{
    code: 2,
    name: 'Información de los Productos',
    show: true,
    disabled: true
  },{
    code: 3,
    name: 'Información de la venta',
    show: true,
    disabled: true
  }]
  idCliente: number;
  validateUser: boolean = true;
  listUsers: any = [];
  nombres: string;
  apellidos: string;
  email: string;
  telefono: number;
  readonlyUser: boolean = false;
  direccion: string;
  deviceInfo = null;
  selectUserValue: any;
  product: string = '';
  listOptionsProductos: any = [];
  validateTime: any;
  validateTimeProducts: any;
  totalView: string = '$ 0';
  listProductos: any = [];
  total: number = 0;
  iva: number = 0;
  ivaTotal: number = 0;
  ivaTotalView: string = '$ 0';
  cambio: number
  recibido: number
  cambioView: string
  nameClient: string;
  validateRecibido: any
  validateButton: boolean = true;

  constructor(
    private movimientosApi: MovimientosService,
    private usersApi: UsersService,
    private settings: SettingsService,
    private deviceService: DeviceDetectorService,
    private generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  saved(){
    const body = {
      totalProducts: this.total,
      totalIva: JSON.parse(String(this.ivaTotal).split('.')[0]),
      iva: JSON.parse(String(this.iva).split('.')[0]),
      recibido: this.recibido,
      cambio: JSON.parse(String(this.cambio).split('.')[0]),
      fecha: moment().format('YYYY-MM-DD'),
      hora: moment().format('HH:mm:ss'),
      listProduct: this.listProductos,
      clientSelect: this.selectUserValue

    }

    this.movimientosApi.createdNewVenta(body).then((res:any)=>{
      this.settings.viewsnack(res.data, 'Success');

      setTimeout(() => {
        window.location.reload();
      }, 3000);
  
    })

  }

  calculateChange(){
    this.cambio = this.recibido-this.ivaTotal;
    this.cambioView = '$ '+this.internationalNumberFormat.format(this.cambio);

    if(this.cambio < 0){
      this.validateButton = true;
      clearTimeout(this.validateRecibido); 
      this.validateRecibido = setTimeout(() => {
        this.settings.viewsnack('Recibido debe ser mayor a Total a Pagar', 'Error', 1500);
      }, 3000);
    }else{
      clearTimeout(this.validateRecibido); 
      this.validateButton = false;
    }
  }

  restar(index){
    let item = this.listProductos[index];
    if(item.buyCantidad < 2){
      return;
    }else{
      item.buyCantidad = item.buyCantidad-1;
    }
    this.calculate(index);
  }

  sumar(index){
    let item = this.listProductos[index];
    if(item.buyCantidad >= item.prod_cantidad){
      return;
    }else{
      item.buyCantidad = item.buyCantidad+1;
    }
    this.calculate(index);
  }

  calculate(index){
    let item = this.listProductos[index];
    item.subTotalView = '$ '+this.internationalNumberFormat.format(item.buyCantidad*item.prod_precio_venta);
    item.subTotal = item.buyCantidad*item.prod_precio_venta;
    this.calculateTotal();
  }

  agregarCarrito(option){
    this.product = '';
    let validation = false;

    if(this.listProductos.length > 0){
      for (let index = 0; index < this.listProductos.length; index++) {
        if(this.listProductos[index].prod_id == option.prod_id){
          validation = true;
        }
      }
    }else{
      this.optionsTabs[2].disabled = true;
    }

    if(!validation){
      option.buyCantidad = 1;
      option.prod_precio = '$ '+this.internationalNumberFormat.format(option.prod_precio_venta);
      option.subTotalView = '$ '+this.internationalNumberFormat.format(option.buyCantidad*option.prod_precio_venta);
      option.subTotal = option.buyCantidad*option.prod_precio_venta;
      this.listOptionsProductos = [];
      this.listProductos.push(option);
      this.optionsTabs[2].disabled = false;
      this.calculateTotal();
    }else{
      this.settings.viewsnack('Ya se existe este producto en la lista', 'Error');
    }
  }

  calculateTotal(){
    let totals1 = 0;
    let sumIva = 0;
    let totalProduct = 0;
    this.total = 0;
    this.totalView = '';
    for (let i = 0; i < this.listProductos.length; i++) {
      const element = this.listProductos[i];

      totalProduct = element.buyCantidad + totalProduct;
      sumIva = (element.prod_iva*element.buyCantidad) + sumIva;
      totals1 = totals1+element.subTotal;
    }
    
    this.total = totals1;
    this.totalView = '$ '+this.internationalNumberFormat.format(totals1);

    this.iva = JSON.parse(String(sumIva / totalProduct).split('.')[0]);
    this.ivaTotal = this.total+(this.total*(this.iva/100));
    this.ivaTotalView = '$ '+this.internationalNumberFormat.format(this.ivaTotal);

  }

  validateProducts(){
    clearTimeout(this.validateTime); 
    if(this.product.length > 0){
      this.validateTime = setTimeout(() => {
        this.getAllProductos();
      }, 1500);
    }else{
      this.listOptionsProductos = [];
    }
  }

  getAllProductos(){
    this.listOptionsProductos = [];

    this.movimientosApi.getProductosAll({search: this.product, cant: 10}).then((res:any)=>{
      if(res.data.length != 0){
        this.listOptionsProductos = res.data;
      }else{
        this.listOptionsProductos = [];
      }
    })
  }

  changeFilterClient(type){
    switch (type) {
      case 1:
        this.validateUser = false;
        this.readonlyUser = false;
      break;

      case 2:
        this.validateUser = true;
        this.readonlyUser = true;
      break;
    }
  }

  searchCliente(event){
    if(this.listUsers.length == 0){
      clearTimeout(this.validateTime); 
      this.validateTime = setTimeout(() => {
        this.settings.viewsnack('Recuerda dar "Enter" para consultar los clientes', 'Info', 2500);
      }, 3000);
    }

    if(this.idCliente && String(this.idCliente).length > 3 && event.key == "Enter"){
      this.listUsers = [];
      this.movimientosApi.getClienteAll({identificacion: this.idCliente}).then((res:any)=>{
        if(res.data.length == 0){
          this.optionsTabs[1].disabled = true;
          this.selectUserValue = null;
          this.changeFilterClient(1);
          return this.settings.viewsnack('No hay información relacionada', 'Error')
        }
        this.validateUser = true;
        this.listUsers = res.data;
        this.listUsers.map(user => user.check = false);
      })
    }

    if(!this.idCliente || String(this.idCliente).length <= 3 && event.key == "Enter"){
      this.settings.viewsnack('Debe diligenciar la identificación del cliente o es demasiada corta', 'Error')
    }
  }

  selectUser(index, item?){
    this.listUsers.map(user => user.check = false);
    this.listUsers[index].check = true;
    this.selectUserValue = !item ? this.listUsers[index]: item;
    this.optionsTabs[1].disabled = false;
    this.nameClient = this.selectUserValue.usu_nombre +' '+this.selectUserValue.usu_apellido;
    this.settings.viewsnack('Cliente seleccionado correctamente', 'Success');
  } 

  

  guardarUsuario(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(!this.nombres){
      return this.settings.viewsnack('Los nombres son obligatorios', 'Error');
    }
    if(!this.apellidos){
      return this.settings.viewsnack('Los apellidos son obligatorios', 'Error');
    }
    if(!this.idCliente){
      return this.settings.viewsnack('El numero de identificación es obligatorio', 'Error');
    }
    if(String(this.idCliente).length < 6){
      return this.settings.viewsnack('El numero de identificación es muy corto', 'Error');
    }
    if(!this.email){
      return this.settings.viewsnack('El email es obligatorio', 'Error');
    }
    if(!emailRegex.test(this.email)){
      return this.settings.viewsnack('El formato del email es invalido', 'Error');
    }
    if(!this.telefono){
      return this.settings.viewsnack('El numero de telefono es obligatorio', 'Error');
    }
    if(!this.direccion){
      return this.settings.viewsnack('La dirección es obligatoria', 'Error');
    }

    if(String(this.telefono).length != 10){
      return this.settings.viewsnack('El numero de telefono dede tener 10 digitos', 'Error');
    }

    let code = String(Math.floor(Math.random() * (999999 - 111111)) + 111111); 
    let pass = String(Math.floor(Math.random() * (99999999 - 11111111)) + 11111111)
    const body: any = {
      img: null,
      nombres: this.nombres,
      apellidos: this.apellidos,
      identificacion: this.idCliente,
      email: this.email,
      password: bcrypt.hashSync(pass, 10) ,
      pass: pass,
      direccion: this.direccion,
      ciudad: 'Definir',
      departamento: 'Definir',
      pais: 'Colombia',
      nacimiento: null,
      entregado: 'SI',
      telefono: this.telefono,
      rol: 2,
      codigo: bcrypt.hashSync(code, 10),
      view: code,
    }

    body.info = JSON.stringify(body)
    body.device = this.deviceInfo
    body.infoDate = {
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss'),
    }

    this.settings.viewsnack('Registrando Usuario', 'Loading');
    this.usersApi.registrerUser(body, 2).then(async (res:any)=>{
      if(!res.create){
        this.settings.viewsnack(res.data, 'Error');
      }else{
        this.settings.viewsnack('Por seguridad del cliente, la contraseña se envio al email: '+this.email, 'Info');
        this.validateUser = true;
        this.readonlyUser = true;
        this.settings.viewsnack(res.data, 'Success');
        await this.searchCliente({key: "Enter"});
      }
    })
  }

 




}
