import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-cap',
  templateUrl: './header-cap.component.html',
  styleUrls: ['./header-cap.component.scss']
})

export class HeaderCapComponent implements OnInit {

  title = "Liste des Projets de la Digital Factory";

  constructor() { };

  ngOnInit(): void { };

};
