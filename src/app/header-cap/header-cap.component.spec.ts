import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCapComponent } from './header-cap.component';

describe('HeaderCapComponent', () => {
  let component: HeaderCapComponent;
  let fixture: ComponentFixture<HeaderCapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
