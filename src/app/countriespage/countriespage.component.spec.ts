import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriespageComponent } from './countriespage.component';

describe('CountriespageComponent', () => {
  let component: CountriespageComponent;
  let fixture: ComponentFixture<CountriespageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountriespageComponent]
    });
    fixture = TestBed.createComponent(CountriespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
