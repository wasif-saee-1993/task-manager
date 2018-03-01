import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortable'
})
export class SortablePipe implements PipeTransform {

  transform(value: any, sortableColumn: string): any {
    if (!value || value.length === 0) {
      return value;
    } else {
      return this.sortByKey(value, sortableColumn);
    }
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      if (key === 'creator' || key === 'assignee') {
        var x = a[key].name; var y = b[key].name;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
    });
  }
}
