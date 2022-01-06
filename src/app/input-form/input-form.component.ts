import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  showAddtaskForm!: boolean;
  subscriptions!: Subscription;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text: string = '';
  category!: 'office' | 'other' | 'personal';
  priority!: 'low' | 'high' | 'medium';
  dateAdded!: Date;
  buttonType: string = 'submit';

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.subscriptions = this.uiService
      .onToggle()
      .subscribe((value) => this.showAddtaskForm=value);
    
    
  }

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

    this.onAddTask.emit(task);
  }
}
