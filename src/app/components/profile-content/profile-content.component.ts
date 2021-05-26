import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Reducers, ReturnedUser, UpdateUserDialogData } from "src/app/interfaces";
import { ComentarioService } from "src/app/services/comentario.service";
import { FirebaseService } from "src/app/services/firebase.service";
import { UserService } from "src/app/services/user.service";
import { setUser } from "src/app/store/actions";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { DeleteAccountDialogComponent } from "../delete-account-dialog/delete-account-dialog.component";
import { ReauthenticateDialogComponent } from "../reauthenticate-dialog/reauthenticate-dialog.component";
import { ResetAvatarDialogComponent } from "../reset-avatar-dialog/reset-avatar-dialog.component";
import { ResetEmailDialogComponent } from "../reset-email-dialog/reset-email-dialog.component";
import { ResetPasswordDialogComponent } from "../reset-password-dialog/reset-password-dialog.component";
import { UpdateUserDialogComponent } from "../update-user-dialog/update-user-dialog.component";

@Component({
  selector: "app-profile-content",
  templateUrl: "./profile-content.component.html",
  styleUrls: ["./profile-content.component.scss"],
})
export class ProfileContentComponent implements OnInit {
  user$: Observable<ReturnedUser>;
  loggedIn$: Observable<boolean>;
  user: ReturnedUser;
  userPic: string;
  isUserMe = false;
  commentCount$: Observable<Number>;

  constructor(
    private store: Store<Reducers>,
    private route: ActivatedRoute,
    private comentSrv: ComentarioService,
    private userSrv: UserService,
    private fireSrv: FirebaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.user$ = store.select((store) => store.AuthState.user);
    this.loggedIn$ = store.select((store) => store.AuthState.loggedIn);
  }

  ngOnInit(): void {
    this.checkRoute();
    this.loadUser();
  }

  setUser(user: ReturnedUser): void {
    this.store.dispatch(setUser({ payload: user }));
    localStorage.setItem("user", JSON.stringify(user));
  }

  checkRoute(): void {
    const { path } = this.route.snapshot.routeConfig;
    if (path === "me") {
      this.isUserMe = true;
    }
  }

  loadUser(): void {
    if (this.isUserMe) {
      this.user$.subscribe((user) => {
        if (user) {
          this.commentCount$ = this.comentSrv.countById(user._id);
          this.fireSrv
            .getFileUrl(`avatars/${user.avatar}`)
            .subscribe((url) => (this.userPic = url));
          this.user = user;
        }
      });
    } else {
      const { id } = this.route.snapshot.params;
      this.userSrv.findById(id).subscribe((user) => {
        if (user) {
          this.commentCount$ = this.comentSrv.countById(user._id);
          this.fireSrv
            .getFileUrl(`avatars/${user.avatar}`)
            .subscribe((url) => (this.userPic = url));
          this.user = user;
        }
      });
    }
  }

  async toggleAdm() {
    const { isAdm } = this.user;
    const question = isAdm
      ? "Deseja remover o privilégio administrador desse usuário?"
      : "Deseja conceder o privilégio administrador a esse usuário?";
    const message = `Privilégio administrador ${isAdm ? "removido" : "adicionado"
      } com sucesso!`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question },
    });

    let result = await dialogRef.afterClosed().toPromise();

    if (result) {
      const user = this.user;
      const payload = { ...user, isAdm: !isAdm };

      this.userSrv.update(payload).subscribe(
        () => {
          this.snackBar.open(message, "OK!", { duration: 5000 });
          this.loadUser();
        },
        (error) => {
          this.snackBar.open(
            `ERRO: não foi possível concluir a operação - ${error}`,
            "Que pena!",
            { duration: 5000 }
          );
        }
      );
    }
  }

  updatePassword(): void {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      data: { password: "", confirmPassword: "" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fireSrv
          .updatePassword(result)
          .then(() => {
            this.snackBar.open("Senha alterada com sucesso!", "OK", {
              duration: 5000,
            });
          })
          .catch((error) => {
            if (error.code === "auth/requires-recent-login") {
              //Reautenticate
              const reauthenticateRef = this.dialog.open(ReauthenticateDialogComponent, { data: { email: this.user.email, password: '' } });
              reauthenticateRef.afterClosed().subscribe(async () => {
                try {
                  await this.fireSrv.updatePassword(result)
                  this.snackBar.open("Senha alterada com sucesso!", "OK", {
                    duration: 5000,
                  });
                } catch (err) {
                  console.log(err);
                  this.snackBar.open(`Algo deu errado! ❌ ${err}`, "OK", {
                    duration: 5000,
                  });
                }
              });
            } else {
              console.log(error);
              this.snackBar.open(`Algo deu errado! ❌ ${error}`, "OK", {
                duration: 5000,
              });
            }
          });
      }
    });
  }

  updateEmail(): void {
    const dialogRef = this.dialog.open(ResetEmailDialogComponent, {
      data: { email: "" },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const newUser: ReturnedUser = { ...this.user, email: result };
        try {
          const firebaseEmailUpdatePromise = this.fireSrv.updateEmail(result);
          const databaseEmailUpdatePromise = this.userSrv.update(newUser).toPromise();
          await Promise.all([firebaseEmailUpdatePromise, databaseEmailUpdatePromise]);
          this.setUser(newUser);
          this.loadUser();
          this.snackBar.open("E-mail alterado com sucesso!", "OK", {
            duration: 5000,
          });
        } catch (error) {
          if (error.code === "auth/requires-recent-login") {
            //Reautenticate
            const reauthenticateRef = this.dialog.open(ReauthenticateDialogComponent, { data: { email: this.user.email, password: '' } });
            reauthenticateRef.afterClosed().subscribe(async () => {
              try {
                const firebaseEmailUpdatePromise = this.fireSrv.updateEmail(result);
                const databaseEmailUpdatePromise = this.userSrv.update(newUser).toPromise();
                await Promise.all([firebaseEmailUpdatePromise, databaseEmailUpdatePromise]);
                this.setUser(newUser);
                this.loadUser();
                this.snackBar.open("E-mail alterado com sucesso!", "OK", {
                  duration: 5000,
                });
              } catch (err) {
                console.log(err);
                this.snackBar.open(`Algo deu errado! ❌ ${err}`, "OK", {
                  duration: 5000,
                });
              }
            });
          } else {
            console.log(error);
            this.snackBar.open(`Algo deu errado! ❌ ${error}`, "OK", {
              duration: 5000,
            });
          }
        };
      }
    });
  }

  async updateAvatar() {
    const dialogRef = this.dialog.open(ResetAvatarDialogComponent, { width: '400px', disableClose: true });
    try {
      const result = await dialogRef.afterClosed().toPromise();

      if (result) {
        const newUser: ReturnedUser = { ...this.user, avatar: result };
        const promises = [];
        if (this.user.avatar !== "4512F37DF69526S-avatar-padrao.png") {
          promises.push(this.fireSrv.deleteFile(`avatars/${this.user.avatar}`).toPromise());
        }
        promises.push(this.userSrv.update(newUser).toPromise());
        await Promise.all(promises);
        this.setUser(newUser);
        this.loadUser();
        this.snackBar.open("Avatar alterado com sucesso!", "OK", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      this.snackBar.open(`Algo de errado: ${error}`, 'Entendi', { duration: 5000 });
    }
  }

  async updateUser() {
    const { bio, nome, username } = this.user
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, { width: '350px', data: { bio, nome, username }, disableClose: true });
    try {
      const result: UpdateUserDialogData = await dialogRef.afterClosed().toPromise();
      if (result) {
        const { bio, nome, username } = result;
        const newUser = { ...this.user, bio, nome, username };
        if (username === this.user.username) {
          await this.userSrv.update(newUser).toPromise();
          this.setUser(newUser);
          this.loadUser();
          this.snackBar.open("Dados editados com sucesso!", "OK", {
            duration: 5000,
          });
        } else {
          const returnedUser = await this.userSrv.findByUsername(username).toPromise();
          if (!returnedUser) {
            await this.userSrv.update(newUser).toPromise();
            this.setUser(newUser);
            this.loadUser();
            this.snackBar.open("Dados editados com sucesso!", "OK", {
              duration: 5000,
            });
          } else throw new Error('Nome de usuário já existe!');
        }
      }
    } catch (error) {
      console.log(error);
      this.snackBar.open(`Algo deu errado! ❌ ${error}`, "OK", {
        duration: 5000,
      });
    }
  }

  async deactivateAccount() {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);
    try {
      const confirmation = await dialogRef.afterClosed().toPromise();
      if (confirmation) {
        await this.fireSrv.deleteAccount();
        await this.router.navigate(["/"]);
        this.snackBar.open("Conta desativada com sucesso!", "Entendi", {
          duration: 5000,
        });
      }
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        //Reautenticate
        const reauthenticateRef = this.dialog.open(ReauthenticateDialogComponent, { data: { email: this.user.email, password: '' } });
        reauthenticateRef.afterClosed().subscribe(async () => {
          try {
            await this.fireSrv.deleteAccount();
            await this.router.navigate(["/"]);
            this.snackBar.open("Conta desativada com sucesso!", "Entendi", {
              duration: 5000,
            });
          } catch (err) {
            console.log(err);
            this.snackBar.open(`Algo deu errado! ❌ ${err}`, "OK", {
              duration: 5000,
            });
          }
        });
      } else {
        console.log(error);
        this.snackBar.open(`Algo deu errado! ❌ ${error}`, "OK", {
          duration: 5000,
        });
      }
    }
  }
}
