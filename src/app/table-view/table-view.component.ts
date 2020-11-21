import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TableModel } from '../table.model';
import { TableObject } from '../tableObject.model'
//****
import { PostDataModel } from '../postData.model';
//****
import { HttpClient } from "@angular/common/http";
import { AgGridAngular } from "ag-grid-angular";
import { TableService } from '../Services/table.service';
import { AddService } from '../Services/add.service';
import { TranslationService } from '../Services/translation.service';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  //VARIABLES
  @Input('language') language:string="Eng";
  @ViewChild("agGrid", {static:false}) agGrid: AgGridAngular;
  // ****
  public gridOptions;
  // ****
  public gridColumnApi;
  public gridApi;
  public hide = false;
  public columnDefs;
  public autoGroupColumnDef;
  public defaultColDef;
  public rowData : any;
  public rowDataArrayFiltered : any;
  public API : string = "https://raw.githubusercontent.com/nathan-So/demo_fichier_json/master/table_AgGridAngular.JSON";
  public names;projectCode;date;plateform;technologies;clientProject;
  public TITLE : string = "POC: Liste de projets - Angular / Ag-grid";
  dialogProjectCode: number;
  dialogName: string = "";
  dialogDate: number;
  dialogPlateform: string = "";
  // dialogTechnology: string = "";
  // ****
  // dialogTechnology: Array<string>;
  dialogTechnology: string;
  // ****
  dialogClientProject: string = "";
  newProject : TableObject;
  //****
  postData : PostDataModel;
  //****

  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;
  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
}


  //CONSTRUCTOR , NGONINIT
  constructor(public router : Router, public http: HttpClient, public addService : AddService ,public TableService: TableService, public translationService: TranslationService, private dialog: MatDialog){
    // this.refreshHeaderNames();
    this.names = this.translationService.translate('NAME', this.language);
    this.projectCode = this.translationService.translate('PROJECT_CODE', this.language);
    this.date = this.translationService.translate('DATE', this.language);
    this.plateform = this.translationService.translate('PLATFORM_WEB_OR_MOBILE', this.language);
    this.technologies = this.translationService.translate('TECHNOLOGIES', this.language);
    this.clientProject = this.translationService.translate('CLIENT_PROJECT', this.language);
    
    this.columnDefs = [
      { headerName: this.translationService.translate('PROJECT_CODE', this.language), field:"projectCode"},
      { headerName: this.translationService.translate('DATE', this.language), field:"date", rowGroup : true},
      { headerName : this.translationService.translate('DETAIL', this.language),
        children: [
        { headerName: this.translationService.translate('PLATFORM_WEB_OR_MOBILE', this.language), field:"plateform", rowGroup:true},
        { headerName: this.translationService.translate('TECHNOLOGIES', this.language), field:"technologies", filter : true, columnGroupShow: 'closed' },
        { headerName: this.translationService.translate('CLIENT_PROJECT', this.language), field:"clientProject", columnGroupShow: 'closed' }
        ]
      }
    ];  
    this.autoGroupColumnDef = {
      headerName: this.translationService.translate('NAME', this.language),
      field: 'name',
      sortable : true,  
      cellRenderer : 'agGroupCellRenderer',
      cellRendererParams : {
        checkbox : true
      }
    };

    this.defaultColDef = {
      width : 200,
      editable : true,
      resizable: true,
    };

    console.log("START_table-view_constructor_getTable()",this.rowData)
    this.rowData = this.TableService.getTable();
    this.rowDataArrayFiltered = this.rowData;
    console.log("END_table-view_constructor_getTable()",this.rowData)

    this.gridOptions = {
      enableSorting: true,
      rowData: this.rowData,
      columnDefs: this.columnDefs,
      autoGroupColumnDef : this.autoGroupColumnDef,
      defaultColDef : this.defaultColDef,
      onReady: () => {
          this.gridOptions.api.sizeColumnsToFit();
          alert(this.gridOptions.api);
          this.rowData = this.TableService.getTable();
          this.rowDataArrayFiltered = this.rowData;
          console.log('onReady', this.rowData)
      }
  };
}

  ngOnInit(){
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
           this.gridOptions.api.sizeColumnsToFit();
           this.gridOptions.api.refreshCells();
       }
   }; 
  };

 
  //DIALOG
  openDialog(): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {
        dialogProjectCode: this.dialogProjectCode, 
        dialogName: this.dialogName,
        dialogDate: this.dialogDate, 
        dialogPlateform: this.dialogPlateform,
        dialogTechnology: this.dialogTechnology,
        dialogClientProject: this.dialogClientProject}
    });

    dialogRef.afterClosed().subscribe(result => {
      // let tabletechno : Array<string> = [];

      console.log('The dialog was closed');
      
      // tabletechno.push(result.dialogTechnology.toString())
      // this.newProject = new TableObject(result, tabletechno)
      this.newProject = new TableObject(result)
      
      console.log("afterClosed()_newProject",this.newProject);
  
      console.log("START_this.onSubmit");
      this.onSubmit();
      console.log("END_this.onSubmit");
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
      this.refreshHeaderNames();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
    });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
    this.refreshHeaderNames();
    this.triggerFalseClick()
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
    // this.refresh();
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/auth']); });
  };


  //FUNCTIONS
  onSubmit() {
    this.addService.postProject(this.newProject)
    .subscribe(
      res => {this.newProject},
      err => {
        if(err.status === 403 ) { alert(err.error)};
        console.log(err.status);
      }
    );
// await getTable() tant que http reponse sendProject pas recu 
// puis refresh juste la donnée du tableau ag grid (methodes d'ag grid)
// OU refresh la page juste après le send (methode angular)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
    this.refresh();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
    // this.rowData = this.TableService.getTable()
    // console.log(this.rowData)
    // this.changeLanguage()
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
    this.refreshHeaderNames();
    this.ngOnInit();
    this.triggerFalseClick()
    this.refreshHeaderNames();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
  };

  refresh() { 
    // console.log("refreshing");
    //   var params = {
    //     force: true,
    //     suppressFlash: true,
    //   };
    //   this.gridApi.refreshCells(params);
    
      // console.log("START_getTable()_inIefresh()",this.rowData);
      this.rowData = this.TableService.getTable();
      this.rowDataArrayFiltered = this.rowData;
      // console.log("END_getTable()_inIefresh()",this.rowData);

      // console.log("START_inRefresh()",this.rowData);
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });

      // console.log("END_inRefresh()",this.rowData);
      this.refreshHeaderNames();
      this.triggerFalseClick()
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/auth']); });
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
      this.refreshHeaderNames();
      // this.triggerFalseClick()
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("START_table-view_onGridReady_getTable()")
    this.rowData = this.TableService.getTable();
    this.rowDataArrayFiltered = this.rowData;
    console.log("END_table-view_onGridReady_getTable()")
    params.api.sizeColumnsToFit();
  };

  testFunction () {
    console.log(Object.keys(this.rowData[0]).length);
    return Object.keys(this.rowData[0]).length;
  };

  changeLanguage() {
    console.log("Language choisi",this.language);
    this.refreshHeaderNames();
  };

  //faire une fonction "handleChange()" qui regroupe les suivantes et qu'on peut appeler par attribut "Name" "Tech" etc.
  handleChangeName($event) {
    this.rowDataArrayFiltered = this.rowData.filter(e => e.name.toLowerCase().includes($event));
  };
  handleChangeTech($event) {
    this.rowDataArrayFiltered = this.rowData.filter(e => e.technology.some(t=>t.toLowerCase().includes($event)));
  };
  handleChangeProj($event) {
    this.rowDataArrayFiltered = this.rowData.filter(e => e.clientProject.toLowerCase().includes($event));
  };
  handleChangePlat($event) {
    this.rowDataArrayFiltered = this.rowData.filter(e => e.plateform.toLowerCase().includes($event));
  };
  handleChangeProjectCode($event) {
    this.rowDataArrayFiltered = this.rowData.map((e)=>{return {...e, projectCode: e.projectCode.toString()}}).filter(e => e.projectCode.includes($event));
  };
  handleChangeDate($event) {
    this.rowDataArrayFiltered = this.rowData.map((e)=>{return {...e, date: e.date.toString()}}).filter(e => e.date.includes($event));
  };



  getSelectedRows(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedDataStringPresentation = selectedNodes.map(node => "Id: " + node.data.projectCode + " " + " Technologies: " + node.data.technologies).join(" /// ");
    alert(`Données selectionnées : ${selectedDataStringPresentation}`);
    console.log(this.rowData);
  };
  
  hideModel(){
    this.agGrid.columnApi.setColumnsVisible(['projectCode', 'date'], false);
    this.agGrid.api.sizeColumnsToFit();
    this.hide = true;
  };
  
  showModel()
  {
    this.agGrid.columnApi.setColumnsVisible(['projectCode', 'date'], true);
    this.agGrid.api.sizeColumnsToFit();
    this.hide = false;
  };

  refreshHeaderNames() {
    this.names = this.translationService.translate('NAME', this.language);
    this.projectCode = this.translationService.translate('PROJECT_CODE', this.language);
    this.date = this.translationService.translate('DATE', this.language);
    this.plateform = this.translationService.translate('PLATFORM_WEB_OR_MOBILE', this.language);
    this.technologies = this.translationService.translate('TECHNOLOGIES', this.language);
    this.clientProject = this.translationService.translate('CLIENT_PROJECT', this.language);
    this.columnDefs = [
      { headerName: this.translationService.translate('PROJECT_CODE', this.language), field:"projectCode"},
      { headerName: this.translationService.translate('DATE', this.language), field:"date", rowGroup : true},
      { headerName : this.translationService.translate('DETAIL', this.language),
        children: [
        { headerName: this.translationService.translate('PLATFORM_WEB_OR_MOBILE', this.language), field:"plateform", rowGroup:true},
        { headerName: this.translationService.translate('TECHNOLOGIES', this.language), field:"technologies", filter : true, columnGroupShow: 'closed' },
        { headerName: this.translationService.translate('CLIENT_PROJECT', this.language), field:"clientProject", columnGroupShow: 'closed' }
        ]
      }
    ];  
    this.autoGroupColumnDef = {
      headerName: this.translationService.translate('NAME', this.language),
      field: 'name',
      sortable : true,  
      cellRenderer : 'agGroupCellRenderer',
      cellRendererParams : {
        checkbox : true
      }
    };
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate(['/']); });
    this.triggerFalseClick()
  };
  

};
