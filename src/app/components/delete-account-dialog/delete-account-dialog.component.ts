import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {

  accepted = false;

  constructor(private dialogRef: MatDialogRef<DeleteAccountDialogComponent>, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async deleteAccount() {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question: "Tem certeza que deseja desativar sua conta ?" },
    });

    try {
      const confirmation = await confirmDialogRef.afterClosed().toPromise();
      if (confirmation) {
        this.dialogRef.close(true);
      }
    } catch (error) {
      console.log(error);
      this.snackBar.open(`Algo deu errado: ${error}`, 'Entendi', { duration: 5000 });
    }
  }

}
