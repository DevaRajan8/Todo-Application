import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  tasks:Task[]=[]
  editasks:Task|null=null;
  updatedtasks:Task={desp:"",complete:false};
  constructor(private taskservice:TaskService){}
  ngOnInit(): void {
    this.getalltasks();
  }
  newtask:Task={desp:"",complete:false};
  createTask():void
  {
    this.taskservice.createTask(this.newtask).subscribe((createdtask)=>
    {
      this.newtask={desp:"",complete:false};
      this.tasks.push(createdtask);
    })
  }
  getalltasks()
  {
    this.taskservice.getalltasks().subscribe((tasks)=>
    {
      this.tasks=tasks;
    })
  }
  editTasks(task:Task)
  {
    this.editasks=task;
    this.updatedtasks={...task};
  }
  updateTasks():void
  {
    if(this.editasks)
    {
      this.taskservice.updatetasks(this.editasks.id!,this.updatedtasks).subscribe((res)=>{
        const ind=this.tasks.findIndex((task)=>task.id==this.editasks!.id);
        if(ind!=-1)
        {
          this.tasks[ind]=res;
          this.canceledit();
        }
      });
    }
  }
  canceledit()
  {
    this.editasks=null;
    this.updatedtasks={desp:"",complete:false};
  }
  deletetask(taskid:any)
  {
    if(confirm("Are you sure ?")){
    this.taskservice.deletetasks(taskid).subscribe(()=>{
      this.tasks=this.tasks.filter((task)=> task.id !==taskid)
      if(this.editasks && this.editasks==taskid)
      {
        this.canceledit();
      }
    })
  }
}
}
