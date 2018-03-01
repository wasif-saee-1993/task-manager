import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {

  breadcrumbs: {text: string, link: string, css_class?: string}[];

  add(breadcrumbs) {
    this.breadcrumbs = breadcrumbs;
  }

  clear() {
    this.breadcrumbs = null;
  }

}
