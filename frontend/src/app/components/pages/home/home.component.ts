import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  foods: Food[] = [];

  // Populates the food array with sample_foods from data.ts.
  // constructor method is called whenever we create new objects.
  constructor(private foodService: FoodService) {
    this.foods = foodService.getAll();
  }
}
