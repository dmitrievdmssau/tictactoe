import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {Badge} from 'primeng/badge';
import {NgClass, NgIf} from '@angular/common';
import {Menubar} from 'primeng/menubar';
import {Image} from 'primeng/image';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-main-page-menu',
  imports: [
    Ripple,
    Badge,
    NgIf,
    NgClass,
    Menubar,
    Image,
    Button,
    RouterLink
  ],
  templateUrl: './main-page-menu.component.html',
  standalone: true,
  styleUrl: './main-page-menu.component.css'
})
export class MainPageMenuComponent {
  items: MenuItem[] = [
    {
      label: 'Главная',
      icon: 'pi pi-chart-pie',
      routerLink: '/cabinet',
    },
  ];

}
