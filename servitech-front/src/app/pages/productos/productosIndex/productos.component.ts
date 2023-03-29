import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from "src/app/services/productos.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmsModalComponent } from 'src/app/components/modals/confirmsModal/confirmsModal.component';
import { FileUploadModalComponent } from 'src/app/components/modals/FileUploadModal/FileUploadModal.component';
import { GeneralService } from 'src/app/services/general.service';
import { SettingsService } from 'src/app/config/settings.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  internationalNumberFormat: any = new Intl.NumberFormat('en-US')
  dataSource = new MatTableDataSource();
  length: any;
  pageSize: number = 10;
  actualPage: any = 1;
  filterColumn: string;
  filterType: string;
  listUbicaciones: any = [{
    ubi_id: 0, ubi_descripcion: 'Todos'
  }];
  listTipos: any = [{
    tipr_id: 0, tipr_descripcion: 'Todos'
  }];
  pageSizeOptions: number[] = [10, 15, 20, 25];
  columns = [{
      columnDef: 'prod_id',
      header: 'ID',
      width: '5%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prod_id}`,
    },{
      columnDef: 'prod_nombre',
      header: 'Producto',
      width: '18%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prod_nombre}`,
    },{
      columnDef: 'tipr_descripcion',
      header: 'Tipo',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.tipr_descripcion}`,
    },{
      columnDef: 'prod_cantidad',
      header: 'Cantidad',
      width: '10%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prod_cantidad}`,
    },{
      columnDef: 'prod_marca',
      header: 'Marca',
      width: '15%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prod_marca}`,
    },{
      columnDef: 'prod_precio_venta',
      header: 'Precio de venta',
      width: '10%',
      sort: true,
      type: 'text',
      cell: (element: any) => `$ ${this.internationalNumberFormat.format(element.prod_precio_venta)}`,
    },{
      columnDef: 'ubi_descripcion',
      header: 'Ubicacion',
      width: '15%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.ubi_descripcion}`,
    },{
      columnDef: 'est_descripcion',
      header: 'Estado',
      width: '5%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.est_descripcion}`,
    },{
      columnDef: 'icons',
      header: '',
      width: '20%',
      sort: false,
      type: 'icon',
      cell: (element: any) => `${element.icons}`,
    }
  ];
  codigo: number; 
  desc: string;
  marca: string;
  tipo: number = 0;
  ubicacion: number = 0;
  

  constructor(
    private productosApi: ProductosService,
    private router: Router,
    private dialogCtrl: MatDialog,
    private generalService: GeneralService,
    private settings: SettingsService,
  ) { }

  async ngOnInit() {
    await this.getEmptys();
    await this.getLists();
    await this.obtenerproductos();
  }

  async getEmptys(){
    this.productosApi.getProductoEmpty().then(async (res:any)=>{
      if(res.cantEmpty > 0){await this.settings.viewsnack(`${res.cantEmpty}/${res.total} productos estan agotados`, 'Info')}
      if(res.precioEmpty > 0){await this.settings.viewsnack(`${res.precioEmpty}/${res.total} productos no han sido adquiridos`, 'Info')}
      if(res.countEspe > 0){await this.settings.viewsnack(`${res.countEspe}/${res.total} productos no tienen especificaciones`, 'Error')}
      if(res.countImg > 0){await this.settings.viewsnack(`${res.countImg}/${res.total} productos no tienen imagenes`, 'Error')}
    })
  }


  getLists(){
    this.generalService.getAllList().then((res:any)=>{
      for (let u = 0; u < res.ubicaciones.length; u++) {
        this.listUbicaciones.push(res.ubicaciones[u]);
      }
      for (let u = 0; u < res.tipos.length; u++) {
        this.listTipos.push(res.tipos[u]);
      }
    })
  }
  changeSort(item){
    this.filterColumn = item.active;
    this.filterType = item.direction;
    this.obtenerproductos();
  }

  changePaginator(info) {
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.obtenerproductos();
  }

  openModalFiles(){
    const dialogRef = this.dialogCtrl.open(FileUploadModalComponent, {
      width: '75%',
      height: 'auto',
      data: {
        title: 'Carga Masiva de Productos',
        type: 1,
        notes: [
          {number: 1, msg: 'En la pagina "Carga de Productos" las columnas "Tipo", "Linea" y "Ubicación" de la plantilla. Se deben diligenciar con el código de las paginas "Lineas", "Tipos" y "Ubicaciones" que se encuentran en la plantilla.'},
          {number: 2, msg: 'En la pagina "Carga de Imagenes" la columna "url", se diligencia con el url o link de la imagen.'},
          {number: 3, msg: 'En la pagina "Carga de Especificaciones" la columna "Nivel de Importancia", se diligencia con el código de la pagina "Niveles de Prioridad" que se encuentran en la plantilla.'},

        ]
      },
    });
    dialogRef.afterClosed().subscribe(result => {   
      this.obtenerproductos();

      
    });
  }

  deleteItems(item){
    const dialogRef = this.dialogCtrl.open(ConfirmsModalComponent, {
      width: '25%',
      data: {
        title: 'Eliminar Producto',
        message: `¿Seguro que desea eliminiar este producto "${item.prod_nombre}"?`,
        type: 2
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productosApi.deleteProductos(item.prod_id, {hola: 'hola'}).then((res:any)=>{
          this.obtenerproductos();
        })
      }
    });
  }

  editItems(item) {
    const uuid = item.prod_id;
    this.router.navigate(['productos/editar/' + uuid]);
  }

  obtenerproductos(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.filterColumn || 'prod_id',
      direction: this.filterType || 'asc',
      search: {
        codigo: this.codigo,
        desc: this.desc,
        marca: this.marca,
        ubi: this.ubicacion,
        tipo: this.tipo
      }
    }

    this.productosApi.getProductos(paginate).then((res:any)=>{
      for (let i = 0; i < res.data.length; i++) {
        const data = res.data[i];
        console.log(data);
        
        res.data[i].icons = {
          edit: true,
          delete: res.data[i].prod_estado_id == 1 ? true : false,
        }
      }

      this.dataSource = new MatTableDataSource(res.data)
      this.length = res.total;
    })
  }

}
