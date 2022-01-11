import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.css'],
})
export class SelectOptionsComponent implements OnInit {
  constructor() {}

  @Input() tasks: Task[] = [];
  @Output() filterCategory = new EventEmitter<String>();

  ngOnInit(): void {}

  selectedOption(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.filterCategory.emit((event.target as HTMLSelectElement).value);
  }
}
