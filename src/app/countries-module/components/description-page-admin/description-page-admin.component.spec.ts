import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPageAdminComponent } from './description-page-admin.component';

describe('DescriptionPageAdminComponent', () => {
  let component: DescriptionPageAdminComponent;
  let fixture: ComponentFixture<DescriptionPageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionPageAdminComponent]
    });
    fixture = TestBed.createComponent(DescriptionPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
