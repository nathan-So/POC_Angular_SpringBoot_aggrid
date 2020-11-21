import { Component, OnInit} from '@angular/core';
import 'ag-grid-community/dist/styles/ag-grid.css';

@Component({  
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  public TITLE : string = "POC: Liste de projets - Angular / Ag-grid";

  constructor() { };

  ngOnInit(): void {
  };

};
