import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/services/users.service";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmsModalComponent } from 'src/app/components/modals/confirmsModal/confirmsModal.component';
import { SettingsService } from 'src/app/config/settings.service';

@Component({
  selector: 'app-usuariosIndex',
  templateUrl: './usuariosIndex.component.html',
  styleUrls: ['./usuariosIndex.component.scss']
})
export class UsuariosIndexComponent implements OnInit {
  pageSize: number = 10;
  dataSource = new MatTableDataSource();
  length: any;
  actualPage: any = 1;
  filterColumn: string;
  filterType: string;
  pageSizeOptions: number[] = [10, 15, 20, 25];
  columns = [{
      columnDef: 'usu_nombre',
      header: 'Nombre',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.usu_nombre}`,
    },{
      columnDef: 'usu_apellido',
      header: 'Apellido',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.usu_apellido}`,
    },{
      columnDef: 'usu_identificacion',
      header: 'Identificación',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.usu_identificacion}`,
    },{
      columnDef: 'email',
      header: 'Email',
      width: '20%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.email}`,
    },{
      columnDef: 'usu_telefono',
      header: 'Telefono',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.usu_telefono}`,
    },{
      columnDef: 'rol_descripcion',
      header: 'Rol',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.rol_descripcion}`,
    },{
      columnDef: 'est_descripcion',
      header: 'Estado',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.est_descripcion}`,
    },{
      columnDef: 'icons',
      header: '',
      width: '15%',
      sort: false,
      type: 'icon',
      cell: (element: any) => `${element.icons}`,
    }
  ];
  roles = [
    {id: 0, value: 'Todos'},
    {id: 1, value: 'Administrador'},
    {id: 2, value: 'Cliente'},
    //{id: 3, value: 'Vendedor'}
  ]
  status = [
    {id: 0, value: 'Todos'},
    {id: 1, value: 'Activos'},
    {id: 2, value: 'Inactivo'},
  ]
  nombres: string;
  identificacion: number;
  email: string;
  telefono: number;
  rol: number = 0;
  estado: number = 0;

  constructor(
    private UsersAPI: UsersService,
    private settings: SettingsService,
    private router: Router,
    private dialogCtrl: MatDialog
  ) { }

  ngOnInit() {
    this.getAll();
    //this.logout();
  }

  logout(){
    this.UsersAPI.logout().then((res:any)=>{
      console.log({res});
      
    })
  }

  getAll(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.filterColumn || 'usu_nombre',
      direction: this.filterType || 'asc',
      search: {
        nombre: this.nombres,
        ide: this.identificacion,
        email: this.email,
        tel: this.telefono,
        rol: this.rol,
        status: this.estado
      }
    }

    this.UsersAPI.getAllUsers(paginate).then((res:any)=>{
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].icons = {
          edit: res.data[i].usu_estado_id == 1 ? true : false,
          delete: res.data[i].usu_estado_id == 1 ? true : false,
          historial: res.data[i].usu_estado_id == 2 ? true : false
        }
      }
      this.dataSource = new MatTableDataSource(res.data)
      this.length = res.total;
    })
  }

  changeSort(item){
    this.filterColumn = item.active;
    this.filterType = item.direction;
    this.getAll();
  }

  changePaginator(info) {
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.getAll();
  }

  deleteItems(item){
    const dialogRef = this.dialogCtrl.open(ConfirmsModalComponent, {
      width: '25%',
      data: {
        title: 'Eliminar Usuario',
        message: `¿Seguro que desea eliminiar la cuenta del usuario ${item.usu_nombre} ${item.usu_apellido}?`,
        type: 1
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){ this.deleteUser(item.usu_identificacion, 2); }
    });
  }

  historialItems(item){
    const dialogRef = this.dialogCtrl.open(ConfirmsModalComponent, {
      width: '25%',
      data: {
        title: 'Restaurar Usuario',
        message: `¿Seguro que desea restaurar la cuenta del usuario ${item.usu_nombre} ${item.usu_apellido}?`,
        type: 1
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){ this.deleteUser(item.usu_identificacion, 1); }
    });
  }

  deleteUser(iden, status){
    this.UsersAPI.deleteUser(iden, status).then((res:any)=>{
      this.settings.viewsnack('Se elimino el usuario correctamente', 'Success');
      this.getAll();
    })
  }

  editItems(item) {
    const uuid = item.usu_identificacion;
    this.router.navigate(['usuarios/editar/' + uuid]);
  }

}
