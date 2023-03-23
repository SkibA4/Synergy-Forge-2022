import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Integrations } from 'src/app/interfaces/integrations';
import { MakeRequestService } from 'src/app/services/make-request.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  constructor(private requestService: MakeRequestService) {}

  @Input() integration!: Integrations;
  @Input() ind!: number;
  @Output() delete: EventEmitter<number> = new EventEmitter();

  public deleteIntegration(index: number) {
    this.delete.emit(index);
  }
}
