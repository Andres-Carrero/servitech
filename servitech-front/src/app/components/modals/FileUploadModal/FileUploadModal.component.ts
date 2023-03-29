import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from "src/environments/environment";
import { ProductosService } from 'src/app/services/productos.service';
import { SettingsService } from 'src/app/config/settings.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-FileUploadModal',
  templateUrl: './FileUploadModal.component.html',
  styleUrls: ['./FileUploadModal.component.scss']
})
export class FileUploadModalComponent implements OnInit {
  dataListTitle1: string;
  dataListTitle2: string;
  dataListTitle3: string;

  dataList1: any = [];
  dataList2: any = [];
  dataList3: any = [];

  constructor(
    private productosApi: ProductosService,
    private settings: SettingsService,
    public dialogRef: MatDialogRef<FileUploadModalComponent>,
    private generalService: GeneralService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    /*switch (this.data.type) {
      case 1:
        console.log('TIPO: producto');
        this.getListsProductos();
      break;
    
      default:
      break;
    }*/
  }

  downloadFormats(){
    this.settings.viewsnack('Generando plantilla', 'Loading', 2000);
    this.generalService.downloadFiles(this.data.type);
  }

  updateExcel(files){
    if (!files[0]) {
      this.settings.viewsnack('No hay archivo seleccionado', 'Error')
      return;
    }
    if(!files[0].name.match(/\.(xlsx|XLSX)/)){
      this.settings.viewsnack('Formato Invalido', 'Error')
    }

    const formData = new FormData()
    formData.append("file", files[0]);

    switch (this.data.type) {
      case 1:
        this.productosApi.uploadExcel(formData).then((res:any)=>{
          this.dialogRef.close();
        })
     
      break;
    
      default:
      break;
    }
  }

}
