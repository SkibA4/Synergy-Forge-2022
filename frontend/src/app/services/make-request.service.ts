import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckBackend } from '../interfaces/check-backend';
import { Integrations } from '../interfaces/integrations';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MakeRequestService {
  public backend = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  public checkBackend() {
    const req = this.http
      .get('http://localhost:8080/', { observe: 'response' })
      .subscribe((response) => {
        if (response.ok) this.backend.next(true);
      });
  }

  public getIntegrations() {
    return this.http.get<Integrations[]>('http://localhost:8080/integrations');
  }

  public createIntegration(integrationForm: any) {
    const req = this.http
      .post('http://localhost:8080/integrations', integrationForm, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .subscribe((response) => {
        const res = response as Array<any>;
        if (res.length > 0) {
          console.log(res[res.length - 1]);
          this.router.navigate([`/details/${res[res.length - 1].id}`]);
        }
      });
  }

  public deleteIntegration(index: number) {
    return this.http.delete<Integrations[]>(
      `http://localhost/integrations/${index}`);
  }
}
