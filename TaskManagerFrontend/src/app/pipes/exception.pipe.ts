import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exceptionId'
})
export class ExceptionPipe implements PipeTransform {

  transform(valueList: any, exceptionIDList?: any): any {
    if (exceptionIDList) {
      return valueList.filter(element =>
        exceptionIDList.indexOf(element._id) === -1
      );
    }
    return valueList;
  }

}
