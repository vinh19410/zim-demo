import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    //let API_URL = "https://api.covid19api.com/summary";
    return this.http.get('https://api.covid19api.com/summary');
  }

  getDetailCountry(slug: string): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/name/' + slug);
  }

  getDetailCovid(slug: string): Observable<any> {
    return this.http.get('https://api.covid19api.com/country/' + slug);
  }
}
