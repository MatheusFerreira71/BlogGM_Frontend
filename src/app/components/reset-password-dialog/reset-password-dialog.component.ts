import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordDialogData } from 'src/app/interfaces';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {

  hidePass = true;
  hideConfirm = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ResetPasswordDialogData, public dialogRef: MatDialogRef<ResetPasswordDialogComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  verifyEntry(): void {
    if (this.data.password !== this.data.confirmPassword) {
      this.snackBar.open('Senhas não coincidem!', 'OK', { duration: 5000 })
      this.dialogRef.close(undefined);
    }
  }

}
