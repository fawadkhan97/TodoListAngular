import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  @Input() text!: string;
  @Input() type!: string;
  @Input() btnColor!: string;
  @Input() btnclass!: string;
  @Output() btnClick = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit(): void {}
  onClick() {
    this.btnClick.emit();
  }
}
