import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Budget } from 'src/app/interfaces/details';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent {
  public nameInputState = false;

  @Input()
  public budget!: Budget;

  @Output()
  public delete = new EventEmitter();

  @Output()
  public main = new EventEmitter();

  @Output()
  public duplicate = new EventEmitter();

  public totalCost = 0;

  public percent = 0;

  constructor() {}

  public deleteBudget() {
    this.delete.emit();
  }

  public setMain() {
    this.main.emit();
  }

  public duplicateBudget() {
    this.duplicate.emit();
  }

  public changeInputState() {
    this.nameInputState = !this.nameInputState;
  }

  public changeName(event: any) {
    this.budget.name = event.target.value;
  }
}
