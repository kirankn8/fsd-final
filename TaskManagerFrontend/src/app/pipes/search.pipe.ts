import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(valueList: any, searchText: string, key?: string): any {
    let tempList = valueList;
    if (searchText && searchText.trim()) {
      searchText = searchText.trim().toLowerCase();
      tempList = valueList.filter(it => {
        for (const prop of Object.keys(it)) {
          if (prop === '_id') { continue; }
          if (typeof it[prop] === 'string' &&
            it[prop].toLowerCase().includes(searchText)) { return true; }
        }
        return false;
      });
    }
    if (key && tempList) {
      tempList.sort(function (a, b) {
        const x = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
        const y = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    }
    return tempList;
  }

}
