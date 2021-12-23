import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../services/task-service.service';
import { Task } from '../task';
@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(private taskservice: TaskService) {}

  ngOnInit(): void {}
  addTask() {
    let task: Task = {
      id: 9,
      text: '',
      isCompleted: false,
      category: 'other',
      dateAdded: new Date(),
      Priority: 'low',
    };
    let text = prompt('add a new task');

    text ? (task.text = text) : '';
    this.taskservice.addTask(task).subscribe();
    console.log(task);
  }

  log(x: any) {
    console.log(x);
  }
}
