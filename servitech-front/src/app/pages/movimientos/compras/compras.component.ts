import { Component, OnInit } from '@angular/core';
import { MovimientosService } from 'src/app/services/movimientos.service';
import * as moment from 'moment';
import { SettingsService } from 'src/app/config/settings.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  numberFormat: any = new Intl.NumberFormat('en-US')
  moneda: string = 'COP';
  product: string = '';
  total: number = 0;
  totalView: string = '$ 0';
  proveedor: number;
  listProductos: any = [];
  listOptionsProductos: any = [];
  listProvedores: any = [];
  listMoneda: any = [
    {id: 'COP', value: 'COP'},
    {id: 'USD', value: 'USD'},
    {id: 'EUR', value: 'EUR'},
  ];
  validateTime: any;
  validateTimeSearch: any;

  validateArrayTime: any = [];
  

  constructor(
    private movimientosApi: MovimientosService,
    private settings: SettingsService,
    private generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.getAllData();
  }

  saved(){

    if(!this.proveedor){
      this.settings.viewsnack('Debe seleccionar un proveedor', 'Error');
      return;
    }
    if(this.listProductos.length == 0){
      this.settings.viewsnack('Debe agregar productos', 'Error');
      return;
    }
    for (let index = 0; index < this.listProductos.length; index++) {
      

      if(this.listProductos[index].cantidad < 1){
        this.listProductos[index].cantidad = null;
        document.getElementById('cantidadInput_'+index).focus();
        this.settings.viewsnack('Hace falta la cantidad de '+ this.listProductos[index].prod_nombre, 'Error')
        return
      }
      if(!this.listProductos[index].precio){
        document.getElementById('precioInput_'+index).focus();
        this.settings.viewsnack('Hace falta el precio unitario de '+this.listProductos[index].prod_nombre, 'Error')
        return;
      }
    }

    this.settings.viewsnack('Cargando la información', 'Loading', 5000);


    const body = {
      products: this.listProductos,
      total: this.total,
      moneda: this.moneda,
      proveedor: this.proveedor,
      fecha: moment().format('YYYY-MM-DD'),
      hora: moment().format('HH:mm:ss'),
    }
    this.movimientosApi.createdNewCompra(body).then((res:any)=>{
      this.listProductos = [];
      this.proveedor = null;
      this.total = null;
      this.totalView = '$ 0';
      this.settings.viewsnack('Se agregaron los productos correctamente', 'Success')
      
    })
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
    }

    if(!validation){
      option.cantidad = 1;
      option.convert = null;
      option.convertView = '$ 0';
      option.precio = null;
      option.precioTotal = null;
      option.precioTotalView = '$ 0';
      option.loading = false;
      this.listOptionsProductos = [];
      this.listProductos.push(option);
      this.calculateTotal()

    }else{
      this.settings.viewsnack('Ya se existe este producto en la lista', 'Error');
    }
  }

  getAllData(){
    this.generalService.getAllList().then((res:any)=>{
      this.listProvedores = res.proveedores;
    })
  }

  changeTypeMoney(){
    this.totalView = `Calculando...`

    if(this.moneda != 'COP'){

      for (let i = 0; i < this.listProductos.length; i++) {
        const element = this.listProductos[i];
        element.loading = true;
        this.convertMoneda(element.precio, i, 2);
        
      }
    }else{
      for (let i = 0; i < this.listProductos.length; i++) {
        const element = this.listProductos[i];
        element.precioTotal = element.precio*element.cantidad;
        element.precioTotalView = `$ ${this.numberFormat.format(element.precioTotal)}`
        this.calculateTotal();
      }
    }
   
  }

  convertMoneda(valor, index, number){
    if(this.moneda != 'COP'){
      this.generalService.convertMoney(this.moneda, valor).then((res:any)=>{
        const item = this.listProductos[index];
        item.loading = false;
        item.convert = JSON.parse(res.data.toFixed(0));
        item.convertView = '$ '+this.numberFormat.format(JSON.parse(res.data.toFixed(0)));
        item.precioTotal = JSON.parse(item.convert)*item.cantidad;
        item.precioTotalView = `$ ${this.numberFormat.format(item.precioTotal)}`
        this.calculateTotal();
      })
    }
   
  }



  calculate(index){
    const item = this.listProductos[index];
  
    if(!item.precio){
      return this.settings.viewsnack('Hace falta el precio unitario de '+item.prod_nombre, 'Error');
    }
    if(item.cantidad < 1){
      item.cantidad = null;
      return this.settings.viewsnack('Hace falta la cantidad de '+ item.prod_nombre, 'Error');
    }
    if(String(item.precio).length > 9){
      item.precio = null;
      item.precioTotal = 0;
      item.precioTotalView = `$ 0`;
      this.calculateTotal();
      return this.settings.viewsnack('El precio de '+item.prod_nombre+' no puede exceder 9 cifras', 'Error');
    }
    if(item.cantidad > 1000){
      item.cantidad = null;
      return this.settings.viewsnack('La cantidad de '+ item.prod_nombre + 'debe ser menor a 1000', 'Error');
    }
    item.loading = true;
    this.totalView = `Calculando...`

    

    if(this.moneda != 'COP'){
      clearTimeout(this.validateTime); 
      this.validateTime = setTimeout(() => {
        this.convertMoneda(item.precio, index, 1);
      }, 3000);
    }else{
      item.loading = false;
      item.precioTotal = item.precio*item.cantidad;
      item.precioTotalView = `$ ${this.numberFormat.format(item.precioTotal)}`
      this.calculateTotal();
    }

    

  }

  calculateTotal(){
    let total = 0;
    for (let i = 0; i < this.listProductos.length; i++) {
      const element = this.listProductos[i];
      total = total+element.precioTotal;
    }

    this.total = total;
    this.totalView = `$ ${this.numberFormat.format(this.total)}`

  }


  validateProducts(){
    clearTimeout(this.validateTimeSearch); 
    if(this.product.length > 0){
      this.validateTimeSearch = setTimeout(() => {
        this.getAllProductos();
      }, 1500);
    }else{
      this.listOptionsProductos = [];
    }
  }

  getAllProductos(){
    this.listOptionsProductos = [];

    this.movimientosApi.getProductosAll({search: this.product, cant: 0}).then((res:any)=>{
      if(this.product.length > 0){
        this.listOptionsProductos = res.data;
      }else{
        this.listOptionsProductos = [];
      }
    })
  }

}
