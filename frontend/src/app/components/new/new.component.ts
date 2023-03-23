import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { ArrayValidator } from './array.validator';
import { MakeRequestService } from 'src/app/services/make-request.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  public integrationForm = this.fb.group({
    name: ['', Validators.required],
    imgUrl: [''],
    budgets: this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      peopleCount: ['', Validators.required],
      mainBudget: true,
    }),
    categories: this.fb.array([], ArrayValidator.minLength(1)),
  });

  public displayedColumns: String[] = [
    'kategoria',
    'koszt',
    'procent',
    'delete',
  ];

  public dataSource!: MatTableDataSource<AbstractControl>;

  private _cost = new BehaviorSubject(
    this.integrationForm.controls.budgets.controls['cost'].value
  );

  public cost$ = this._cost.asObservable();

  public categoryFormState = false;

  constructor(
    private fb: FormBuilder,
    private requestService: MakeRequestService
  ) {}

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.categories.controls);
  }

  public get categories() {
    return this.integrationForm.controls['categories'] as FormArray;
  }

  public get cost() {
    return this.integrationForm.controls['budgets'].controls['cost'].value;
  }

  public addCategory(group: any) {
    this.categories.push(group);
    this.table.renderRows();
  }

  public deleteCategory(index: number) {
    this.categories.removeAt(index);
    this.table.renderRows();
  }

  public onSubmit() {
    const integrationInfo = this.integrationForm.value.budgets;
    const budgetArr = [
      { ...integrationInfo, categories: this.integrationForm.value.categories },
    ];
    const finalForm = {
      name: this.integrationForm.value.name,
      imgUrl: this.integrationForm.value.imgUrl,
      budgets: budgetArr,
    };

    this.requestService.createIntegration(finalForm);
  }

  public costChange(event: any) {
    this._cost.next(event.target.value);
    this.cost$
      .subscribe((val) => {
        this.categories.controls.forEach((category) => {
          if (val) {
            const cost: number = parseInt(val);
            if (!isNaN(cost) && cost > 0) {
              (category as FormGroup).controls['procent'].setValue(
                (
                  (parseInt((category as FormGroup).controls['cost'].value) *
                    100) /
                  cost
                )
                  .toFixed(0)
                  .toString() + '%'
              );
            } else {
              (category as FormGroup).controls['procent'].setValue('0%');
            }
          } else {
            (category as FormGroup).controls['procent'].setValue('0%');
          }
        });
      })
      .unsubscribe();
  }

  public setCategoryFormState() {
    this.categoryFormState = !this.categoryFormState;
  }
}
