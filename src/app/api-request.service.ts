import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './app.component';

@Injectable()
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  getData(number: string): Observable<Car> {
    return this.http.get<Car>(`https://opendatabot.com/api/v3/public/transport?number=${number}`);
  }
}
