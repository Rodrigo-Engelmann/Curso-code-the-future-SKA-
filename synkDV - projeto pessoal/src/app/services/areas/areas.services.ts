import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Area {
  id?: number;

  // Relações
  teamId: number;
  files?: any[];
  milestones?: any[];

  createdDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AreasServices {
  private api = 'http://localhost:3000/areas';

  constructor(private http: HttpClient) {}

  // CREATE
  register(area: Area): Observable<Area> {
    return this.http.post<Area>(`${this.api}/register`, area);
  }

  // GET ALL
  findAll(): Observable<Area[]> {
    return this.http.get<Area[]>(this.api);
  }

  // GET BY ID
  findById(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.api}/${id}`);
  }

  // UPDATE
  update(id: number, data: Partial<Area>): Observable<Area> {
    return this.http.patch<Area>(`${this.api}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
