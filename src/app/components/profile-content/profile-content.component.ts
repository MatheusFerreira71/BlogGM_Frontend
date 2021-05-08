import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reducers, ReturnedUser } from 'src/app/interfaces';
import { ComentarioService } from 'src/app/services/comentario.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  user$: Observable<ReturnedUser>;
  loggedIn$: Observable<boolean>;
  user: ReturnedUser;
  userPic: string;
  isUserMe = false;
  commentCount$: Observable<Number>

  constructor(
    private store: Store<Reducers>,
    private route: ActivatedRoute,
    private comentSrv: ComentarioService,
    private userSrv: UserService,
    private fireSrv: FirebaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.user$ = store.select(store => store.AuthState.user);
    this.loggedIn$ = store.select(store => store.AuthState.loggedIn);
  }

  ngOnInit(): void {
    this.checkRoute();
    this.setUser();
  }

  checkRoute(): void {
    const { path } = this.route.snapshot.routeConfig;
    if (path === "me") {
      this.isUserMe = true;
    }
  }

  setUser(): void {
    if (this.isUserMe) {
      this.user$.subscribe(user => {
        if (user) {
          this.commentCount$ = this.comentSrv.countById(user._id);
          this.fireSrv.getFileUrl(`avatars/${user.avatar}`).subscribe(url => this.userPic = url);
          this.user = user;
        }
      });
    } else {
      const { id } = this.route.snapshot.params;
      this.userSrv.findById(id).subscribe(user => {
        if (user) {
          this.commentCount$ = this.comentSrv.countById(user._id);
          this.fireSrv.getFileUrl(`avatars/${user.avatar}`).subscribe(url => this.userPic = url);
          this.user = user;
        }
      })
    }
  }

  async toggleAdm() {
    const { isAdm } = this.user;
    const question = isAdm ? "Deseja remover o privilégio administrador desse usuário?" : "Deseja conceder o privilégio administrador a esse usuário?"
    const message = `Privilégio administrador ${isAdm ? 'removido' : 'adicionado'} com sucesso!`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question },
    });

    let result = await dialogRef.afterClosed().toPromise();

    if (result) {
      const user = this.user;
      const payload = { ...user, isAdm: !isAdm };

      this.userSrv.update(payload).subscribe(() => {
        this.snackBar.open(
          message,
          "OK!",
          { duration: 5000 }
        );
        this.setUser();
      }, error => {
        this.snackBar.open(
          `ERRO: não foi possível concluir a operação - ${error}`,
          "Que pena!",
          { duration: 5000 }
        );
      })
    }
  }
}
