import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Milestone {
  id?: number;
  area?: any[];
  tasks?: any[];
  title: string;
  description: string;
  term: string;
}

@Injectable({
  providedIn: 'root',
})
export class MilestonesServices {
  private api = 'http://localhost:3000/milestones';

  constructor(private http: HttpClient) {}

  // CREATE
  register(milestone: Milestone): Observable<Milestone> {
    return this.http.post<Milestone>(`${this.api}/register`, milestone);
  }

  // GET ALL
  findAll(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.api);
  }

  // GET BY ID
  findById(id: number): Observable<Milestone> {
    return this.http.get<Milestone>(`${this.api}/${id}`);
  }

  // UPDATE
  update(id: number, data: Partial<Milestone>): Observable<Milestone> {
    return this.http.patch<Milestone>(`${this.api}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
