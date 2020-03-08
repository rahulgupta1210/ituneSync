import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";
import { SearchService } from './HelperService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sudoku';
  searchField: FormControl;
  private results: Observable<SearchItem[]>;
  loading: boolean;
  response: Observable<SearchItem[]>;

  constructor(private itunes: SearchService) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap(term => this.itunes.search(term)),
      tap(_ => (this.loading = false))
    );
    this.response = this.results;
  }
}
