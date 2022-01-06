import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddtaskForm: boolean = false;
  private subject = new Subject<any>();
  constructor() {}

  toggleAddtask(): void {
    this.showAddtaskForm = !this.showAddtaskForm;
    this.subject.next(this.showAddtaskForm);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
