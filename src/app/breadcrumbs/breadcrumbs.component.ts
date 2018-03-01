import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
  }

}
