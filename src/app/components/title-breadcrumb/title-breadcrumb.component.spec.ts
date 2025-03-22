import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBreadcrumbComponent } from './title-breadcrumb.component';

describe('TitleBreadcrumbComponent', () => {
  let component: TitleBreadcrumbComponent;
  let fixture: ComponentFixture<TitleBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
