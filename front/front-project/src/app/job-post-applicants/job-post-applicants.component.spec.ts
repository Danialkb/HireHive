import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostApplicantsComponent } from './job-post-applicants.component';

describe('JobPostApplicantsComponent', () => {
  let component: JobPostApplicantsComponent;
  let fixture: ComponentFixture<JobPostApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
