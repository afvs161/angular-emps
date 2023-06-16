import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = true;
  currentRoute: string;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private searchService: SearchService
  ) {
    let user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        let user = localStorage.getItem('user');
        if (!user) {
          this.router.navigate(['login']);
        }
      }
    });
  }

  logOut(): void {
    this.modalService.showModal(
      2,
      'Logging out',
      'Do you really want to log out?',
      'LOG_OUT'
    );
  }

  onInput(value: string) {
    this.searchService.setSearchValue(value);
  }
}
