import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { CatNoFilter } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class FooterService {
  constructor(private http: HttpClient) {}

  private apiUri: string = `${env.apiBaseUri}categorias/nofilter`;

  listarAll(): Observable<CatNoFilter[]> {
    return this.http.get<CatNoFilter[]>(this.apiUri);
  }
}
