
import { Ingredient } from '../shared/ingredient.model';
import { Review } from '../shared/review.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public reviews? : Review[] = [] ;
  

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[] , reviews : Review[]  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.reviews = reviews ;
    
  }
}
