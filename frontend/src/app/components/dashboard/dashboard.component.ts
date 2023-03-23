import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Integrations } from 'src/app/interfaces/integrations';
import { MakeRequestService } from 'src/app/services/make-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public integrations$ = new BehaviorSubject<boolean>(false);
  private integrationsData!: Integrations[];

  constructor(private request: MakeRequestService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.request.getIntegrations().subscribe((data) => {
        this.integrationsData = [...data];
        this.integrations$.next(true);
      });
    }, 1000);
  }

  public getBackendState() {
    return this.request.backend;
  }

  public getIntegrationsData() {
    return this.integrationsData;
  }

  public deleteIntegration(index: number) {
    this.integrations$.next(false);
    this.request.deleteIntegration(index).subscribe((response) => {
      this.integrationsData = [...response];
      this.integrations$.next(true);
    });
  }

  public navigateToDetails(index: number) {
    this.router.navigate(['/details', index]);
  }
}
