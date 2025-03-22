import {Injectable} from '@angular/core';
import {GameHistoryModel, GameStatus, StepHistory} from '../models/game-history.model';
import {GameBeforeSettingsModel} from '../models/game-before-settings.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private readonly LOCALSTORAGE_DB_KEY = "DB_GAME_HISTORY";

  constructor() {
  }

  public get noneFinishedGame() {
    const lastGame = this.connectDB().sort((a, b) => a.id - b.id).pop();
    return !lastGame.status ? lastGame : null;
  }

  private get freeDBId(): number {
    const db = this.connectDB();
    if (db.length === 0) {
      return 1;
    } else {
      return db.map(m => m.id).sort().pop() + 1;
    }
  }

  public getRecords(): GameHistoryModel[] {
    return this.connectDB();
  }

  public createGameSession(gameSettings: GameBeforeSettingsModel): GameHistoryModel {
    const gameHistory: GameHistoryModel = {
      id: this.freeDBId,
      history: [],
      daemonOpponent: gameSettings.daemonOpponent,
      status: GameStatus.IN_PROCESS,
      start: new Date(),
      finished: null,
    }

    const gameHistories = this.connectDB();
    gameHistories.push(gameHistory);
    this.closeDB(gameHistories);
    return gameHistory;
  }

  public saveHistoryItem(id: number, historyItem: StepHistory) {
   const hist = this.getRecords().filter(f => f.id === id)[0];
   if(hist.status !== GameStatus.IN_PROCESS){
     return hist;
   }
   hist.history.push(historyItem);
   this.saveHistory(hist);
   return hist;
  }

  public setStatus(id: number, status: GameStatus) {
    const hist = this.getRecords().filter(f => f.id === id)[0];
    hist.status = status;
    this.saveHistory(hist);
    return hist;
  }

  public getStatus(id: number) {
    const hist = this.getRecords().filter(f => f.id === id)[0];
    return hist ? hist.status : undefined;
  }

  getHistoryById(id: number) {
   return  this.getRecords().find(f => f.id === id);
  }

  public saveHistory(gameHistory: GameHistoryModel) {
    const gameHistoryDb = this.connectDB().find(g => g.id === gameHistory.id);

    if(gameHistoryDb) {

      if(gameHistoryDb.finished || gameHistoryDb.status !== GameStatus.IN_PROCESS) {
        throw new Error('Game already closed!')
      }

      const filteredGames = this.connectDB().filter(g => g.id !== gameHistory.id);
      filteredGames.push(gameHistory);
      this.closeDB(filteredGames);
    } else {
      throw new Error("Game with id: " + gameHistory.id + ' not found');
    }
  }

  private connectDB(): GameHistoryModel[] {
    const db = localStorage.getItem(this.LOCALSTORAGE_DB_KEY);
    if (db) {
      return JSON.parse(db) as GameHistoryModel[];
    } else {
      localStorage.setItem(this.LOCALSTORAGE_DB_KEY, JSON.stringify([]));
      return [];
    }
  }

  private closeDB(data: GameHistoryModel[]) {
    localStorage.setItem(this.LOCALSTORAGE_DB_KEY, JSON.stringify(data));
  }
}
