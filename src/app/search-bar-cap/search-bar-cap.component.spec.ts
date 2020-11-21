import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarCapComponent } from './search-bar-cap.component';

describe('SearchBarCapComponent', () => {
  let component: SearchBarCapComponent;
  let fixture: ComponentFixture<SearchBarCapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarCapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
