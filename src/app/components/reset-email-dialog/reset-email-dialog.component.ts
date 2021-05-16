import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ResetEmailDialogData } from "src/app/interfaces";

@Component({
  selector: "app-reset-email-dialog",
  templateUrl: "./reset-email-dialog.component.html",
  styleUrls: ["./reset-email-dialog.component.scss"],
})
export class ResetEmailDialogComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResetEmailDialogData,
    public dialogRef: MatDialogRef<ResetEmailDialogComponent>
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "Informe um e-mail";
    }

    return this.email.hasError("email") ? "E-mail não válido" : "";
  }
}
