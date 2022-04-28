import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from './foodItem';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private url = `${environment.api}food`;

  constructor(private httpClient: HttpClient) {}

  getFood(): Observable<FoodItem[]> {
    return this.httpClient.get<FoodItem[]>(this.url);
  }

  addFood(food: FoodItem): Observable<FoodItem> {
    return this.httpClient.post<FoodItem>(this.url, food);
  }

  updateFood(food: FoodItem): Observable<FoodItem> {
    return this.httpClient
      .put<FoodItem>(`${this.url}/${food.id}`, food)
      .pipe(delay(2000)); //slow down request to see loading
  }

  deleteFood(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
