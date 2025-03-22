import { Component } from '@angular/core';
import {MainPageMenuComponent} from '../../components/main-page-menu/main-page-menu.component';
import {RouterOutlet} from '@angular/router';
import {TitleBreadcrumbComponent} from '../../components/title-breadcrumb/title-breadcrumb.component';

@Component({
  selector: 'app-main-page',
  imports: [MainPageMenuComponent, RouterOutlet, TitleBreadcrumbComponent],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
