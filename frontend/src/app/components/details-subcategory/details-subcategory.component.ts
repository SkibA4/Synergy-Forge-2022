import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Category } from 'src/app/interfaces/details';
import { DetailsFormComponent } from '../details-form/details-form.component';

@Component({
  selector: 'app-details-subcategory',
  templateUrl: './details-subcategory.component.html',
  styleUrls: ['./details-subcategory.component.scss'],
})
export class DetailsSubcategoryComponent implements OnInit {
  @Input()
  public category!: Category;

  @Input()
  public categoryComponent!: DetailsFormComponent;

  @Input()
  public budgetCost!: number;

  @ViewChildren('input') input!: QueryList<ElementRef>;

  public subcategoryState = false;

  public totalPrice = 0;

  public percent = 0;

  public cost = 0;

  public name = '';

  constructor() {}

  ngOnInit(): void {
    this.setTotalPrice();
  }

  public setSubcategoryState() {
    this.subcategoryState = !this.subcategoryState;
  }

  private setTotalPrice() {
    this.totalPrice = this.category.subcategories.reduce(
      (acc, curr) => acc + curr.cost,
      0
    );
    this.percent = parseInt(
      ((this.totalPrice / this.category.cost) * 100).toFixed(0)
    );
  }

  public setValues(event: any, type: boolean) {
    if (type) this.name = event.target.value;
    else this.cost = parseInt(event.target.value);
  }

  public addSubcategory() {
    if (
      this.name != '' &&
      this.name != ' ' &&
      this.cost > 0 &&
      this.cost.toString()[0] != '0'
    ) {
      this.category.subcategories.push({
        name: this.name,
        cost: this.cost,
      });
      this.setTotalPrice();
      this.input.forEach((element) => (element.nativeElement.value = ''));
    }
  }

  public deleteSubcategory(index: number) {
    this.category.subcategories.splice(index, 1);
    this.setTotalPrice();
  }
}
