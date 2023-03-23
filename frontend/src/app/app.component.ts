import { Component, OnChanges, OnInit } from '@angular/core';
import { MakeRequestService } from './services/make-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  public backendState$ = this.reqService.backend.asObservable();

  constructor(public reqService: MakeRequestService) {}

  ngOnInit() {
    this.reqService.checkBackend();
  }
}
