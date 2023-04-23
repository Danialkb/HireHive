import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostApplicationComponent } from './job-post-application.component';

describe('JobPostApplicationComponent', () => {
  let component: JobPostApplicationComponent;
  let fixture: ComponentFixture<JobPostApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
