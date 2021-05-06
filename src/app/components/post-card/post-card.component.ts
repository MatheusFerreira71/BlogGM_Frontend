import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Post, Reducers, ReturnedUser } from '../../interfaces';

@Component({
  selector: "app-post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"],
})
export class PostCardComponent implements OnInit {

  allPosts: Post[];
  user$: Observable<ReturnedUser>;

  constructor(private postSrv: PostService, private store: Store<Reducers>) {
    this.user$ = store.select(store => store.AuthState.user);
  }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postSrv.listarAll().subscribe((posts) => (this.allPosts = posts));
  }
}
