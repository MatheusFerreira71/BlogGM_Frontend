import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { PostsDestaques } from "../../interfaces";
import { DestaqueService } from "../../services/destaque.service";
@Component({
  selector: "app-destaque-bignews",
  templateUrl: "./destaque-bignews.component.html",
  styleUrls: ["./destaque-bignews.component.scss"],
})
export class DestaqueBignewsComponent implements OnInit {
  constructor(private destaqueSrv: DestaqueService, private fireSrv: FirebaseService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  postData: PostsDestaques;

  getAllPosts(): void {
    this.destaqueSrv.listarAll().subscribe(async (posts) => {
      posts.bigPost.banner = await this.fireSrv.getFileUrl(`banners/${posts.bigPost.banner}`).toPromise();
      this.postData = posts
    });
  }
}
