import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTable3Component } from './mat-table3.component';

describe('MatTable3Component', () => {
  let component: MatTable3Component;
  let fixture: ComponentFixture<MatTable3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTable3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTable3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
