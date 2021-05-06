import { Component, Input, OnChanges } from "@angular/core";
import { FirebaseService } from "../../services/firebase.service";
import { Post, PostData } from '../../interfaces';

@Component({
  selector: "app-postlist",
  templateUrl: "./postlist.component.html",
  styleUrls: ["./postlist.component.scss"],
})
export class PostlistComponent implements OnChanges {
  paginaAtual = 1;

  constructor(private fireSrv: FirebaseService) { }
  @Input() postData: Post[] | PostData[];
  @Input() itemsPerPage: number;

  ngOnChanges(): void {
    if (this.postData) {
      this.postData.forEach(async post => {
        if (post.postId) {
          post.postId.banner = await this.fireSrv.getFileUrl(`banners/${post.postId.banner}`).toPromise();
        } else {
          post.banner = await this.fireSrv.getFileUrl(`banners/${post.banner}`).toPromise();
        }
      })
    }
  }
}
