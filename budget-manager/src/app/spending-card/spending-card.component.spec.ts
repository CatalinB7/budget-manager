import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingCardComponent } from './spending-card.component';

describe('SpendingCardComponent', () => {
  let component: SpendingCardComponent;
  let fixture: ComponentFixture<SpendingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
