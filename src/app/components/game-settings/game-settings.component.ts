import {Component} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {StatisticService} from '../../services/statistic.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-settings',
  imports: [
    Card,
    Button,
    FormsModule
  ],
  templateUrl: './game-settings.component.html',
  standalone: true,
  styleUrl: './game-settings.component.css'
})
export class GameSettingsComponent {

  constructor(private _statisticService: StatisticService,
              private _router: Router,) {
  }

  startGame() {
   const gameMeta = this._statisticService.createGameSession({daemonOpponent: false});
   this._router.navigate(['/play', gameMeta.id]).then();
  }
}
