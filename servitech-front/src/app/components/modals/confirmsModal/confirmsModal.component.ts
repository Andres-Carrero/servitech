import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmsModal',
  templateUrl: './confirmsModal.component.html',
  styleUrls: ['./confirmsModal.component.scss']
})
export class ConfirmsModalComponent implements OnInit {
  type: any;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    console.log(this.data);
    
  }

  confirms(res) {
    this.dialogRef.close(res);
  }

}
