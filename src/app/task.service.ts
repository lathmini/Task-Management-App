import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'https://60a21a08745cd70017576014.mockapi.io/api/v1/todo';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  deleteTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url);
  }
}
