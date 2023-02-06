import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  // Gets the sample_foods array object.
  getAll(): Food[] {
    return sample_foods;
  }

  // Gets specific food objects from the sample_foods array.
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
