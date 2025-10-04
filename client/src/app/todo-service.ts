import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from './environment';
import { TodoModel } from './todo-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  private apiUrl = Environment.apiUrl;

  // Get Todos
  getTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.apiUrl}/todos`);
  }

  // Get Todo
  getTodo(_id: string): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.apiUrl}/todos/${_id}`);
  }

  // Create Todo
  createTodo(payload: any): Observable<TodoModel[]> {
    return this.http.post<TodoModel[]>(`${this.apiUrl}/todos`, payload);
  }

  // Update Todo
  updateTodo(_id: string, updatedPayload: any): Observable<TodoModel[]> {
    return this.http.put<TodoModel[]>(`${this.apiUrl}/todos/${_id}`, updatedPayload);
  }

  // Delete Todo
  deleteTodo(_id: string): Observable<TodoModel[]> {
    return this.http.delete<TodoModel[]>(`${this.apiUrl}/todos/${_id}`);
  }
}
