import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class SearchService {

  
  //private results: Observable<SearchItem[]>;
  apiRoot: string = "https://itunes.apple.com/search";
  constructor(private http: HttpClient) {}
   

  search(term: string): Observable<SearchItem[]> {
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    return this.http.get(apiURL).pipe(
      map(res => {
        return res['results'].map(item => {
          return item;
          //  new SearchItem(
          //   item.trackName,
          //   item.artistName,
          //   item.trackViewUrl,
          //   item.artworkUrl30,
          //   item.artistId
          // );
        });
      })
    );
  }
}