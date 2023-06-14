import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges {
  constructor() {
    // console.log('constructor loaded');
  }

  ngOnInit(): void {
    // console.log('ngOnInit loaded');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnInit loaded');
    // console.log(changes);
  }
}
