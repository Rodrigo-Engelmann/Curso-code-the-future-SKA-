import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  milestone?: any[];
  responsable: string;
  title?: string;
  description: string;
  term?: string;
}

@Injectable({
  providedIn: 'root',
})

export class TaskServices {
  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // CREATE
  register(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.api}/register`, task);
  }

  // GET ALL
  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  // GET BY ID
  findById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  // UPDATE
  update(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
