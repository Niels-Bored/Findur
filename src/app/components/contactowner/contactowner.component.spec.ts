import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactownerComponent } from './contactowner.component';

describe('ContactownerComponent', () => {
  let component: ContactownerComponent;
  let fixture: ComponentFixture<ContactownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactownerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
