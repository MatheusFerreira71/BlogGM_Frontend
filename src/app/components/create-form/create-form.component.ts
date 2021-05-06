import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { NavbarService } from "src/app/services/navbar.service";
import { MatSelectChange } from "@angular/material/select";
import { NgForm } from "@angular/forms";
import { PostcreateService } from "../../services/postcreate.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PostagemService } from "src/app/services/postagem.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Reducers, ReturnedUser, PostCreationBody, TagsCadastro, PostEditionBody, Categoria, SubCat } from "../../interfaces";
import { Store } from "@ngrx/store";
import { Observable, timer } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-create-form",
  templateUrl: "./create-form.component.html",
  styleUrls: ["./create-form.component.scss"],
})
export class CreateFormComponent implements OnInit {
  user$: Observable<ReturnedUser>
  upPercentage$: Observable<number>;
  constructor(
    private catsGetter: NavbarService,
    private postManagementSrv: PostcreateService,
    private router: Router,
    private routes: ActivatedRoute,
    private postGetter: PostagemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<Reducers>,
    private fireSrv: FirebaseService
  ) {
    this.user$ = store.select(store => store.AuthState.user);
  }

  ngOnInit(): void {
    this.getAll();
    this.isUpdate();
  }

  isUpdate(): void {
    const id = this.routes.snapshot.paramMap.get("id");

    if (id) {
      try {
        this.titulo = "Editando um Post";
        this.uploadEnabler = false;
        this.postGetter.listarPost(id).subscribe((post) => {
          this.postBody.titulo = post.post.titulo;
          this.postBody.descricao = post.post.descricao;
          this.postBody.corpo = post.post.corpo;
          this.postBody.usuario = post.post.usuario._id;
          this.selectedCatId = post.categorias[0].catId._id;
          this.selectCats(this.e);
          if (post.categorias.length === 2) {
            this.selectedSubCatId = post.categorias[1].catId._id;
          }
          const transformedTags = post.tags.map((tag) => ({
            titulo: tag.tagId.titulo,
            tituloLower: tag.tagId.titulo.toLowerCase(),
          }));
          this.tags = transformedTags;
        });
      } catch (erro) {
        console.log(erro);
        this.snackBar.open("Que pena. 🦦", "Entendi", {
          duration: 5000,
        });
      }
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "25rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    uploadUrl: "v1/images", // if needed
    customClasses: [
      // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  uploadEnabler: boolean = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  imgName: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: TagsCadastro[] = [];
  e: MatSelectChange;
  allCats: Categoria[];
  selectedCatId: string;
  selectedSubCatId: string;
  subCats: SubCat[] = [];
  banner: File;
  postBody: PostCreationBody = {} as PostCreationBody;
  titulo: string = "Crie um novo post";

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push({
        titulo: value.trim(),
        tituloLower: value.trim().toLowerCase(),
      });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tag: TagsCadastro): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  getAll(): void {
    this.catsGetter.listarAll().subscribe((cats) => (this.allCats = cats));
  }

  selectCats(changeEvent: MatSelectChange): void {
    this.selectedSubCatId = undefined;
    this.catsGetter
      .listarSubCats(this.selectedCatId)
      .subscribe((subCats) => (this.subCats = subCats));
  }

  handleFileInput(file: File) {
    if (
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/bmp"
    ) {
      const hash = Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000)
      this.imgName = `${hash}-${file.name}`;
      this.banner = file;
    } else {
      this.snackBar.open(
        "Selecione um arquivo JPG / JPEG / PNG / BMP",
        "Entendi",
        { duration: 5000 }
      );
    }
  }

  handleSubmit(form: NgForm) {
    const id = this.routes.snapshot.paramMap.get("id");

    if (id) {
      if (form.valid && this.tags.length > 0) {
        const categorias = [this.selectedCatId];
        if (this.selectedSubCatId) {
          categorias.push(this.selectedSubCatId);
        }
        this.postBody.tituloLower = this.postBody.titulo.toLowerCase();

        const editionBody: PostEditionBody = {
          _id: id,
          ...this.postBody,
          categorias,
          tags: this.tags,
        };

        this.postManagementSrv.updatePost(editionBody).subscribe((response) => {
          if (response.edited) {
            this.router.navigate([`post/${id}`]).then(() => {
              this.snackBar.open("Post Editado com Sucesso!", "Entendi", {
                duration: 5000,
              });
            });
          } else {
            this.snackBar.open("Que pena!", "Entendi", {
              duration: 5000,
            });
          }
        });
      } else {
        this.snackBar.open("Preencha todos os Campos! ❌ 🦦", "Entendi", {
          duration: 5000,
        });
      }
    } else {
      if (this.banner && form.valid && this.tags.length > 0) {
        this.postBody.tituloLower = this.postBody.titulo.toLowerCase();
        this.user$.subscribe(user => {
          this.postBody.banner = this.imgName;
          this.postBody.usuario = user._id;
          const categorias = [this.selectedCatId];
          if (this.selectedSubCatId) {
            categorias.push(this.selectedSubCatId);
          }
          this.postBody.categorias = categorias;
          this.postBody.tags = this.tags;

          const uploadTask = this.fireSrv.uploadFile(`banners/${this.imgName}`, this.banner)
          this.upPercentage$ = uploadTask.percentageChanges();
          uploadTask.then(() => {
            timer(1000).subscribe(() => {
              this.postManagementSrv.createPost(this.postBody).subscribe((postId) => {
                this.router.navigate([`post/${postId.createdPostId}`]).then(() => {
                  this.snackBar.open("Post Criado com Sucesso!", "Entendi", {
                    duration: 5000,
                  });
                });
              }, error => {
                this.fireSrv.deleteFile(`banners/${this.imgName}`).subscribe(() => this.upPercentage$ = undefined);
                this.snackBar.open(`Algo deu errado: ${error}`, "Entendi", {
                  duration: 5000,
                });
              });
            })
          }).catch(error => {
            this.snackBar.open(`Algo deu errado: ${error}`, "Entendi", {
              duration: 5000,
            });
          })
        });
      } else {
        this.snackBar.open("Preencha todos os Campos! ❌ 🦦", "Entendi", {
          duration: 5000,
        });
      }
    }
  }

  async voltar(form: NgForm): Promise<void> {
    let result = true;
    if (form.dirty && form.touched) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { question: "Há dados não salvos. Deseja realmente voltar?" },
      });

      result = await dialogRef.afterClosed().toPromise();
    }
    const id = this.routes.snapshot.paramMap.get("id");
    if (result) {
      if (id !== null) {
        this.router.navigate([`/post/${id}`]);
      } else {
        this.router.navigate(['/'])
      }
    }
  }
}
