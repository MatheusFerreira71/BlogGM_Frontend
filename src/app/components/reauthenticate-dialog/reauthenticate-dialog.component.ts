import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReauthenticateDialogData } from 'src/app/interfaces';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-reauthenticate-dialog',
  templateUrl: './reauthenticate-dialog.component.html',
  styleUrls: ['./reauthenticate-dialog.component.scss']
})
export class ReauthenticateDialogComponent implements OnInit {
  hidePass = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReauthenticateDialogData,
    public dialogRef: MatDialogRef<ReauthenticateDialogComponent>,
    private fireSrv: FirebaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async reauthenticate() {
    try {
      await this.fireSrv.reauthenticateWithEmail(this.data.email, this.data.password)
      this.dialogRef.close();
    } catch (error) {
      console.log(error);
      this.snackBar.open(`Algo deu errado ❌ ${error}`, 'OK', { duration: 5000 })
    }
  }
}
