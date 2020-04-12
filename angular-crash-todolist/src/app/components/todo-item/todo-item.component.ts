import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {TodoService} from '../../services/todo.service'
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  setClasses(){
    let classes={
      todo:true,
      'is-complete': this.todo.completed
    }
    return classes;
  }


  //onTooggle
  onToggle(todo){
    //Toggle in UI
    console.log('toggle in UI');
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo=>
      console.log("Actualización en UI de "+todo.id+"///"+todo.title+"///"+todo.completed));
  }
  onDelete(todo){
    //console.log('delete');
    this.deleteTodo.emit(todo);
  }
}
