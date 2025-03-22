import {Injectable} from '@angular/core';
import {GameStatus, StepHistory} from '../models/game-history.model';

@Injectable({
  providedIn: 'root'
})
export class GameJudgeService {

  constructor() {
  }

  public checkWinCombination(gameHistory: StepHistory[]): GameStatus {

    const checkWinner = (tw: [number, number][]) => {
      return ((tw.some(s => s[0] === 0 && s[1] === 0) && tw.some(s => s[0] === 1 && s[1] === 1) && tw.some(s => s[0] === 2 && s[1] === 2)) ||
        (tw.some(s => s[0] === 2 && s[1] === 0) && tw.some(s => s[0] === 1 && s[1] === 1) && tw.some(s => s[0] === 0 && s[1] === 2)) ||

        (tw.some(s => s[0] === 0 && s[1] === 0) && tw.some(s => s[0] === 0 && s[1] === 1) && tw.some(s => s[0] === 0 && s[1] === 2)) ||
        (tw.some(s => s[0] === 1 && s[1] === 0) && tw.some(s => s[0] === 1 && s[1] === 1) && tw.some(s => s[0] === 1 && s[1] === 2)) ||
        (tw.some(s => s[0] === 2 && s[1] === 0) && tw.some(s => s[0] === 2 && s[1] === 1) && tw.some(s => s[0] === 2 && s[1] === 2)) ||

        (tw.some(s => s[0] === 0 && s[1] === 0) && tw.some(s => s[0] === 1 && s[1] === 0) && tw.some(s => s[0] === 2 && s[1] === 0)) ||
        (tw.some(s => s[0] === 0 && s[1] === 1) && tw.some(s => s[0] === 1 && s[1] === 1) && tw.some(s => s[0] === 2 && s[1] === 1)) ||
        (tw.some(s => s[0] === 0 && s[1] === 2) && tw.some(s => s[0] === 1 && s[1] === 2) && tw.some(s => s[0] === 2 && s[1] === 2)));
    }

    const xGamer = gameHistory.filter(f => f.isX).map(m => m.position);
    const oGamer = gameHistory.filter(f => !f.isX).map(m => m.position);

    if (checkWinner(xGamer)) {
      return GameStatus.WINNER_X;
    } else if (checkWinner(oGamer))
      return GameStatus.WINNER_O;
    else if (xGamer.length + oGamer.length === 9) {
      return GameStatus.DRAW;
    } else {
      return GameStatus.IN_PROCESS;
    }
  }
}
