import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlacementComponent } from './game-placement.component';

describe('GamePlacementComponent', () => {
  let component: GamePlacementComponent;
  let fixture: ComponentFixture<GamePlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlacementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
