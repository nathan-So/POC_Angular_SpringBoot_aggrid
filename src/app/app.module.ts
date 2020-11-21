import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SearchBarCapComponent } from './search-bar-cap/search-bar-cap.component';
import { HeaderCapComponent } from './header-cap/header-cap.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { TableViewComponent } from './table-view/table-view.component';
import { AuthComponent } from './auth/auth.component';

// Services
import { TableService } from './Services/table.service';
import { TranslationService } from './Services/translation.service';
import { AddService } from './Services/add.service';

// Angular Materials
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ag-grid
import 'ag-grid-enterprise';
import { AgGridModule } from 'ag-grid-angular';


const appRoutes : Routes = [
  { path: '', component: TableViewComponent },
  { path: 'auth', component: AuthComponent },
  // { path: 'table', component: TableViewComponent },
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatSelectModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TableService,
    TranslationService,
    AppComponent,
    AddService,
  ],
  declarations: [AppComponent,
                SearchBarCapComponent,
                HeaderCapComponent,
                CourseDialogComponent,
                TableViewComponent,
                AuthComponent
                ],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent]
})

export class AppModule {}


