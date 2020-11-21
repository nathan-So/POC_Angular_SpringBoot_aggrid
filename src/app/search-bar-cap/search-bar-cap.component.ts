import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar-cap',
  templateUrl: './search-bar-cap.component.html',
  styleUrls: ['./search-bar-cap.component.scss']
})

export class SearchBarCapComponent implements OnInit {
  constructor() { };
  ngOnInit(): void {};

  searchText : string;
  placeholder = "Recherche par colonne";

  @Output() searchChanged = new EventEmitter<String>();

  handleChange() {
    this.searchChanged.emit(this.searchText);
  };
};