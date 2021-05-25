import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { ReturnedUser, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUri = `${env.apiBaseUri}usuarios`;
  constructor(private http: HttpClient) { }

  createUser(body: User): Observable<ReturnedUser> {
    return this.http.post<ReturnedUser>(this.apiUri, body);
  }

  findByUsername(username: string): Observable<ReturnedUser> {
    return this.http.get<ReturnedUser>(`${this.apiUri}/user-ver/${username}`);
  }

  findByUniqueId(uniqueId: string): Observable<ReturnedUser> {
    return this.http.get<ReturnedUser>(`${this.apiUri}/search-auth-user/${uniqueId}`)
  }

  findById(id: string): Observable<ReturnedUser> {
    return this.http.get<ReturnedUser>(`${this.apiUri}/${id}`);
  }

  update(user: ReturnedUser) {
    return this.http.put(`${this.apiUri}/`, user);
  }

  delete(id: string): Observable<{ removed: boolean }> {
    return this.http.delete<{ removed: boolean }>(`${this.apiUri}/${id}`);
  }
}
