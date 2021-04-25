import {Component, OnInit} from '@angular/core';
import * as PouchDB from 'pouchdb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const a = new PouchDB('grid');
  }
}
