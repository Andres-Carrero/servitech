import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/config/settings.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProductosService } from 'src/app/services/productos.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carritoClient',
  templateUrl: './carritoClient.component.html',
  styleUrls: ['./carritoClient.component.scss']
})
export class CarritoClientComponent implements OnInit {
internationalNumberFormat: any = new Intl.NumberFormat('en-US');
initialTab: number = 2;
currentTab: number
optionsTabs: any = [{
  code: 2,
  name: 'Información de los Productos',
  show: true,
  disabled: false
},{
  code: 3,
  name: 'Información de la Compra',
  show: true,
  disabled: true
}]
userInfo: any;
totalView: string = '$ 0';
listProductos: any = [];
total: number = 0;
iva: number = 0;
ivaTotal: number = 0;
ivaTotalView: string = '$ 0';
nameClient: string;

  constructor(
    private productosAPI: ProductosService,
    private settings: SettingsService,
    private movimientosApi: MovimientosService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.nameClient = this.userInfo.usu_nombre+' '+this.userInfo.usu_apellido;
    this.getProductos()
  }

  saved(){
    const body = {
      totalProducts: this.total,
      totalIva: JSON.parse(String(this.ivaTotal).split('.')[0]),
      iva: JSON.parse(String(this.iva).split('.')[0]),
      recibido: 0,
      cambio: 0,
      fecha: moment().format('YYYY-MM-DD'),
      hora: moment().format('HH:mm:ss'),
      listProduct: this.listProductos,
      clientSelect: this.userInfo
    }

    this.movimientosApi.createdNewVenta(body).then((res:any)=>{
      this.settings.viewsnack('Se realizo la compra correctamente', 'Success');
      localStorage.removeItem('carrito');
      this.router.navigateByUrl('/dashboard');
    })

  }

  getProductos(){
    let carrito = localStorage.getItem('carrito');
    console.log(carrito);
    
    if(!carrito){
      this.settings.viewsnack('No hay productos en el carrito', 'Error');
      return;
    }


    this.productosAPI.getProductosArray({codigo: JSON.parse(carrito)}).then((res:any)=>{
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].buyCantidad = 1;
        res.data[i].prod_precio = '$ '+this.internationalNumberFormat.format(res.data[i].prod_precio_venta);
        res.data[i].subTotalView = '$ '+this.internationalNumberFormat.format(res.data[i].buyCantidad*res.data[i].prod_precio_venta);
        res.data[i].subTotal = res.data[i].buyCantidad*res.data[i].prod_precio_venta;
      }
      this.listProductos = res.data;
      this.calculateTotal();
    })
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
    this.optionsTabs[1].disabled = false;

  }
}
