import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { AgGridAngular } from "ag-grid-angular";
import 'ag-grid-community/dist/styles/ag-grid.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild("agGrid", {static:false}) agGrid: AgGridAngular;

  constructor(private http: HttpClient){}
  hide = false

  ngOnInit(){
    this.rowData = this.http.get("https://raw.githubusercontent.com/nathan-So/demo_fichier_json/master/table_AgGridAngular.JSON")
  }
  
  columnDefs = [
    // { headerName: "Date", field:"date", filter:true, sortable:true},
    { headerName: "ID", field:"id"},
    { headerName: "Date", field:"date", rowGroup : true},
    { headerName : "Détails",
      children: [ 
      { headerName: "Plateforme (web/mobile)", field:"plateforme", rowGroup:true},
      { headerName: "Technologies", field:"technologies", filter : true, columnGroupShow: 'closed' },
      { headerName: "Projet client (oui/non)", field:"projet_client", columnGroupShow: 'closed' }
      ]
    }
  ];

  autoGroupColumnDef = {
    headerName: 'Nom',
    field: 'nom',
    sortable : true,
    cellRenderer : 'agGroupCellRenderer',
    cellRendererParams : {
      checkbox : true
    }
  }

  defaultColDef = {
    width : 200,
    editable : true,
    resizable: true,
  }

  rowData : any

  getSelectedRows(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedDataStringPresentation = selectedNodes.map(node => "Id: " + node.data.id + " " + " Technologies: " + node.data.technologies).join(" /// ");
    alert(`Données selectionnées : ${selectedDataStringPresentation}`)
  }

  Resize(){
  this.agGrid.api.sizeColumnsToFit();
  }
  
  HideModel()
  {
    this.agGrid.columnApi.setColumnsVisible(['id', 'date'], false);
    this.agGrid.api.sizeColumnsToFit();
    this.hide = true
  }
  
  ShowModel()
  {
    this.agGrid.columnApi.setColumnsVisible(['id', 'date'], true);
    this.agGrid.api.sizeColumnsToFit();
    this.hide = false
  }
 
}