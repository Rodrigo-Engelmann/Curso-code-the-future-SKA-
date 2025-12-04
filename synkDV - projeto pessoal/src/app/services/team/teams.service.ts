import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  id?: number;
  name: string;
  createdDate?: string;
  users?: any[];
  games?: any[];
  areas?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private api = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) {}

  // CREATE
  register(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.api}/register`, team);
  }

  // GET ALL
  findAll(): Observable<Team[]> {
    return this.http.get<Team[]>(this.api);
  }

  // GET BY ID
  findById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.api}/${id}`);
  }

  // UPDATE
  update(id: number, data: Partial<Team>): Observable<Team> {
    return this.http.patch<Team>(`${this.api}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  // REMOVE USER FROM TEAM
  removeUserFromTeam(teamId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.api}/${teamId}/users/${userId}`);
  }
  
  // ADDS A USER TO A TEAM
  addUserToTeam(teamId: number, userId: number) {
    return this.http.post(`http://localhost:3000/teams/${teamId}/users/${userId}`, {});
  }
}
