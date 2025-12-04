import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  username: string;
  email: string;
  // outros campos do usuário, se houver
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    return this.http.get(
      `${this.authUrl}/me`,
      { withCredentials: true }
    );
  }


  register(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(
      `${this.authUrl}/register`,
      userData,
      { withCredentials: true }
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(
      `${this.authUrl}/login`,
      credentials,
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.authUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(
      `${this.authUrl}/profile`,
      { withCredentials: true }
    );
  }

  refresh(): Observable<any> {
    return this.http.post(
      `${this.authUrl}/refresh`,
      {},
      { withCredentials: true }
    );
  }

  updateUser(formData: FormData): Observable<any> {
    // Ajuste a URL conforme a rota do backend que atualiza o usuário
    return this.http.put(`${this.authUrl}/update-profile`, formData, { withCredentials: true });
  }

  deleteAccount() {
    return this.http.delete('http://localhost:3000/users/delete', {
      withCredentials: true
    });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/find-email/${email}`);
  }

}
