import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Todo} from '../models/Todo';


const httpOptions={
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';


  constructor(private http:HttpClient) {}


  getTodos():Observable<Todo[]>{
    console.log("Petición GET a: " + `${this.todosUrl}${this.todosLimit}`);
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  //Delete Todo
  deleteTodo(todo:Todo):Observable<Todo>{
    const url =`${this.todosUrl}/${todo.id}`;
    console.log("Peticion DELETE a dirección: "+url+" para borrar --> "+ todo.id+"///"+todo.title+"///"+todo.completed);
    return this.http.delete<Todo>(url,httpOptions);
  }

  //Toggle completed
  toggleCompleted(todo: Todo):Observable<any>{
    const url =`${this.todosUrl}/${todo.id}`;
    console.log("Peticion PUT a dirección: "+url +" para actualizar --> "+ todo.id+"///"+todo.title+"///"+todo.completed)
    return this.http.put(url,todo,httpOptions);
  }

  addTodo(todo:Todo):Observable<Todo>{
    console.log("Peticion POST a dirección: "+this.todosUrl+" para insertar --> "+ todo.id+"///"+todo.title+"///"+todo.completed);
    return this.http.post<Todo>(this.todosUrl,todo,httpOptions);
  }
}
