import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tags';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  // Gets the sample_foods array object.
  getAll(): Food[] {
    return sample_foods;
  }

  // Gets specific food objects from the sample_foods array based on the searchTerm.
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Gets the sample_tags array object.
  getAllTags(): Tag[] {
    return sample_tags;
  }

  // Gets specific food objects from the sample_foods array based on the tag.
  getAllFoodsByTag(tag: string): Food[] {
    return tag === 'All'
      ? this.getAll()
      : // food.tags? checks if tag is included in it.
        this.getAll().filter((food) => food.tags?.includes(tag));
  }
}
