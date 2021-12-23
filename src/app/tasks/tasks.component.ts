import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../services/task-service.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage: String = '';
  private subscriptions = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskService
        .getTask()
        .pipe(
          map((tasks: Task[]) =>
            tasks.filter(
              (currentTask: Task) => (
                console.log(currentTask.text),
                currentTask.text?.trim().length != 0 &&
                  currentTask.text != undefined
              )
            )
          )
        )
        .subscribe((data: Task[]) => (this.tasks = data))
    );
  }
  addTask(task: Task): void {
    console.log(task);
    this.subscriptions.add(this.taskService.addTask(task).subscribe());
    console.log(
      'requested to add task of task with task id: ',
      task.id,
      'category: ',
      task.category
    );
  }
  editTask(task: Task): void {
    console.log(task);
    this.subscriptions.add(this.taskService.editTask(task).subscribe());
    console.log(
      'requested to edit task of task with task id: ',
      task.id,
      'category: ',
      task.category
    );
  }

  deleteTask(task: Task): void {
    this.subscriptions.add(
      this.taskService
        .deleteTask(task)
        .subscribe(
          () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
        )
    );
    console.log(
      'requested for deletion of task with task id: ',
      task.id,
      'category: ',
      task.category,
      'completed'
    );

    return;
  }

  ngonDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
