import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTable1Component } from './mat-table1.component';

describe('MatTable1Component', () => {
  let component: MatTable1Component;
  let fixture: ComponentFixture<MatTable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTable1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
