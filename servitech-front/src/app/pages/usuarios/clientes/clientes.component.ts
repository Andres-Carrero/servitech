import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/services/users.service";
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from "src/environments/environment";
import { SettingsService } from 'src/app/config/settings.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  numberFormat: any = new Intl.NumberFormat('en-US');
  nombres: string;
  apellidos: string;
  identificacion: number;
  email: string;
  password: string;
  varifyPassord: string;
  nacimiento: any;
  telefono: number;
  typePass: string = 'password';
  typePass1: string = 'password';
  validateUrl: number;
  user: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  pais: string = 'Colombia';
  columns: number;
  listRoles: any = [];
  rol: number;
  titleButton: string;
  photoPerfil: string;
  messageTxt: string
  photoSync: boolean = true;
  total: any;
  pageSize: number = 10;
  pageSize2: number = 10;
  readonlyInputs: boolean;
  deviceInfo = null;
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  length: any;
  length2: any;
  actualPage: any = 1;
  actualPage2: any = 1;
  filterColumn: string;
  filterColumn2: string;
  filterType: string;
  filterType2: string;
  disableButton: boolean = false;
  darkMode: boolean = true;
  pageSizeOptions: number[] = [10, 15, 20, 25];
  columnas = [{
    columnDef: 'mov_id',
    header: 'Codigo',
    width: '5%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_id}`,
  },{
    columnDef: 'mov_fecha',
    header: 'Fecha',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_fecha}`,
  },{
    columnDef: 'mov_hora',
    header: 'Hora',
    width: '5%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_hora}`,
  },{
    columnDef: 'mov_cantidad',
    header: 'Productos',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_cantidad}`,
  },{
    columnDef: 'mov_recibido',
    header: 'Recibido',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `$ ${this.numberFormat.format(element.mov_recibido)}`,
  },{
    columnDef: 'mov_cambio',
    header: 'Cambio',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `$ ${this.numberFormat.format(element.mov_cambio)}`,
  },{
    columnDef: 'mov_iva',
    header: 'Iva(%)',
    width: '5%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_iva}`,
  },{
    columnDef: 'mov_total',
    header: 'Total',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `$ ${this.numberFormat.format(element.mov_total)}`,
  },{
    columnDef: 'mov_total_iva',
    header: 'Total Pagado',
    width: '10%',
    sort: false,
    type: 'text',
    cell: (element: any) => `$ ${this.numberFormat.format(element.mov_total_iva)}`,
  },{
    columnDef: 'icons',
    header: '',
    width: '5%',
    sort: false,
    type: 'icon',
    cell: (element: any) => `${element.icons}`,
  }];
  columnas2 = [{
    columnDef: 'mov_id',
    header: 'Codigo',
    width: '5%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_id}`,
  },{
    columnDef: 'mov_fecha',
    header: 'Fecha',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_fecha}`,
  },{
    columnDef: 'mov_hora',
    header: 'Hora',
    width: '5%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_hora}`,
  },{
    columnDef: 'mov_cantidad',
    header: 'Productos',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_cantidad}`,
  },{
    columnDef: 'mov_moneda',
    header: 'Moneda',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.mov_moneda}`,
  },{
    columnDef: 'mov_total',
    header: 'Total',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `$ ${this.numberFormat.format(element.mov_total)}`,
  }];
  initialTab: number = 1;
  currentTab: number = 1;
  optionsTabs: any = [{
    code: 1,
    name: 'Información del Usuario',
    show: true,
    disabled: false
  }]
 


  constructor(
    private UsersAPI: UsersService,
    private settings: SettingsService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private generalService: GeneralService
  ) { }
 
  
  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.darkMode = JSON.parse(localStorage.getItem('theme'));
    
    if(this.router.url == '/usuarios/create'){
      this.validateUrl = 1;
      this.titleButton = 'Registrar usuario'
      this.user = 'Nuevo Usuario';
      this.columns = 3;
      this.readonlyInputs = false;
      this.photoPerfil = 'assets/img/logo.png'
      this.messageTxt = 'Creando usuario, por favor espere';
      this.allRoles();
      
    }
    else if(this.router.url == '/usuarios/editar/'+this.routerActive.snapshot.params.id){
      this.settings.viewsnack('Buscando Información del usuario', 'Loading', 1500)
      this.validateUrl = 3;
      this.titleButton = 'Actualizar'
      this.user = 'Información del Usuario';
      this.columns = 3;
      this.readonlyInputs = false;
      this.messageTxt = 'Actualizando usuario, por favor espere';
      this.allRoles();
      this.getByIdentificacion(this.routerActive.snapshot.params.id);
    }
    else if(this.router.url == '/miperfil'){      
      this.settings.viewsnack('Buscando Información del usuario', 'Loading', 1500)
      this.validateUrl = 3;
      this.titleButton = 'Actualizar'
      this.user = 'Mi Perfil';
      this.columns = 3;
      this.messageTxt = 'Actualizando usuario, por favor espere';
      this.allRoles();
      this.getByIdentificacion(JSON.parse(localStorage.getItem('userInfo')).usu_identificacion);
      this.readonlyInputs = true;
      this.optionsTabs.push({
        code: 4,
        name: 'Configuración',
        show: true,
        disabled: false
      })
    }
    else{ 
      this.validateUrl = 2;
      this.titleButton = 'Registrarse'
      this.user = 'Nuevo Usuario';
      this.columns = 4;
      this.photoPerfil = 'assets/img/logo.png'
      this.messageTxt = 'Registrando usuario, por favor espere';
      this.readonlyInputs = false;
    }
  }

  saveSettings(){
    localStorage.setItem('theme', JSON.stringify(this.darkMode));
    this.UsersAPI.updateUserSettings({ide: this.identificacion, theme: JSON.stringify(this.darkMode)}).then((res:any)=>{
      this.settings.viewsnack(res.data, 'Success')
      this.settings.onSetTheme();
    })
  }

  downloadPDF(event){
    this.settings.viewsnack('Generando factura', 'Loading', 3000);
    this.generalService.downloadFiles(2, {invoice: event.mov_id})
  }


  getByIdentificacion(ide){
    this.UsersAPI.getUserByIdentificacion(ide).then((res:any)=>{
      this.optionsTabs.push({
        code: 2,
        name: 'Historial de Compras',
        show: true,
        disabled: false
      })

      if(res.data.usu_role_id == 1){
        this.optionsTabs.push({
          code: 3,
          name: 'Historial de Productos Adquiridos',
          show: true,
          disabled: false
        })
      }

      this.nombres = res.data.usu_nombre;
      this.apellidos = res.data.usu_apellido;
      this.identificacion = res.data.usu_identificacion;
      this.email = res.data.email; //@ts-ignore
      this.nacimiento = new Date (moment(res.data.usu_nacimiento));
      this.telefono = res.data.usu_telefono;
      this.rol = res.data.usu_role_id;
      this.photoPerfil = !res.data.usu_photo ? 'assets/img/logo.png' : res.data.usu_photo;
      this.photoSync = true;
      this.direccion = res.data.usu_direccion;
      this.ciudad = res.data.usu_ciudad;
      this.departamento = res.data.usu_departamento;
      this.pais = res.data.usu_pais;
      this.getDetailsUser(res.data.usu_identificacion);
    })
  }

  changeSort(item, num){
    if(num == 1 ){
      this.filterColumn = item.active;
      this.filterType = item.direction;
    }else{
      this.filterColumn2 = item.active;
      this.filterType2 = item.direction;
    }

    this.getDetailsUser(this.identificacion);
  }

  changePaginator(info, num) {

    if(num == 1 ){
      this.actualPage = info.pageIndex + 1;
      this.pageSize = info.pageSize;
    }else{
      this.actualPage2 = info.pageIndex + 1;
      this.pageSize2 = info.pageSize;
    }
  
    this.getDetailsUser(this.identificacion);
  }

  getDetailsUser(ide){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.filterColumn || 'mov_fecha',
      direction: this.filterType || 'asc',

      paginate2: this.pageSize2,
      page2: this.actualPage2,
      column2: this.filterColumn2 || 'mov_fecha',
      direction2: this.filterType2 || 'asc',
    }

    this.UsersAPI.detailsUser(ide, paginate).then((res:any)=>{
      console.log(res);
    
      res.shopping.map(buy => {
        buy.icons = {download: true} 
      });

      this.dataSource = new MatTableDataSource(res.shopping);
      this.dataSource2 = new MatTableDataSource(res.sales);
      this.length = res.totalShopping;
      this.length2 = res.totalSales;

   
    
      this.optionsTabs.map(option => {
        if(this.length == 0 && option.code == 2){
          option.disabled = true;
        }
        if(this.length2 == 0 && option.code == 3){
          option.disabled = true;
        }
      })
      
    })
  }

  allRoles(){
    this.generalService.getAllList().then((res:any)=>{
      this.listRoles = res.roles;
    })
  }

  async changePhoto(imageInput){
    const file: File = imageInput.files[0];
    
    if(!file){
      return  this.settings.viewsnack('No ha seleccionado ninguna imagen', 'Error')
    }
    const reader = new FileReader();

    await reader.addEventListener('load', async (event: any) => {
      this.photoPerfil = event.target.result
      this.photoSync = false;
    });

    await reader.readAsDataURL(file);
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
    if(number == 3){
      document.getElementById("iconVisibility1").style.display = 'none';
      document.getElementById("iconVisibilityOff1").style.display = 'block';
      this.typePass1 = 'text';
    }
    if(number == 4){
        document.getElementById("iconVisibility1").style.display = 'block';
        document.getElementById("iconVisibilityOff1").style.display = 'none';
        this.typePass1 = 'password';
    }
  }

  guardar(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let diff = moment().diff(this.nacimiento, 'years');
  
    if(!this.nombres){
      return this.settings.viewsnack('Los nombres son obligatorios', 'Error');
    }
    if(!this.apellidos){
      return this.settings.viewsnack('Los apellidos son obligatorios', 'Error');
    }
    if(!this.identificacion){
      return this.settings.viewsnack('El numero de identificación es obligatorio', 'Error');
    }
    if(String(this.identificacion).length < 6){
      return this.settings.viewsnack('El numero de identificación es muy corto', 'Error');
    }
    if(!this.email){
      return this.settings.viewsnack('El email es obligatorio', 'Error');
    }
    if(!emailRegex.test(this.email)){
      return this.settings.viewsnack('El formato del email es invalido', 'Error');
    }
    if(this.validateUrl != 3){
      if(!this.password ){
        return this.settings.viewsnack('La contraseña es obligatoria', 'Error');
      }
    }
    if(this.password){
      if(!this.varifyPassord){
        return this.settings.viewsnack('La verificación de contraseña es obligatoria', 'Error');
      }
      if(this.password.length < 8){
        return this.settings.viewsnack('La contraseña debe tener minimo 8 caracteres', 'Error');
      }
      if(this.varifyPassord.length < 8){
        return this.settings.viewsnack('La verificación contraseña debe tener minimo 8 caracteres', 'Error');
      }
      if(this.password != this.varifyPassord){
        return this.settings.viewsnack('La verificación debe ser igual a la contraseña', 'Error');
      }
    }
    if(!this.nacimiento){
      return this.settings.viewsnack('La fecha de nacimiento es obligatoria', 'Error');
    }
    if(diff < 8){
      return this.settings.viewsnack('Debe ser mayor de 8 años', 'Error');
    }
    if(!this.telefono){
      return this.settings.viewsnack('El numero de telefono es obligatorio', 'Error');
    }
    if(!this.direccion){
      return this.settings.viewsnack('La dirección es obligatoria', 'Error');
    }
    if(!this.ciudad){
      return this.settings.viewsnack('La ciudad es obligatoria', 'Error');
    }
    if(!this.departamento){
      return this.settings.viewsnack('El departamento es obligatorio', 'Error');
    }
    if(String(this.telefono).length != 10){
      return this.settings.viewsnack('El numero de telefono dede tener 10 digitos', 'Error');
    }
    if(!this.rol && this.validateUrl != 2){
      return this.settings.viewsnack('El rol es obligatorio', 'Error');
    }
    this.disableButton = true;
    this.settings.viewsnack(this.messageTxt, 'Loading', 5000);
    let code = String(Math.floor(Math.random() * (999999 - 111111)) + 111111);
    
    const body: any = {
      
      nombres: this.nombres,
      apellidos: this.apellidos,
      identificacion: this.identificacion,
      email: this.email,
      password: !this.password ? null : bcrypt.hashSync(this.password, 10),
      nacimiento: moment(this.nacimiento).format('YYYY-MM-DD'),
      direccion: this.direccion,
      ciudad: this.ciudad,
      departamento: this.departamento,
      pais: this.pais,
      telefono: this.telefono,
      codigo: bcrypt.hashSync(code, 10),
      view: code,
      rol: !this.rol ? 2 : this.rol,
      
    }

    body.info = JSON.stringify(body)
    body.device = this.deviceInfo
    body.infoDate = {
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss'),
    }
    body.img = this.photoPerfil != 'assets/img/logo.png' && !this.photoSync ? this.photoPerfil : null
   

    if(this.validateUrl == 1) {

      this.UsersAPI.registrerUser(body, 1).then((res:any)=>{
        console.log(res.data, this.validateUrl);
        
        if(!res.create){
          this.settings.viewsnack(res.data, 'Error');
          this.disableButton = false;

        }else{
          this.settings.viewsnack(res.data, 'Success');
          this.router.navigateByUrl('/usuarios');
        }
      })
    }

    if(this.validateUrl == 2){
            this.UsersAPI.registrerClients(body).then((res:any)=>{
        console.log(res.data, this.validateUrl);

        if(!res.create){
          this.settings.viewsnack(res.data, 'Error');
          this.disableButton = false;

        }else{
          this.settings.viewsnack(res.data, 'Success');
          this.router.navigateByUrl('/login');
        }
      })
    }

    if(this.validateUrl == 3){
      this.UsersAPI.updateUser(body).then((res:any)=>{
        this.password = null;
        this.varifyPassord = null;
        this.photoSync = true;
        this.settings.viewsnack('Se actualizo la informacion del usuario', 'Success')
      })
    }
  }

}
