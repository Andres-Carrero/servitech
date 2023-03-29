import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/config/settings.service';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productsDetails',
  templateUrl: './productsDetails.component.html',
  styleUrls: ['./productsDetails.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  numberFormat: any = new Intl.NumberFormat('en-US')
  listTipos: any = [];
  listPhotos: any = [];
  listUbicaciones: any = [];
  listEspecificacion: any = [];
  listLineas: any = [
    {id: 1, value: 'Accesorios'},
    {id: 2, value: 'Partes'},
    {id: 3, value: 'Ensablados'},
  ];
  listImporancia: any = [
    {id: 5, value: 'Superior'},
    {id: 4, value: 'Alto'},
    {id: 3, value: 'Medio'},
    {id: 2, value: 'Baja'},
    {id: 1, value: 'Insignificante'},
    {id: 0, value: 'Ninguna'}
  ];
  ocultCamera: boolean = true;
  codigo: number;
  nombre: string;
  marca: string;
  linea: number;
  tipo: number;
  ubicacion: number;
  iva: number;
  deletesImg: any = [];
  deletesEspe: any = [];
  countImg: number = 0;
  ocult: boolean = false;
  title: string = '';
  createOrUpdate: boolean;
  id_product: number;
  readonly: boolean;
  precio: string;
  cantidad: number;
  titleButton: string;
  initialTab: number = 1;
  currentTab: number = 1;
  optionsTabs: any = [{
    code: 1,
    name: 'Detalles',
    show: true
  },{
    code: 2,
    name: 'Imagenes',
    show: true
  },{
    code: 3,
    name: 'Especificaciones',
    show: true
  }]
  validateNewProduct: number


  constructor(
    private productosAPI: ProductosService,
    private settings: SettingsService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private generalService: GeneralService,
  ) { }

  async ngOnInit() {
    await this.getLists();
    if(!this.routerActive.snapshot.params.id){
      this.createOrUpdate = true;
      this.validateNewProduct = 1;
      this.readonly = false;
      this.title = 'Nuevo Producto';
      this.titleButton = 'Crear'
    }else{
      this.id_product = JSON.parse(this.routerActive.snapshot.params.id);
      this.settings.viewsnack('Cargando Información', 'Loading', 1500)
      this.readonly = true;
      this.validateNewProduct = 2;
      this.createOrUpdate = false;
      this.title = 'Actualizar Producto';
      this.titleButton = 'Actualizar'

      this.getDetailsProductos()
    }
  }

  async getDetailsProductos(){
    this.productosAPI.getProductoByCodigo(this.id_product).then((res:any)=>{
      console.log(res);
      
      if(res.data != null){
        this.codigo = res.data.prod_id;
        this.nombre = res.data.prod_nombre;
        this.marca = res.data.prod_marca;
        this.iva = res.data.prod_iva;
        this.linea = res.data.prod_linea;
        this.ubicacion = res.data.prod_ubicacion_id;
        this.tipo = res.data.prod_tipo_id;
        this.precio = `$ ${this.numberFormat.format(res.data.prod_precio_venta.toFixed(0))}`;
        this.cantidad = res.data.prod_cantidad;

        for (let i = 0; i < res.img.length; i++) {
          this.countImg = this.countImg+1;
          this.listPhotos.push({
            id: this.listPhotos.length+1,
            sync: 'SI',
            img: res.img[i].img_descripcion,
            product: this.codigo
          })
        }

        for (let e = 0; e < res.especificaciones.length; e++) {
          const element = res.especificaciones[e];
          this.listEspecificacion.push({
            id: this.listEspecificacion.length+1,
            title: element.esp_titulo,
            descripcion: element.esp_descripcion,
            sync: 'SI',
            importancia: element.esp_importancia,
          })
        }
        this.validateLength();
      }else{
        this.settings.viewsnack('No Existe un producto con este codigo', 'Error', 1000);
        setTimeout(() => {
          this.router.navigateByUrl('/productos/create')
        }, 1500);
      }
    })
  }

  savedProductos(){
    if(!this.codigo){
      return this.settings.viewsnack('El codigo es obligatorio', 'Error');
    }
    if(!this.nombre){
      return this.settings.viewsnack('El nombre es obligatorio', 'Error');
    }
    if(!this.marca){
      return this.settings.viewsnack('La marca es obligatoria', 'Error');
    }
    if(!this.linea){
      return this.settings.viewsnack('La linea es obligatoria', 'Error');
    }
    if(!this.ubicacion){
      return this.settings.viewsnack('La ubicacion es obligatoria', 'Error');
    }
    if(!this.tipo){
      return this.settings.viewsnack('El tipo de producto obligatorio', 'Error');
    }
    if(this.listPhotos.length == 0){
      return this.settings.viewsnack('Debe seleccionar por lo menos una imagen', 'Error');
    }
    if(this.listEspecificacion.length == 0){
      return this.settings.viewsnack('Debe tener una especificación del producto', 'Error');
    }
    this.settings.viewsnack('Guardando Información del Producto', 'Loading', 5000);


    let newsImgs = [];
    let newsEspe = [];
    for (let i = 0; i < this.listPhotos.length; i++) {
      if(this.listPhotos[i].sync == 'NO'){
        newsImgs.push({
          id: this.listPhotos[i].id,
          sync: 'NO',
          img:  this.listPhotos[i].img,
          product: this.codigo
        })
      }
    }

    for (let e = 0; e <  this.listEspecificacion.length; e++) {
      if(this.listEspecificacion[e].sync == 'NO'){
        newsEspe.push({
          id: this.listEspecificacion.length+1,
          title: this.listEspecificacion[e].title,
          descripcion: this.listEspecificacion[e].descripcion,
          sync: this.listEspecificacion[e].sync,
          importancia: this.listEspecificacion[e].importancia,
        })
      }
    }


    const body = {
      codigo: this.codigo,
      nombre: this.nombre,
      marca: this.marca,
      linea: this.linea,
      ubicacion: this.ubicacion,
      tipo: this.tipo,
      iva: this.iva,
      fotos: newsImgs,
      especificaciones: newsEspe,
      deletesImg: this.deletesImg,
      deletesEspe: this.deletesEspe,
      validate: this.validateNewProduct
    };

    this.productosAPI.savedProductos(body).then((res:any)=>{
      console.log({res});
      if(res.redirect){
        this.settings.viewsnack('Se guardo el producto correctamente', 'Success');
        this.router.navigateByUrl('/productos');
      }else{
        this.settings.viewsnack('El producto ya esta registrado', 'Error');

      }
      
      
    })
  }

  getLists(){
    this.generalService.getAllList().then((res:any)=>{
      this.listUbicaciones = res.ubicaciones;
      this.listTipos = res.tipos;
    })
  }

  async newEspecificacion(){
    if(this.listEspecificacion.length > 19){
      this.ocult = true;
      return this.settings.viewsnack(`Ya tiene el limite de especificaciones`, 'Error');
    }

    for (let i = 0; i < this.listEspecificacion.length; i++) {
      const element = this.listEspecificacion[i];

      if(!element.title){
        this.ocult = true;
        return this.settings.viewsnack(`El titulo de la especificación #${i+1} es obligatorio`, 'Error');
      }
      if(!element.descripcion){
        this.ocult = true;
        return this.settings.viewsnack(`La descripción de la especificación #${i+1} es obligatoria`, 'Error');
      }
    }

    this.listEspecificacion.push(
      {id: this.listEspecificacion.length+1, title: '', descripcion: '', sync: 'NO', importancia: 0},
    )
  }

  deleteEspe(index, item){  
    this.listEspecificacion.splice(index, 1);
    if(item.sync == 'SI'){
      this.deletesEspe.push(item);
    }
    this.settings.viewsnack('Se elimino la especificación correctamente', 'Success');
  }

  changeButton(){
    if(this.listEspecificacion.length > 19){
      this.ocult = true;
      return
    }

    this.ocult = false;
  }

  async deleteArrayImg(index, item){
    this.countImg = this.countImg-1;
    this.listPhotos.splice(index, 1);
    if(item.sync == 'SI'){
      this.deletesImg.push(item);
    }
    this.settings.viewsnack('Se elimino la imagen correctamente', 'Success');

    await this.validateLength();
  }

  async addImg(imageInput){
    const file: File = imageInput.files[0];
    if(!file){
      return  this.settings.viewsnack('No ha seleccionado ninguna imagen', 'Error')
    }
    const reader = new FileReader();

    await reader.addEventListener('load', async (event: any) => {
      this.countImg = this.countImg+1;
      this.listPhotos.push({
        id: this.listPhotos.length+1,
        sync: 'NO',
        img: event.target.result,
        product: this.codigo
      })
      await this.validateLength();
    });

    await reader.readAsDataURL(file);
  }

  validateLength(){
    if(this.countImg > 4){
      this.ocultCamera = false;
    }else{
      this.ocultCamera = true;
    }
  }

}
