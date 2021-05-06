import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Observable } from "rxjs";
import { Post, PostData } from "../interfaces";
@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private http: HttpClient) { }

  listarPostTagOrCat(id: string, type: string): Observable<PostData[]> {
    const params = new HttpParams().set("type", type).set("id", id);
    const apiUri = `${env.apiBaseUri}posts/busca?${params.toString()}`;
    return this.http.get<PostData[]>(apiUri);
  }

  listarPostName(titulo: string, type: string): Observable<Post[]> {
    const params = new HttpParams().set("type", type).set("titulo", titulo);
    const apiUri = `${env.apiBaseUri}posts/busca?${params.toString()}`;
    return this.http.get<Post[]>(apiUri);
  }
}
