import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostListComponent } from './job-post-list.component';

describe('JobPostListComponent', () => {
  let component: JobPostListComponent;
  let fixture: ComponentFixture<JobPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
