import { Component, Input } from '@angular/core';
import { MakeRequestService } from 'src/app/services/make-request.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent {
  constructor(private requestService: MakeRequestService) {}

  @Input() buttonType!: String;
}
