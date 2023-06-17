import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new Subject<string>();
  private showSearchInputSubject = new Subject<boolean>();

  search$ = this.searchSubject.asObservable();
  showSearchInput$ = this.showSearchInputSubject.asObservable();

  setSearchValue(value: string): void {
    this.searchSubject.next(value);
  }
}
