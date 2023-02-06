import { Food } from './food';

export class CartItem {
  // public means this variable (viz. food) is accesible outside of this class.
  constructor(public food: Food) {}
  // Gives quantity a default number.
  quantity: number = 1;
  price: number = this.food.price;
}
