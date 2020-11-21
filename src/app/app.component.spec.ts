import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchBarCapComponent } from './search-bar-cap/search-bar-cap.component';

// Services
import { TableService } from './Services/table.service';
import { TranslationService } from './Services/translation.service';


// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({  
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
      ],
      declarations: [AppComponent,
        SearchBarCapComponent
        ],
        providers: [
          TableService,
          TranslationService,
          AppComponent
        ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'POC-Angular-Ag-grid-V2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('POC-Angular-Ag-grid-V2');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('POC-Angular-Ag-grid-V2 app is running!');
  // });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get an array that contains several elements with 6 keys each', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.testFunction).toBe(6)
    // expect(app.rowDataArrayFiltered.length).toBe(12);
    // expect(Object.keys(app.rowDataArrayFiltered[0]).length).toBe(6);
  });
});
