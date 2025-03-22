import {Component, EventEmitter, Input, Output} from '@angular/core';
import {clone} from 'lodash';
import {StepHistory} from '../../models/game-history.model';

@Component({
  selector: 'app-game-field',
  imports: [],
  templateUrl: './game-field.component.html',
  standalone: true,
  styleUrl: './game-field.component.css'
})
export class GameFieldComponent {
  @Input() rows: number;
  @Input() cols: number;
  @Input() gameId: number;

  @Output() handleCellClick: EventEmitter<StepHistory> = new EventEmitter();

  protected field: string[][] = [];
  private step: 'X' | 'O' = 'X';
  private stepNumber: number = 1;

  cellClick(i: number, j: number, event: MouseEvent) {
    event.stopPropagation();
    if(!this.field[i]) {
      this.field[i] = [];
    }
    if(this.field[i][j]) {
      return;
    }
    this.field[i][j] = clone(this.step);
    this.handleCellClick.emit({position: [i, j], step: this.stepNumber, isX: this.step === 'X'});
    this.step = this.step === 'X' ? 'O' : 'X';
  }
}
