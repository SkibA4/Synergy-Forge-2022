import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Integration } from 'src/app/interfaces/details';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy{

  public id!: number;
  private sub!: Subscription;
  private detailsSub!: Subscription;
  public detailsData$ = new BehaviorSubject<Integration>({id: "", name: "", imgUrl: "", budgets: []});
  public detailState$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => this.id = +params['id']);
      this.detailsSub = this.http.get<Integration>(`http://localhost:8080/integrations/${this.id}`).subscribe(
        response => {
          setTimeout(() => {
            this.detailsData$.next(response);
            this.detailState$.next(true);
            console.log(this.detailsData$.value)
          }, 2000)
        }
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
