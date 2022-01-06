import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../services/task-service.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  errorMessage: String = '';
  buttonType: string = 'button';
  buttonPrimary: string = 'btn btn-primary';
  buttonSuccess: string = 'btn btn-success';
  buttonDanger: string = 'btn btn-danger';
  showAddtaskForm!: boolean;
  private subscriptions = new Subscription();

  constructor(private taskService: TaskService, private uiService: UiService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskService
        .getTask()
        .pipe(
          map((tasks: Task[]) =>
            tasks.filter(
              (currentTask: Task) =>
                currentTask.text?.trim().length != 0 &&
                currentTask.text != undefined
            )
          )
        )
        .subscribe(
          (data: Task[]) => ((this.tasks = data), (this.filteredTasks = data))
        )
    );
    this.subscriptions.add(
      this.uiService
        .onToggle()
        .subscribe((value) => (this.showAddtaskForm = value))
    );
  }

  toggleInputForm() {
    this.uiService.toggleAddtask();
  }
  addTask(task: Task): void {
    console.log(task);
    this.subscriptions.add(
      this.taskService.addTask(task).subscribe((task) => this.tasks.push(task))
    );
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

  toggleCompleteTask(task: Task): void {}

  ngonDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
