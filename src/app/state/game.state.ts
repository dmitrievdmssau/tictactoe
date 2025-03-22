import {Injectable} from '@angular/core';
import {StatisticService} from '../services/statistic.service';
import {GameHistoryModel, GameStatus, StepHistory} from '../models/game-history.model';
import {GameBeforeSettingsModel} from '../models/game-before-settings.model';
import {GameJudgeService} from '../services/game-judge.service';

@Injectable({
  providedIn: 'root'
})
export class GameState {

  private currentGame: GameHistoryModel;

  constructor(
    private readonly _statisticService: StatisticService,
    private readonly _gameJudgeService: GameJudgeService,
  ) {
    this.tryRecoverGame();
  }

  gameStart(gameSettings: GameBeforeSettingsModel) {
    this.currentGame = this._statisticService.createGameSession(gameSettings);
  }

  interruptCurrentGame() {
    this.currentGame.status = GameStatus.INTERRUPTED;
    this._statisticService.saveHistory(this.currentGame);
  }

  gameStep(historyStep: StepHistory) {
    this.currentGame.history.push(historyStep);
    this.currentGame.status = this._gameJudgeService.checkWinCombination(this.currentGame.history);
    this._statisticService.saveHistory(this.currentGame);
  }

  private tryRecoverGame() {
    this.currentGame = this._statisticService.noneFinishedGame;
  }


}
