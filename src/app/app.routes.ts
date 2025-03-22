import {Routes} from '@angular/router';
import {UserSignInComponent} from './components/user-sign-in/user-sign-in.component';
import {UserSignUpComponent} from './components/user-sign-up/user-sign-up.component';
import {AuthGuard} from './guards/auth.guard';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {GameSettingsComponent} from './components/game-settings/game-settings.component';
import {GamePlacementComponent} from './pages/game-placement/game-placement.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cabinet',
    pathMatch: 'full',
  },
  {
    component: UserSignInComponent,
    path: 'user/sign-in',
    data: { title: 'Вход в систему', breadcrumb: 'Вход в систему' }
  },
  {
    component: UserSignUpComponent,
    path: 'user/sign-up',
    data: { title: 'Регистрация', breadcrumb: 'Регистрация' }
  },
  {
    component: GamePlacementComponent,
    path: 'play/:game-id',
    data: { title: 'Игра', breadcrumb: 'Игра' }
  },
  {
    component: MainPageComponent,
    path: 'cabinet',
    canActivate: [AuthGuard],
    data: { title: 'Кабинет игрока', breadcrumb: 'Кабинет игрока' },
    children: [{
        component: GameSettingsComponent,
        path: 'game-settings',
        data: { title: 'Настройки игры', breadcrumb: 'Настройки игры' },
      }
    ]
  },
];
