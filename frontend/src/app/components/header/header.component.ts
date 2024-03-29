import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Integration } from 'src/app/interfaces/details';
import { MakeRequestService } from 'src/app/services/make-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isActive = false;
  @Input() integration!: Integration;
  @Output() saveEmitter = new EventEmitter();

  constructor(private makeRequest: MakeRequestService) {}

  ngOnInit() {}

  public save() {
    this.saveEmitter.emit();
  }
}
