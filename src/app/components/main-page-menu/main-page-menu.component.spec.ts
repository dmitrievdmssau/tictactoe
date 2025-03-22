import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMenuComponent } from './main-page-menu.component';

describe('MainPageMenuComponent', () => {
  let component: MainPageMenuComponent;
  let fixture: ComponentFixture<MainPageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
