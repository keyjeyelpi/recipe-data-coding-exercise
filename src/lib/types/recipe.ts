import type { SystemIdentifier } from "./base";
import type { NutritionalSummary } from "./nutrition";
import type { IngredientsCollection } from "./ingredient";

export interface Recipe {
  sys: SystemIdentifier;
  name: string;
  nutritionalSummary: NutritionalSummary;
  yield: number;
  ingredientsCollection: IngredientsCollection;
}
