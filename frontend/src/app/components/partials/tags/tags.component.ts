import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  // The ? protects tags if its value is null or undefined.
  tags?: Tag[];

  // Gets all the tags.
  constructor(foodService: FoodService) {
    this.tags = foodService.getAllTags();
  }
}
