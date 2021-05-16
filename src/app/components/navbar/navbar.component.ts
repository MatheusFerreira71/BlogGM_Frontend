import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";
import { Categoria, Reducers, ReturnedUser } from "src/app/interfaces";
import { setUser, setAuthState } from "../../store/actions";
import { MatMenuTrigger } from "@angular/material/menu";
import { ViewChild } from "@angular/core";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  user$: Observable<ReturnedUser>;
  profilePic: string;
  pesquisa: string = "";
  navbarHidden = true;
  allCategorias: Categoria[];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  someMethod() {
    this.trigger.openMenu();
  }

  constructor(
    private route: Router,
    private store: Store<Reducers>,
    private fireSrv: FirebaseService,
    private matSnack: MatSnackBar,
    private navbarSrv: NavbarService
  ) {
    this.loggedIn$ = store.select((store) => store.AuthState.loggedIn);
    this.user$ = store.select((store) => store.AuthState.user);
  }

  ngOnInit(): void {
    this.getCategorias();
    this.user$.subscribe((user) => {
      if (user) {
        this.fireSrv
          .getFileUrl(`avatars/${user.avatar}`)
          .subscribe((url) => (this.profilePic = url));
      }
    });
  }

  getCategorias(): void {
    this.navbarSrv
      .listarAll()
      .subscribe((categoria) => (this.allCategorias = categoria));
  }

  pesquisar(form: NgForm): void {
    const titulo: string = form.value.pesquisa;
    this.route.navigate(["busca/PostName"], {
      queryParams: { titulo: titulo.toLowerCase() },
    });
  }

  signOut(): void {
    this.fireSrv.signOut().then(() => {
      this.store.dispatch(setUser({ payload: null }));
      this.store.dispatch(setAuthState({ payload: false }));
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      this.route.navigate(["/"]).then(() => {
        this.matSnack.open("Usuário deslogado com sucesso.", "Entendi", {
          duration: 5000,
        });
      });
    });
  }

  toggleHidden(): void {
    this.navbarHidden = !this.navbarHidden;
  }
}
