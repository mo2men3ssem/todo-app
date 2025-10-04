import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo-service';
import { TodoModel } from '../../todo-model';

@Component({
  selector: 'app-todo-box',
  standalone: false,
  templateUrl: './todo-box.html',
  styleUrl: './todo-box.scss',
})
export class TodoBox implements OnInit {
  todos: TodoModel[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos: TodoModel[]) => (this.todos = todos),
      error: (error) => console.error('Error while get todos:', error),
    });
  }

  deleteTodo(id: string) {
    const confirmDelete = confirm('Are you sure to delete this todo?');

    if (confirmDelete == true) {
      this.todoService.deleteTodo(id).subscribe({
        next: (res) => {
          console.log('Success delete todo:', res);
          this.getTodos();
        },
        error: (err) => {
          console.error('Failed delete todo:', err);
        },
      });
    }
  }
}
