import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id?: number;
  team?: any[];
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamesServices {
  private api = 'http://localhost:3000/games';

  constructor(private http: HttpClient) {}

  // CREATE
  register(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.api}/register`, game);
  }

  // GET ALL
  findAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.api);
  }

  // GET BY ID
  findById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.api}/${id}`);
  }

  // UPDATE
  update(id: number, data: Partial<Game>): Observable<Game> {
    return this.http.patch<Game>(`${this.api}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
