import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface File {
  id?: number;
  area?: any[];
  parent_id?: number;
  name: string;
  type: number;
  link?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesServices {
  private api = 'http://localhost:3000/files';

  constructor(private http: HttpClient) {}

  // CREATE
  register(file: File): Observable<File> {
    return this.http.post<File>(`${this.api}/register`, file);
  }

  // GET ALL
  findAll(): Observable<File[]> {
    return this.http.get<File[]>(this.api);
  }

  // GET BY ID
  findById(id: number): Observable<File> {
    return this.http.get<File>(`${this.api}/${id}`);
  }

  // UPDATE
  update(id: number, data: Partial<File>): Observable<File> {
    return this.http.patch<File>(`${this.api}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
