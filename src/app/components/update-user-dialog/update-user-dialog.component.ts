import { F } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateUserDialogData } from 'src/app/interfaces';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateUserDialogData,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  onNoClick(form: NgForm) {
    if (form.dirty && form.touched) {
      const dialogRefConfirm = this.dialog.open(ConfirmDialogComponent, {
        data: { question: "Há dados não salvos. Deseja realmente voltar?" },
      });

      dialogRefConfirm.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close();
        }
      })
    } else this.dialogRef.close();
  }

}
