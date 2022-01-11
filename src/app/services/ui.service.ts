import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShowUiElements } from '../interfaces/show-ui-elements';
@Injectable({
  providedIn: 'root',
})
export class UiService {
    showSpecificUiElements: ShowUiElements = {
    showAddtaskForm: false,
    showButtonComponent: true,
    showFilterComponent: true,
  };
  private subject = new Subject<any>();
  constructor() {}

  toggleUiElements(): void {
    this.showSpecificUiElements.showAddtaskForm =
      !this.showSpecificUiElements.showAddtaskForm;

    this.showSpecificUiElements.showButtonComponent =
      !this.showSpecificUiElements.showButtonComponent;
    
    this.showSpecificUiElements.showFilterComponent =
      !this.showSpecificUiElements.showFilterComponent;
    
    this.subject.next(this.showSpecificUiElements);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
