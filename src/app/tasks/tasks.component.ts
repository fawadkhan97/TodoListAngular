import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task-service.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from '../services/ui.service';
import { ShowUiElements } from '../interfaces/show-ui-elements';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] =  [
    {
      "id": 1,
      "text": "buy grocceries",
      "isCompleted": false,
      "category": "office",
      "dateAdded": "2021-12-21",
      "priority": "high"
    },
    {
      "id": 2,
      "text": "Pay bills",
      "isCompleted": true,
      "category": "office",
      "dateAdded": "2021-12-21",
      "priority": "medium"
    },
    {
      "id": 3,
      "text": "add new items",
      "isCompleted": false,
      "category": "other",
      "dateAdded": "2021-12-21",
      "priority": "low"
    },
    {
      "id": 4,
      "text": "go to gym",
      "isCompleted": false,
      "category": "other",
      "dateAdded": "2021-12-21",
      "priority": "low"
    },
    
    {
      "id": 9,
      "text": "get new items",
      "isCompleted": false,
      "category": "other",
      "dateAdded": "2021-12-23T16:36:40.447Z",
      "priority": "low"
    }
  ]
  errorMessage: String = '';
  buttonType: string = 'button';
  buttonPrimary: string = 'btn btn-primary';
  buttonSuccess: string = 'btn btn-success';
  buttonDanger: string = 'btn btn-danger';
  showAddtaskForm!: Boolean;
  showButtonComponent: Boolean = true;
  showFilterComponent: Boolean = true;

  private subscriptions = new Subscription();

  constructor(private taskService: TaskService, private uiService: UiService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskService
        .getTask()
        .pipe(
          map((tasks: Task[]) =>
            // filter tasks array to prevent
            // duplicates by comparing id,
            //task with id or text null or if task text is empty

            tasks.filter(
              (task, index, arr) =>
                arr.findIndex((arrtask) => arrtask.id === task.id) === index &&
                task.id !== undefined &&
                task.text?.trim().length !== 0 &&
                task.text !== undefined
            )
          )
        )
        .subscribe(
          (data: Task[]) => (
            (this.tasks = data), (this.filteredTasks = data), console.log(data)
          )
        )
    );
    this.subscriptions.add(
      this.uiService
        .onToggle()
        .subscribe(
          (value: ShowUiElements) => (
            (this.showAddtaskForm = value.showAddtaskForm),
            ((this.showButtonComponent = value.showButtonComponent),
            (this.showFilterComponent = value.showFilterComponent))
          )
        )
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('hellow');
    console.log(changes['Products'].currentValue);
  }

  toggleInputForm() {
    this.uiService.toggleUiElements();
  }

  addTask(task: Task): void {
    console.log(task);
    this.tasks.push(task);
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
  editTask(task: any): void {
    console.log('edit is called ', this.tasks);
    this.subscriptions.add(this.taskService.editTask(task).subscribe());
    console.log('edited', this.tasks);
  }

  deleteTask(task: Task): void {
    this.subscriptions.add(
      this.taskService
        .deleteTask(task)
        .subscribe(
          () =>
            (this.filteredTasks = this.filteredTasks.filter(
              (t) => t.id !== task.id
            ))
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

  filterTask(filterCategory: String): void {
    if (filterCategory === 'all') {
      this.filteredTasks = this.tasks;
      console.log(this.filteredTasks);
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.category === filterCategory
      );
      console.log(this.filteredTasks);
    }
  }

  toggleCompleteTask(task: Task): void {}

  ngonDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
