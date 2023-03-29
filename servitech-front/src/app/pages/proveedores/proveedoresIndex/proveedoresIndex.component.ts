import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedoresService } from "src/app/services/proveedores.service";

@Component({
  selector: 'app-proveedoresIndex',
  templateUrl: './proveedoresIndex.component.html',
  styleUrls: ['./proveedoresIndex.component.scss']
})
export class ProveedoresIndexComponent implements OnInit {
  pageSize: number = 10;
  actualPage: any = 1;
  filterColumn: string;
  filterType: string;
  pageSizeOptions: number[] = [10, 15, 20, 25];
  dataSource = new MatTableDataSource();
  length: any;
  columns = [{
      columnDef: 'prov_id',
      header: 'Codigo',
      width: '5%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prov_id}`,
    },{
      columnDef: 'prov_nombre',
      header: 'Proveedor',
      width: '70%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prov_nombre}`,
    },{
      columnDef: 'prov_email',
      header: 'Email',
      width: '15%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prov_email}`,
    },{
      columnDef: 'prov_telefono',
      header: 'Telefono',
      width: '10%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.prov_telefono}`,
    },
  ];

  codigo: number;
  nombre: string;
  email: string;

  constructor(
    private proveedoresApi: ProveedoresService,
  ) { }

  ngOnInit() {
    this.obtenerproveedores();
  }

  changeSort(item){
    this.filterColumn = item.active;
    this.filterType = item.direction;
    this.obtenerproveedores();
  }

  changePaginator(info) {
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.obtenerproveedores();
  }

  obtenerproveedores(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.filterColumn || 'prov_id',
      direction: this.filterType || 'asc',
      search: {
        codigo: this.codigo,
        nombre: this.nombre,
        email: this.email,
      }
    }

    this.proveedoresApi.getProveedores(paginate).then((res:any)=>{
      this.dataSource = new MatTableDataSource(res.data)
      this.length = res.total;
      
    })
  }

}
