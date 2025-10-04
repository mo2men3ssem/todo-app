import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoView } from './components/todo-view/todo-view';
import { TodoAdd } from './components/todo-add/todo-add';
import { TodoEdit } from './components/todo-edit/todo-edit';

const routes: Routes = [
  {
    path: 'todo-view',
    component: TodoView,
  },
  {
    path: 'todo-add',
    component: TodoAdd,
  },
  {
    path: 'todo-edit/:id',
    component: TodoEdit,
  },
  {
    path: '',
    redirectTo: 'todo-view',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
