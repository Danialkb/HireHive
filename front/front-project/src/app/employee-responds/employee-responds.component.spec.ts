import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRespondsComponent } from './employee-responds.component';

describe('EmployeeRespondsComponent', () => {
  let component: EmployeeRespondsComponent;
  let fixture: ComponentFixture<EmployeeRespondsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRespondsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRespondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
