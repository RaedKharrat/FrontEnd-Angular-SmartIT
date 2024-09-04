import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageRequestFormComponent } from './stage-request-form.component';

describe('StageRequestFormComponent', () => {
  let component: StageRequestFormComponent;
  let fixture: ComponentFixture<StageRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StageRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
