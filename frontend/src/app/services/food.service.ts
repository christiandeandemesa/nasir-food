import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/urls';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tags';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  // Gets the sample_foods array object.
  // http cannot send data as raw type (e.g. Food[]), but only as an Observable (e.g. <Food[]>).
  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  // Gets specific food objects from the sample_foods array based on the searchTerm.
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  // Gets the sample_tags array object.
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  // Gets specific food objects from the sample_foods array based on the tag.
  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  // Gets one food by its id.
  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }
}
