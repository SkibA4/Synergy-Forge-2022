import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Budget, Integration } from 'src/app/interfaces/details';
import { DetailsFormComponent } from '../details-form/details-form.component';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public id!: number;
  private sub!: Subscription;
  public detailState$ = new BehaviorSubject<boolean>(false);
  public integrationData: Integration = {
    id: 0,
    imgUrl: '',
    name: '',
    budgets: [],
  };
  public activeIndex = 1;
  public totalCost = 0;
  public saveAlert = false;

  @ViewChildren(DetailsFormComponent) forms!: QueryList<DetailsFormComponent>;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private saveService: SaveService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params) => (this.id = +params['id'])
    );
    this.http
      .get<Integration>(`http://localhost:8080/integrations/${this.id}`)
      .subscribe((response) => {
        this.integrationData = response;
        this.detailState$.next(true);
        this.activeIndex = this.integrationData.budgets[1]?.mainBudget ? 0 : 1;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public save() {
    this.saveService.save(this.integrationData).subscribe((data) => {
      this.saveAlert = true;
      setTimeout(() => (this.saveAlert = false), 5000);
    });
  }

  public setActiveVersion(i: number) {
    if (!this.integrationData.budgets[i].mainBudget) {
      this.activeIndex = i;
    }
  }

  public getMainBudget() {
    for (let i = 0; i < this.integrationData.budgets.length; i++) {
      if (this.integrationData.budgets[i].mainBudget)
        return this.integrationData.budgets[i];
    }

    return this.integrationData.budgets[0];
  }

  public deleteBudget() {
    if (this.integrationData.budgets.length !== 1) {
      this.activeIndex = 1;
      for (let i = 0; i < this.integrationData.budgets.length; i++) {
        if (this.integrationData.budgets[i].mainBudget)
          this.integrationData.budgets.splice(i, 1);
      }
      this.integrationData.budgets[0].mainBudget = true;
    }
  }

  public setMain() {
    let mainIndex = 0;

    for (let i = 0; i < this.integrationData.budgets.length; i++) {
      if (this.integrationData.budgets[i].mainBudget) mainIndex = i;
    }

    this.integrationData.budgets.forEach(
      (budget) => (budget.mainBudget = false)
    );

    this.integrationData.budgets[this.activeIndex].mainBudget = true;

    this.activeIndex = mainIndex;
  }

  public duplicate() {
    let budget!: Budget;

    for (let i = 0; i < this.integrationData.budgets.length; i++) {
      if (this.integrationData.budgets[i].mainBudget) {
        budget = {
          ...this.integrationData.budgets[i],
          mainBudget: false,
          categories: this.integrationData.budgets[i].categories.map(
            (category) => {
              return {
                ...category,
                subcategories: category.subcategories.map((subcategory) => {
                  return { ...subcategory };
                }),
              };
            }
          ),
        };

        this.integrationData.budgets.push(budget);
        this.activeIndex = this.integrationData.budgets.length - 1;
      }
    }
  }
}
