import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onDelete(task: Task): void {
    this.onDeleteTask.emit(task);
  }
  onEdit(task: Task): void {
    let text = prompt('Edit task');
    if (typeof text === 'string') {
      text.trim().length != 0
        ? (task.text = text)
        : alert('Please enter correct value');
    }
    console.log(task);
    this.onEditTask.emit(task);
  }
}
