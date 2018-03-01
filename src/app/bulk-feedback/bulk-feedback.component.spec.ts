import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkFeedbackComponent } from './bulk-feedback.component';

describe('BulkFeedbackComponent', () => {
  let component: BulkFeedbackComponent;
  let fixture: ComponentFixture<BulkFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
