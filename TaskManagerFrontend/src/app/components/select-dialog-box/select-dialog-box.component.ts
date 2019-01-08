import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-dialog-box',
  templateUrl: './select-dialog-box.component.html',
  styleUrls: ['./select-dialog-box.component.css']
})
export class SelectDialogBoxComponent {

  info: any;
  searchValue: string;

  constructor(
    public dialogRef: MatDialogRef<SelectDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.info = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
