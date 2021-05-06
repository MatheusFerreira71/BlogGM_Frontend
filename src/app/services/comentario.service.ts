import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "../../environments/environment";
import { ComentarioCreate } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class ComentarioService {
  constructor(private http: HttpClient) { }

  private apiUri = `${env.apiBaseUri}comentarios`;
  create(body: ComentarioCreate): Observable<any> {
    return this.http.post(this.apiUri, body);
  }

  remove(body: { _id: string }): Observable<any> {
    return this.http.request("DELETE", this.apiUri, {
      body,
    });
  }

  countById(id: string): Observable<number> {
    return this.http.get<number>(`${this.apiUri}/${id}`);
  }
}
