import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit, OnDestroy {
  public categoryForm = this.fb.group({
    name: ['', Validators.required],
    cost: ['', Validators.required],
    procent: ['', Validators.required],
  });

  private subscription!: Subscription;
  private _cost = new BehaviorSubject(this.categoryForm.controls['cost'].value);
  public categoryCost$ = this._cost.asObservable();
  private _procent = new BehaviorSubject(
    this.categoryForm.controls['procent'].value
  );
  public procent$ = this._procent.asObservable();

  constructor(private fb: FormBuilder) {}

  @Output('addCategory') addCategory: EventEmitter<any> = new EventEmitter();
  @Output('formState') formState: EventEmitter<any> = new EventEmitter();
  @Input() cost$!: Observable<string | null>;
  @Input() integrationCost!: string | null;

  ngOnInit() {
    this.subscription = this.cost$.subscribe((cost) => {
      const formCost = this.categoryForm.controls['cost'].value;

      if (formCost && parseInt(formCost) > 0 && cost && parseInt(cost) > 0) {
        const formCostNumber = parseInt(formCost);
        const integrationCost = parseInt(cost);
        this.categoryForm.controls['procent'].setValue(
          ((formCostNumber * 100) / integrationCost).toFixed(0).toString()
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSubmit() {
    const category = this.fb.group({
      name: [this.categoryForm.controls.name.value],
      cost: [this.categoryForm.controls.cost.value],
      procent: [this.categoryForm.controls.procent.value + '%'],
    });

    this.addCategory.emit(category);

    this.categoryForm.controls.name.setValue('');
    this.categoryForm.controls.cost.setValue('');
    this.categoryForm.controls.procent.setValue('');

    this.formState.emit();
    this.subscription.unsubscribe();
  }

  public onCostChange(event: any) {
    this._cost.next(event.target.value);
    this.categoryCost$
      .subscribe((cost) => {
        if (cost && !isNaN(parseInt(cost)) && parseInt(cost) > 0) {
          const costNumber = parseInt(cost);
          if (
            this.integrationCost &&
            !isNaN(parseInt(this.integrationCost)) &&
            parseInt(this.integrationCost) > 0
          ) {
            const integrationCostNumber = parseInt(this.integrationCost);
            this.categoryForm.controls['procent'].setValue(
              ((costNumber / integrationCostNumber) * 100).toFixed(0).toString()
            );
          }
        }
      })
      .unsubscribe();
  }

  public onProcentChange(event: any) {
    this._procent.next(event.target.value);
    this.procent$
      .subscribe((procent) => {
        if (procent && !isNaN(parseInt(procent)) && parseInt(procent) > 0) {
          const procentNumber = parseInt(procent);
          if (
            this.integrationCost &&
            !isNaN(parseInt(this.integrationCost)) &&
            parseInt(this.integrationCost) > 0
          ) {
            const integrationCostNumber = parseInt(this.integrationCost);
            this.categoryForm.controls['cost'].setValue(
              ((procentNumber / 100) * integrationCostNumber)
                .toFixed(0)
                .toString()
            );
          }
        }
      })
      .unsubscribe();
  }
}
