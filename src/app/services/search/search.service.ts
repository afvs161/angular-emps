import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  private showSearchInputSubject = new Subject<boolean>();
  showSearchInput$ = this.showSearchInputSubject.asObservable();

  setSearchValue(value: string): void {
    this.searchSubject.next(value);
  }

  setShowSearchInput(value: boolean): void {
    this.showSearchInputSubject.next(value);
  }
}
