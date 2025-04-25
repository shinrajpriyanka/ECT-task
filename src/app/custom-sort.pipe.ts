import { Pipe, PipeTransform } from '@angular/core';
import { customer } from './repeater/option.model'

@Pipe({
  name: 'customSort',
  standalone: true,
})

export class CustomSortPipe implements PipeTransform {

  transform(value: any[], criteria: string | Array<string>): any {
    let sortedItems=[...value];
    let sortBy = criteria;
    if(typeof(criteria) === 'string') {
      let direction = criteria.startsWith("-") ? 'asc' : 'desc';
      this.sorted(sortedItems,criteria, direction);
    }
    if(Array.isArray(criteria)) {
      let prop1 = criteria[0].startsWith('-') ? criteria[0].substring(1) : criteria[0];
      let prop2 = criteria[1].startsWith('-') ? criteria[1].substring(1) : criteria[1];
      let direction1 = criteria[0].startsWith("-") ? 'asc' : 'desc';
      let direction2 = criteria[1].startsWith("-") ? 'asc' : 'desc';
      sortedItems.sort((a, b) => ((direction1 === 'asc')? (a[prop1].localeCompare(b[prop1])) : (b[prop1].localeCompare(a[prop1]))) || ((direction1 === 'asc')?(a[prop2] - b[prop2]) : (b[prop2] - a[prop2])));
    }
    return sortedItems;
  }

    // sortedItems.sort((a,b) => {
    //   if(direction === 'asc') {
    //     return a[criteria] > b[criteria] ? 1 : -1;
    //   }
    //   else {
    //     return a[criteria] > b[criteria] ? -1 : 1;
    //   }
    // })
    sorted(sortedItems: any[], criteria: string, direction: string) {
      sortedItems.sort((a,b) => {
        if(direction === 'asc' && typeof(a[criteria] && b[criteria])=== 'number') {
          return a[criteria] > b[criteria] ? 1 : -1;
        }
        else if (direction === 'desc' && typeof(a[criteria] && b[criteria])=== 'number'){
          return a[criteria] > b[criteria] ? -1 : 1;
        }
        // else if(direction === 'asc' && typeof(a[criteria] && b[criteria])=== 'string') {
        //   //return a[criteria].localeCompare(b[criteria]);
        // }
        // else if (direction === 'desc' && typeof(a[criteria] && b[criteria])=== 'string'){
        //   return a[criteria].toLocaleUpperCase() > b[criteria].toLocaleUpperCase() ? -1 : 1;
        // }
        else {
          return 0;
        }
      })
      return sortedItems;
    }
}
// 1) Create a sorting pipe
// - sorting criteria can be either string or Array<string>
// - use “-” to specify if the sorting should be ascending or descending
// - consider all primitive types, objects, arrays and dates
// // Examples
// // Simple sort by name
// <div *ngFor=”let item of options | customSort: '-name'”>{{item}}</div>
// // Sort by name and then by price
// <div *ngFor=”let item of options | customSort: ['name', '-
// price']”>{{item}}</div>