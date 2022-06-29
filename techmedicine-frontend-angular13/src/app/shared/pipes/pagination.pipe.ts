import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
  transform(objects: any[], page: number, itensPerPage: number): any[] {
    const startItem = (page - 1) * itensPerPage;
    const endItem = page * itensPerPage;
    objects = objects.slice(startItem, endItem);
    return objects;
  }
}
