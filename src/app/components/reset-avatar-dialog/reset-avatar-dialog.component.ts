import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

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

  constructor(public dialogRef: MatDialogRef<ResetAvatarDialogComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
      this.progressMode = 'query'
    } else {
      this.snackBar.open(
        "Selecione um arquivo JPG / JPEG / PNG / BMP",
        "Entendi",
        { duration: 5000 }
      );
    }
  }
}
