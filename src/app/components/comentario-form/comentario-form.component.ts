import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ComentarioService } from "../../services/comentario.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { ComentarioCreate, Reducers, ReturnedUser } from '../../interfaces';
@Component({
  selector: "app-comentario-form",
  templateUrl: "./comentario-form.component.html",
  styleUrls: ["./comentario-form.component.scss"],
})
export class ComentarioFormComponent implements OnInit {
  @Input() postId: string;
  @Output() criarComentario = new EventEmitter();
  texto: string = "";
  user$: Observable<ReturnedUser>;
  userId: string;
  loggedIn$: Observable<boolean>;

  constructor(
    private comentarioSrv: ComentarioService,
    private snackBar: MatSnackBar,
    private store: Store<Reducers>
  ) {
    this.user$ = store.select(store => store.AuthState.user);
    this.loggedIn$ = store.select(store => store.AuthState.loggedIn);
  }

  ngOnInit(): void { }

  create(form: NgForm): void {
    if (this.texto !== "") {
      this.user$.subscribe(user => this.userId = user._id);
      const comentario: ComentarioCreate = {
        usuario: this.userId,
        texto: this.texto,
        postId: this.postId,
      };
      if (form.valid) {
        this.comentarioSrv.create(comentario).subscribe(() => {
          this.texto = "";
          this.snackBar.open("Comentário Criado com Sucesso!", "Entendi", {
            duration: 5000,
          });
          this.criarComentario.emit();
        });
      } else {
        this.snackBar.open("Formulário Inválido. 🦦", "Entendi", {
          duration: 5000,
        });
      }
    } else {
      this.snackBar.open("Preencha o texto do comentário", "Entendi", {
        duration: 5000,
      });
    }
  }
}
