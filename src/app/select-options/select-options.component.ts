import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.css'],
})
export class SelectOptionsComponent implements OnInit {
  constructor() {}

 @Input() tasks: Task[] = [];
  ngOnInit(): void {}

  selectedOption(event: any) {
    console.log(event.value);
  }
}
