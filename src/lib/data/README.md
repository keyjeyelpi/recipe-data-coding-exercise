# Sample Recipe Data

This folder contains sample recipe data that candidates should use to build the nutrition information display component.

## Data Structure

The data follows the GraphQL response format from the Contentful CMS and includes:

### Recipe Object
- `sys.id` - Unique recipe identifier
- `name` - Recipe name
- `nutritionalSummary` - Nutrition information per serving
- `yield` - Number of servings this recipe makes
- `ingredientsCollection` - List of ingredients with measurements

### Nutritional Summary
All values are per serving and include:
- `energy` - Energy in kilojoules (kJ)
- `fat` - Fat content in grams
- `fibre` - Fiber content in grams  
- `protein` - Protein content in grams
- `carbohydrate` - Carbohydrate content in grams
- `sodium` - Sodium content in milligrams

### Ingredients
Each ingredient contains:
- `sys.id` - Unique ingredient identifier
- `measurement` - Human-readable measurement (e.g., "1 tbsp olive oil")
- `metricMeasurement` - Standardized metric amount (grams or millilitres)
- `notes` - Additional preparation notes
- `includedInNutrition` - Whether this ingredient contributes to nutrition calculations
- `food.name` - Name of the food item

## Unit Conversion Guidelines

The `metricMeasurement` field contains either:
- **Grams (g)** for solid ingredients
- **Millilitres (ml)** for liquid ingredients

### Conversion Rules
**Metric Display:**
- Small amounts: Display as grams (g) or millilitres (ml)
- Large amounts: Convert to kilograms (kg) or litres (l) when >= 1000

**Imperial Display:**
- Solids: Convert grams to ounces (oz) or pounds (lb)
- Liquids: Convert millilitres to fluid ounces (fl oz)

### Conversion Factors
- 1 gram = 0.035274 ounces
- 1000 grams = 1 kilogram = 2.20462 pounds
- 1 millilitre = 0.033814 fluid ounces
- 1000 millilitres = 1 litre

## Example Usage

```javascript
// Load the recipe data
import recipesData from './recipes.json';

// Access the first recipe
const recipe = recipesData.data.recipes[0];
console.log(recipe.name); // "Tuna Pasta Salad"

// Access nutrition per serving
const nutrition = recipe.nutritionalSummary;
console.log(`Energy: ${nutrition.energy} kJ`);

// Access ingredients
const ingredients = recipe.ingredientsCollection.items;
ingredients.forEach(ingredient => {
  if (ingredient.food) {
    console.log(`${ingredient.food.name}: ${ingredient.metricMeasurement}g/ml`);
  }
});
```

## Test Scenarios

The provided recipes offer different test scenarios:

1. **Tuna Pasta Salad** - Single serving, variety of ingredient types and measurements
2. **Chicken Stir Fry** - Multiple servings (2), different measurement scales
3. **Smoothie Bowl** - Single serving, liquid-heavy ingredients, smaller measurements

Use these different recipes to test:
- Unit conversion accuracy
- Serving size scaling
- Edge cases with very small measurements
- Mixed solid/liquid ingredient handling