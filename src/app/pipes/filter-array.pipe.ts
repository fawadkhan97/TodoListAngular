import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/task';

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  transform(value: Task[], ...args: any): String[] {
    let newArray = [...new Set(value.map((task) => task.category))];
    return newArray;
  }
}
