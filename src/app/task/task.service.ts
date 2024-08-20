import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiurl="http://localhost:8080/tasks"
  constructor(private HttpClient : HttpClient) { }
  createTask(newtask:Task):Observable<Task>
    {
      return this.HttpClient.post<Task>(this.apiurl,newtask)
    }
    getalltasks():Observable<Task[]>
    {
      return this.HttpClient.get<Task[]>(this.apiurl);
    }
    updatetasks(taskid:number,updatedtasks:Task):Observable<Task>
    {
      return this.HttpClient.put<Task>(this.apiurl+'/'+taskid,updatedtasks);
    }

    deletetasks(taskid:number)
    {
      return this.HttpClient.delete(this.apiurl+'/'+taskid);
    }
}