import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincountriesPageComponent } from './maincountries-page.component';

describe('MaincountriesPageComponent', () => {
  let component: MaincountriesPageComponent;
  let fixture: ComponentFixture<MaincountriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaincountriesPageComponent]
    });
    fixture = TestBed.createComponent(MaincountriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
