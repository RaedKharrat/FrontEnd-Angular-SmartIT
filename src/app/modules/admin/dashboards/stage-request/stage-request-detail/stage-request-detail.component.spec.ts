import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageRequestDetailComponent } from './stage-request-detail.component';

describe('StageRequestDetailComponent', () => {
  let component: StageRequestDetailComponent;
  let fixture: ComponentFixture<StageRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageRequestDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
