import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostDetailsComponent } from './job-post-details.component';

describe('JobPostDetailsComponent', () => {
  let component: JobPostDetailsComponent;
  let fixture: ComponentFixture<JobPostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
