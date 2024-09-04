import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageRequestListComponent } from './stage-request-list.component';

describe('StageRequestListComponent', () => {
  let component: StageRequestListComponent;
  let fixture: ComponentFixture<StageRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StageRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
