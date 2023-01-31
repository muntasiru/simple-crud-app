import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box-dialog',
  templateUrl: './confirm-box-dialog.component.html',
  styleUrls: ['./confirm-box-dialog.component.scss'],
})
export class ConfirmBoxDialogComponent {
  public confirmMessage: string;

  /**
   * Constructor
   *
   * @param dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.confirmMessage = data.confirmMessage;
  }

  
}
