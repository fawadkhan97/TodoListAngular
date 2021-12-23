import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../task';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, task);
  }
  editTask(task: Task): Observable<Task> {
    return this.http.put<any>(`${this.apiUrl}/${task.id}`, task, httpOptions);
  }
  deleteTask(task: Task): Observable<Task> {
    console.log('deleteTask is called');
    console.log(`${this.apiUrl}/${task.id}`);
    return this.http.delete<Task>(`${this.apiUrl}/${task.id}`);
  }
}
