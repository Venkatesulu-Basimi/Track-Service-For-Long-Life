import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindserviceComponent } from './findservice.component';

describe('FindserviceComponent', () => {
  let component: FindserviceComponent;
  let fixture: ComponentFixture<FindserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
