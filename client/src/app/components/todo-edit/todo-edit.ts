import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TodoService } from '../../todo-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoModel } from '../../todo-model';

@Component({
  selector: 'app-todo-edit',
  standalone: false,
  templateUrl: './todo-edit.html',
  styleUrl: './todo-edit.scss',
})
export class TodoEdit implements OnInit {
  todoId!: any;
  todos: TodoModel[] = [];
  editForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    completed: new FormControl(false),
  });

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Todo Id =', this.todoId);
    this.todoId = this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(this.todoId).subscribe({
      next: (todo: any) => {
        console.log('Success get todo:', todo);
        this.todos = todo;
        this.editForm.patchValue({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
        });
      },
      error: (err) => {
        console.log('Error while get todo:', err);
      },
    });
  }

  submit() {
    const formData = this.editForm.getRawValue();
    const updatedPayload = {
      title: this.editForm.value.title,
      description: this.editForm.value.description,
      completed: this.editForm.value.completed,
    };

    console.log('Updated Form:', updatedPayload);

    this.todoService.updateTodo(this.todoId, updatedPayload).subscribe({
      next: (res) => {
        console.log('Success updated todo:', res);
        this.router.navigate(['/todo-view']);
      },
      error: (err) => {
        console.error('Failed updated todo:', err);
        alert('Failed to update todo. Please try again.');
      },
    });
  }
}
