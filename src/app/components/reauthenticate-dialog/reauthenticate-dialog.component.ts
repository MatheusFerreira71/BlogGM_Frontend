import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReauthenticateDialogData } from 'src/app/interfaces';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-reauthenticate-dialog',
  templateUrl: './reauthenticate-dialog.component.html',
  styleUrls: ['./reauthenticate-dialog.component.scss']
})
export class ReauthenticateDialogComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);
  hidePass = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReauthenticateDialogData,
    public dialogRef: MatDialogRef<ReauthenticateDialogComponent>,
    private fireSrv: FirebaseService
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "Informe um e-mail";
    }

    return this.email.hasError("email") ? "E-mail não válido" : "";
  }


  reauthenticate(): void {
    
    this.dialogRef.close();
  }
}
