import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, timer } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-reset-avatar-dialog',
  templateUrl: './reset-avatar-dialog.component.html',
  styleUrls: ['./reset-avatar-dialog.component.scss']
})
export class ResetAvatarDialogComponent implements OnInit {
  avatar: string;
  avatarImage: File;
  progressMode = 'buffer';
  upPercentage$: Observable<number>;
  ready = false;
  cancel = true;


  constructor(public dialogRef: MatDialogRef<ResetAvatarDialogComponent>, private snackBar: MatSnackBar, private fireSrv: FirebaseService) { }

  ngOnInit(): void { }

  round(valueToRound: number): number {
    return Math.round(valueToRound);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(file: File) {
    if (
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/bmp"
    ) {
      this.avatarImage = file;
      const hash = Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000)
      this.avatar = `${hash}-${file.name}`;
      this.ready = true
    } else {
      this.snackBar.open(
        "Selecione um arquivo JPG / JPEG / PNG / BMP",
        "Entendi",
        { duration: 5000 }
      );
    }
  }

  async upload() {
    try {
      const tarefaUpload = this.fireSrv.uploadFile(`avatars/${this.avatar}`, this.avatarImage);
      this.progressMode = 'determinate';
      this.upPercentage$ = tarefaUpload.percentageChanges();
      this.cancel = false;
      this.ready = false;
      await tarefaUpload;
      await timer(500).toPromise();
      this.dialogRef.close(this.avatar);
    } catch (error) {
      console.log(error);
      this.snackBar.open(`Algo deu errado: ${error}`, 'Entendi', { duration: 5000 });
      this.cancel = true;
      this.ready = true;
    }

  }
}
