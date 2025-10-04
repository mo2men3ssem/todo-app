import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../todo-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-add',
  standalone: false,
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.scss',
})
export class TodoAdd {
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    completed: new FormControl(false),
  });

  constructor(private todoService: TodoService, private router: Router) {}

  submit() {
    const payload = {
      title: this.addForm.value.title,
      description: this.addForm.value.description,
      completed: this.addForm.value.completed,
    };

    console.log('Added Form:', payload);

    this.todoService.createTodo(payload).subscribe(
      (res) => {
        console.log('Response while added todo:', res),
          this.router.navigate(['/todo-view']);
      },
      (err) => {
        console.log('Error while added todo:', err),
          alert('Error while added todo');
      }
    );
  }
}
