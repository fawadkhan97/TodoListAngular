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

  text: string = '';
  category!: 'office' | 'other' | 'personal';
  priority!: 'low' | 'high' | 'medium';
  dateAdded!: Date;
  buttonType: string = 'submit';

  constructor(private taskservice: TaskService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.text.trim().length === 0 ||
      !this.category ||
      !this.priority ||
      !this.dateAdded
    ) {
      alert('Please enter correct values');
      return;
    }

    const task: Task = {
      text: this.text,
      category: this.category,
      priority: this.priority,
      dateAdded: this.dateAdded,
      isCompleted: false,
    };

    console.log(task);
    this.text = '';
    this.dateAdded;
  }
  log(x: any) {
    console.log(x);
  }
}
