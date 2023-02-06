import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  foods: Food[] = [];

  // Populates the food array with either all or some of the objects in the sample_foods array from data.ts.
  // constructor method is called whenever we create new objects.
  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    // subscribe calls the function inside it any time params changes.
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        this.foods = this.foodService.getAllFoodsBySearchTerm(
          params.searchTerm
        );
      else this.foods = foodService.getAll();
    });
  }
}
