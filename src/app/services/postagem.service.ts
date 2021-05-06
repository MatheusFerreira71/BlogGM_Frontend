import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Observable } from "rxjs";
import { UniquePost, Visualizar } from "../interfaces";
@Injectable({
  providedIn: "root",
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  listarPost(id: string): Observable<UniquePost> {
    const apiUri: string = env.apiBaseUri + `posts/${id}`;
    return this.http.get<UniquePost>(apiUri);
  }

  visualizar(body: Visualizar): Observable<any> {
    const apiUri: string = env.apiBaseUri + "posts/visualizacao";
    return this.http.put(apiUri, body);
  }

  removePost(body: { _id: string }): Observable<{ removed: boolean }> {
    const apiUri: string = `${env.apiBaseUri}posts`;
    return this.http.request<{ removed: boolean }>("DELETE", apiUri, { body });
  }
}
