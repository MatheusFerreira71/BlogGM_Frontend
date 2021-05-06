import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { ReviewService } from "../../services/review.service";
import { PostData } from '../../interfaces';

@Component({
  selector: "app-review-news",
  templateUrl: "./review-news.component.html",
  styleUrls: ["./review-news.component.scss"],
})
export class ReviewNewsComponent implements OnInit {
  constructor(private reviewService: ReviewService, private fireSrv: FirebaseService) { }

  allPosts: PostData[];

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.reviewService.listarAll().subscribe((posts) => {
      posts.forEach(async post => {
        post.postId.banner = await this.fireSrv.getFileUrl(`banners/${post.postId.banner}`).toPromise();
      })
      this.allPosts = posts;
    });
  }
}
