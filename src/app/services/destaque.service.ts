import { Injectable } from "@angular/core";
import { environment as env } from "../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PostsDestaques } from '../interfaces';

@Injectable({
  providedIn: "root",
})
export class DestaqueService {
  constructor(private http: HttpClient) { }

  private apiUri: string = env.apiBaseUri + "posts/destaques";

  listarAll(): Observable<PostsDestaques> {
    return this.http.get<PostsDestaques>(this.apiUri);
  }
}
