import { Component, OnInit } from "@angular/core";
import { PostagemService } from "../../services/postagem.service";
import { ActivatedRoute, Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";
import { UniquePost, ReturnedUser, Reducers } from '../../interfaces';

@Component({
  selector: "app-postagem-content",
  templateUrl: "./postagem-content.component.html",
  styleUrls: ["./postagem-content.component.scss"],
})
export class PostagemContentComponent implements OnInit {

  uniquePost: UniquePost;
  categorias: string[];
  tags: string[];
  formatedDate: string;
  user$: Observable<ReturnedUser>;
  loggedIn$: Observable<boolean>;
  userAvatar: string;
  banner: string;

  constructor(
    private postagemSrv: PostagemService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<Reducers>,
    private fireSrv: FirebaseService
  ) {
    this.user$ = store.select(store => store.AuthState.user);
    this.loggedIn$ = store.select(store => store.AuthState.loggedIn);
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.postagemSrv.listarPost(id).subscribe((post) => {
      this.uniquePost = post;
      this.fireSrv.getFileUrl(`avatars/${this.uniquePost.post.usuario.avatar}`).subscribe(url => this.userAvatar = url);
      this.fireSrv.getFileUrl(`banners/${this.uniquePost.post.banner}`).subscribe(url => this.banner = url);
      this.categorias = post.categorias.map((cat) => cat.catId.titulo);
      this.tags = post.tags.map((tag) => tag.tagId.titulo);
      this.uniquePost.post.corpo = post.post.corpo.replace(
        "/(?:\r\n|\r|\n)/g",
        "<br>"
      );
      this.formatedDate = formatDate(post.post.updatedAt, "fullDate", "pt-BR");
      const { _id, visualizacao } = post.post;
      const novaView = visualizacao + 1;
      this.postagemSrv.visualizar({ _id, visualizacao: novaView }).subscribe();
      this.uniquePost.comentarios.forEach((coment) => {
        coment.updatedAt = formatDate(coment.updatedAt, "medium", "pt-Br");
      });
    });
  }

  refreshComents(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.router.navigate([`post/${id}`]).then(() => {
      this.postagemSrv.listarPost(id).subscribe((post) => {
        this.uniquePost = post;
        this.categorias = post.categorias.map((cat) => cat.catId.titulo);
        this.tags = post.tags.map((tag) => tag.tagId.titulo);
        this.formatedDate = formatDate(
          post.post.updatedAt,
          "fullDate",
          "pt-BR"
        );
        this.uniquePost.comentarios.forEach((coment) => {
          coment.updatedAt = formatDate(coment.updatedAt, "medium", "pt-Br");
        });
      });
    });
  }

  async removePost(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question: "Deseja realmente excluir este post?" },
    });

    let result = await dialogRef.afterClosed().toPromise();

    if (result) {
      const _id = this.route.snapshot.paramMap.get("id");
      try {
        this.postagemSrv.removePost({ _id }).subscribe((response) => {
          if (response.removed) {
            this.fireSrv.deleteFile(`banners/${this.uniquePost.post.banner}`);
            this.router.navigate(["/"]).then(() => {
              this.snackBar.open("Exclusão efetuada com sucesso.", "Entendi", {
                duration: 5000,
              });
            });
          }
        });
      } catch (erro) {
        this.snackBar.open(
          "ERRO: não foi possível excluir este item.",
          "Que pena!",
          { duration: 5000 }
        );
      }
    }
  }
}
