import { Component, OnInit } from "@angular/core";
import { PostsDestaques } from "src/app/interfaces";
import { FirebaseService } from "src/app/services/firebase.service";
import { DestaqueService } from "../../services/destaque.service";

@Component({
  selector: "app-destaque-news",
  templateUrl: "./destaque-news.component.html",
  styleUrls: ["./destaque-news.component.scss"],
})
export class DestaqueNewsComponent implements OnInit {
  constructor(private destaqueSrv: DestaqueService, private fireSrv: FirebaseService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  postData: PostsDestaques;

  getAllPosts(): void {
    this.destaqueSrv.listarAll().subscribe((posts) => {
      posts.postNews.forEach(async post => {
        post.banner = await this.fireSrv.getFileUrl(`banners/${post.banner}`).toPromise()
      })
      this.postData = posts;
    });
  }
}
