import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../interfaces/task';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;

  isEditingTask: Boolean = false;
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();

  constructor(public datepipe: DatePipe) {}

  ngOnInit(): void {}

  onDelete(task: Task): void {
    this.onDeleteTask.emit(task);
  }

  editTask() {
    this.isEditingTask = !this.isEditingTask;
  }

  onEdit(task: Task): void {
    if (
      task.text.trim().length === 0 ||
      !task.category ||
      !task.priority ||
      !task.dateAdded
    ) {
      alert('Please enter correct values');
      return;
    }
    console.log(task);
    task.text = task.text.trim();
    task.dateModified = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.onEditTask.emit(task);
    this.isEditingTask = false;
  }

  toggleIsTaskCompleted(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.onEditTask.emit(task);
  }
}
