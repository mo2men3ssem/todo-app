import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TodoView } from './components/todo-view/todo-view';
import { TodoBox } from './components/todo-box/todo-box';
import { TodoDelete } from './components/todo-delete/todo-delete';
import { TodoEdit } from './components/todo-edit/todo-edit';
import { TodoAdd } from './components/todo-add/todo-add';

@NgModule({
  declarations: [
    App,
    TodoView,
    TodoBox,
    TodoDelete,
    TodoEdit,
    TodoAdd
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
