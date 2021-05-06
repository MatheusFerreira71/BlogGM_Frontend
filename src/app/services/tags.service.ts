import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Observable } from "rxjs";
import { Tag, RemovedTag } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class TagsService {
  constructor(private http: HttpClient) { }

  private apiUri: string = `${env.apiBaseUri}tags`;

  listarAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUri);
  }

  listarByName(titulo: string): Observable<Tag[]> {
    const params = new HttpParams().set("titulo", titulo);
    const urlDePesquisa = `${this.apiUri}/name?${params.toString()}`;
    return this.http.get<Tag[]>(urlDePesquisa);
  }

  removeTag(body: { _id: string }): Observable<RemovedTag> {
    return this.http.request<RemovedTag>("DELETE", this.apiUri, { body });
  }
}
