import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reducers, ReturnedUser } from 'src/app/interfaces';
import { ComentarioService } from 'src/app/services/comentario.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  user$: Observable<ReturnedUser>;
  user: ReturnedUser;
  userPic: string;
  isUserMe = false;
  commentCount$: Observable<Number>

  constructor(
    private store: Store<Reducers>,
    private route: ActivatedRoute,
    private comentSrv: ComentarioService,
    private userSrv: UserService,
    private fireSrv: FirebaseService
  ) {
    this.user$ = store.select(store => store.AuthState.user);
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
      const { path } = this.route.snapshot.routeConfig;
      this.userSrv.findById(path).subscribe(user => {
        if (user) {
          this.commentCount$ = this.comentSrv.countById(user._id);
          this.fireSrv.getFileUrl(`avatars/${user.avatar}`).subscribe(url => this.userPic = url);
          this.user = user;
        }
      })
    }
  }
}
