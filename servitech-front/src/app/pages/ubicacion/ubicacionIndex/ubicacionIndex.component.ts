import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UbicacionService } from "src/app/services/ubicacion.service";

@Component({
  selector: 'app-ubicacionIndex',
  templateUrl: './ubicacionIndex.component.html',
  styleUrls: ['./ubicacionIndex.component.scss']
})
export class UbicacionIndexComponent implements OnInit {
  pageSize: number = 10;
  actualPage: any = 1;
  filterColumn: string;
  filterType: string;
  pageSizeOptions: number[] = [10, 15, 20, 25];
  dataSource = new MatTableDataSource();
  length: any;
  columns = [{
      columnDef: 'ubi_id',
      header: 'Codigo',
      width: '5%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.ubi_id}`,
    },{
      columnDef: 'ubi_descripcion',
      header: 'Nombre',
      width: '95%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.ubi_descripcion}`,
    },
  ];
  codigo: number;
  descripcion: string;
  

  constructor(
    private ubicacionApi: UbicacionService,
  ) { }

  ngOnInit() {
    this.obtenerubicacion();
  }

  changeSort(item){
    this.filterColumn = item.active;
    this.filterType = item.direction;
    this.obtenerubicacion();
  }

  changePaginator(info) {
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.obtenerubicacion();
  }

  obtenerubicacion(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.filterColumn || 'ubi_id',
      direction: this.filterType || 'asc',
      search: {
        codigo: this.codigo,
        des: this.descripcion,
      }
    }

    this.ubicacionApi.getUbicacion(paginate).then((res:any)=>{
      this.dataSource = new MatTableDataSource(res.data)
      this.length = res.data.length;
      
    })
  }

}
