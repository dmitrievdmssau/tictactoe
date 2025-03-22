import {Component, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {Breadcrumb} from 'primeng/breadcrumb';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-title-breadcrumb',
  imports: [
    Card,
    Breadcrumb
  ],
  templateUrl: './title-breadcrumb.component.html',
  styleUrl: './title-breadcrumb.component.css',
  standalone: true,
})
export class TitleBreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];
  home: MenuItem;
  title: string = '';

  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.updateBreadcrumbs();

    this.breadcrumbService.breadcrumbs$.subscribe(() => {
      this.updateBreadcrumbs();
    });
  }

  private updateBreadcrumbs(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.items = breadcrumbs.map(b => ({label: b.label, routerLink: b.url}));
      this.home = {label: this.items[0].url};
      this.title = this.items[this.items.length - 1].label;
    });
  }

}
