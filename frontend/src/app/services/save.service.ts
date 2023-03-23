import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Integration } from '../interfaces/details';

@Injectable({
  providedIn: 'root',
})
export class SaveService {
  constructor(private http: HttpClient) {}

  public save(integration: Integration) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post<Integration>(
      `http://localhost:8080/budget/${integration.id}`,
      JSON.stringify(integration.budgets),
      { headers: headers }
    );
  }
}
