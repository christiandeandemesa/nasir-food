export class Food {
  // The ! signifies this field is required.
  id!: string;
  name!: string;
  price!: number;
  // The ? signifies this field is optional.
  tags?: string[];
  favorite!: boolean;
  stars!: number;
  imageUrl!: string;
  origins!: string[];
  cookTime!: string;
}
