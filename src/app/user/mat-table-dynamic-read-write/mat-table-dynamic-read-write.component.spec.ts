import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableDynamicReadWriteComponent } from './mat-table-dynamic-read-write.component';

describe('MatTableDynamicReadWriteComponent', () => {
  let component: MatTableDynamicReadWriteComponent;
  let fixture: ComponentFixture<MatTableDynamicReadWriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableDynamicReadWriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableDynamicReadWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
