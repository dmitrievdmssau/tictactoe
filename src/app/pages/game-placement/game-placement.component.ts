import {Component} from '@angular/core';
import {MainPageMenuComponent} from '../../components/main-page-menu/main-page-menu.component';
import {TitleBreadcrumbComponent} from '../../components/title-breadcrumb/title-breadcrumb.component';
import {GameFieldComponent} from '../../components/game-field/game-field.component';
import {StatisticService} from '../../services/statistic.service';
import {GameJudgeService} from '../../services/game-judge.service';
import {GameStatus, StepHistory} from '../../models/game-history.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-game-placement',
  imports: [
    MainPageMenuComponent,
    TitleBreadcrumbComponent,
    GameFieldComponent
  ],
  templateUrl: './game-placement.component.html',
  standalone: true,
  styleUrl: './game-placement.component.css'
})
export class GamePlacementComponent {

  protected id: number;

  constructor(private _statisticService: StatisticService,
              private _gameJudgeService: GameJudgeService,
              private _router: Router,
              private _confirmationService: ConfirmationService,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(s => {
      this.id = Number(s['game-id']);
      const status = this._statisticService.getStatus(this.id);
      if(status === undefined) {
        this._confirmationService.confirm({
          header: 'Игра не найдена!',
          message: 'Нам не удалось найти игру с таким id',
          acceptVisible: false,
          rejectLabel: 'ОК',
        });
        this._router.navigate(['/cabinet']).then();
      } else if(status !== GameStatus.IN_PROCESS) {
        this._confirmationService.confirm({
          header: 'Игра уже закончилась!',
          message: 'Игра уже была завершена! В ней победил ' + (status === GameStatus.WINNER_X ? 'X' : 'O'),
          acceptVisible: false,
          rejectLabel: 'ОК',
        });
        this._router.navigate(['/cabinet']).then();
      }
    })
  }

  generatePunishment() {
    const puns = [
      "Щелбан",
      "Два щелбана",
      "Три щелбана",
      "Сказать Ку-ка-ре-ку",
      "Признать, что он тупой",
      "Съесть черный холс и студеную воду выпить (это больно)",
    ]

    const r = this.getRandomInt(0, 5);
    return "Проигравшему достается: " + puns[r];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleCellClick(step: StepHistory) {
    const upd = this._statisticService.saveHistoryItem(this.id, step);
    const status = this._gameJudgeService.checkWinCombination(upd.history);
    if(status !== GameStatus.IN_PROCESS) {
      this._statisticService.setStatus(this.id, status);
      this._confirmationService.confirm({
        header: status === GameStatus.DRAW ? 'Ничья' : status === GameStatus.WINNER_X ? 'Победил Х' : 'Победил O',
        message: status === GameStatus.DRAW ? 'На этот раз без наказания' : this.generatePunishment(),
        acceptVisible: false,
        rejectLabel: 'ОК',
      });
      this._router.navigate(['/cabinet']).then();
    }
  }
}
