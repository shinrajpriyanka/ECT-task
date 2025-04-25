import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customSort',
  standalone: true,
})
export class CustomSortPipe implements PipeTransform {
  /**TODO change any type to consider all primitive types, objects, arrays and dates*/
  transform(value: any[], criteria: string | Array<string>): any {
    let sortedItems = [...value];
    if (typeof criteria === 'string') {
      let direction = criteria.startsWith('-') ? 'asc' : 'desc';
      let sortColumn = criteria.startsWith('-')
        ? criteria.substring(1)
        : criteria;
      this.sorted(sortedItems, sortColumn, direction);
    }

    if (Array.isArray(criteria)) {
      /**
       * For sorting based on dynamic criteria when input is array
       */
      // criteria.forEach(element => {
      //   let sortColumn = element.startsWith('-') ? element.substring(1) : element;
      //   let direction = element.startsWith('-') ? 'asc' : 'desc';
      // });
      let prop1 = criteria[0].startsWith('-')
        ? criteria[0].substring(1)
        : criteria[0];
      let prop2 = criteria[1].startsWith('-')
        ? criteria[1].substring(1)
        : criteria[1];
      let direction1 = criteria[0].startsWith('-') ? 'asc' : 'desc';
      let direction2 = criteria[1].startsWith('-') ? 'asc' : 'desc';
      sortedItems.sort(
        (a, b) =>
          (direction1 === 'asc'
            ? a[prop1].localeCompare(b[prop1])
            : b[prop1].localeCompare(a[prop1])) ||
          (direction2 === 'asc' ? a[prop2] - b[prop2] : b[prop2] - a[prop2])
      );
    }
    return sortedItems;
  }
  sorted(sortedItems: any[], criteria: string, direction: string) {
    sortedItems.sort((a, b) => {
      if (typeof a[criteria] === 'number') {
        if (direction === 'asc') {
          return a[criteria] > b[criteria] ? 1 : -1;
        } else {
          return a[criteria] > b[criteria] ? -1 : 1;
        }
      } else {
        if (direction === 'asc') {
          return a[criteria].localeCompare(b[criteria]);
        } else {
          return b[criteria].localeCompare(a[criteria]);
        }
      }
    });
    return sortedItems;
  }
}
