import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  buttonType: string = 'button';
  buttonPrimary: string = 'btn btn-primary';
  buttonSuccess: string = 'btn btn-success';
  buttonDanger: string = 'btn btn-danger'

  showAddtaskForm!: boolean;
  subscriptions!: Subscription;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.subscriptions = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddtaskForm = value));
  }
  toggleInputForm() {
    this.uiService.toggleAddtask();
  }
}
