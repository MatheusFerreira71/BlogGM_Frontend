import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserService } from "./services/user.service";
import { setUser, setAuthState } from "./store/actions";
import { FirebaseService } from "./services/firebase.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Reducers, ReturnedUser } from "./interfaces";
import { timer } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <app-spinner *ngIf="loading; else loaded"></app-spinner>
    <ng-template #loaded>
      <app-navbar></app-navbar>
      <section id="globalSection">
        <app-banner></app-banner>
        <router-outlet></router-outlet>
      </section>
      <app-footer></app-footer>
    </ng-template>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  loading = true;

  constructor(
    private store: Store<Reducers>,
    private userSrv: UserService,
    private fireSrv: FirebaseService,
    private fireAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.fireAuth
      .onAuthStateChanged(async (user) => {
        if (user) {
          this.fireSrv.getCurrentUser().then((currentUser) => {
            this.userSrv
              .findByUniqueId(currentUser.uid)
              .subscribe((returnedUser) => {
                this.setUser(returnedUser);
              });
          });
        }
      })
      .then(() => {
        timer(500).subscribe(() => (this.loading = false));
      });
  }

  setUser(user: ReturnedUser): void {
    this.store.dispatch(setUser({ payload: user }));
    this.store.dispatch(setAuthState({ payload: true }));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedIn", JSON.stringify(true));
  }
}
