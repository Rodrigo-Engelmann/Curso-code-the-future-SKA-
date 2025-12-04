import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  id?: number;
  user?: any[];
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationServices {
  private api = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  // CREATE
  register(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.api}/register`, notification);
  }

  // GET ALL
  findAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.api);
  }

  // GET BY ID
  findById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.api}/${id}`);
  }

  // UPDATE
  update(id: number, data: Partial<Notification>): Observable<Notification> {
    return this.http.patch<Notification>(`${this.api}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
