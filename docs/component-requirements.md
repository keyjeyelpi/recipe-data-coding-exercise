# Nutrition Information Display Component - Detailed Requirements

## Overview

Build a reusable component that displays nutrition information for recipes with interactive features for unit conversion and serving size adjustment.

## Core Features

### 1. Nutrition Information Display

**Required Fields:**
- Energy (displayed in kJ)
- Fat (grams)
- Fibre (grams) 
- Protein (grams)
- Carbohydrate (grams)
- Sodium (milligrams)

**Display Requirements:**
- Show values with appropriate decimal places (max 2 decimal places)
- Include units for each value
- Handle zero values gracefully
- Consider responsive design for different screen sizes

### 2. Ingredients List Display

**Required Information:**
- Ingredient name (`food.name`)
- Scaled amount based on current serving size
- Appropriate units (metric or imperial based on toggle)
- Preparation notes if available

**Display Requirements:**
- Show ingredients in a clear, readable format
- Scale amounts proportionally with serving size changes
- Convert amounts according to selected unit system
- Handle ingredients with zero amounts or no measurements
- Consider groupings (e.g., "For the dressing:" headings)

**Scaling Calculations:**
```
scaledAmount = originalMetricMeasurement * (currentServings / originalYield)
```

### 3. Unit System Toggle

**Metric System:**
- Energy: Kilojoules (kJ) - no conversion needed
- Weights: Grams (g) / Kilograms (kg) when >= 1000g
- Volumes: Millilitres (ml) / litres (l) when >= 1000ml
- Sodium: Milligrams (mg)

**Imperial System:**
- Energy: Kilojoules (kJ) - keep as kJ (industry standard)
- Weights: Ounces (oz) / Pounds (lb) when >= 16oz
- Volumes: Fluid ounces (fl oz)
- Sodium: Milligrams (mg) - keep as mg (standard)

**Conversion Factors:**
```
1 gram = 0.035274 ounces
1 kilogram = 2.20462 pounds
1 millilitre = 0.033814 fluid ounces
```

**User Experience:**
- Provide clear toggle mechanism (button, switch, dropdown)
- Immediate conversion on toggle
- Persist user preference during session
- Visual indication of current unit system

### 4. Serving Size Adjustment

**Functionality:**
- Allow users to increase/decrease serving count
- Scale all nutrition values proportionally
- Scale all ingredient amounts proportionally
- Support decimal serving sizes (e.g., 0.5, 1.5, 2.0)
- Set reasonable bounds (e.g., 0.1 to 10 servings)

**User Interface Options:**
- Plus/minus buttons
- Number input field
- Slider control
- Combination of above

**Calculations:**
```
adjustedNutritionValue = originalValue * (newServings / originalYield)
adjustedIngredientAmount = originalMetricMeasurement * (newServings / originalYield)
```

**User Experience:**
- Show current serving count clearly
- Provide intuitive controls for adjustment
- Handle edge cases (very small/large servings)
- Update values in real-time
- Update both nutrition and ingredient amounts simultaneously

## Technical Specifications

### Component Props/Input
```typescript
interface NutritionDisplayProps {
  recipe: Recipe;
  initialServings?: number;
  initialUnitSystem?: 'metric' | 'imperial';
  onServingChange?: (servings: number) => void;
  onUnitChange?: (system: 'metric' | 'imperial') => void;
}

interface Recipe {
  sys: { id: string };
  name: string;
  nutritionalSummary: {
    energy: number;    // kJ
    fat: number;       // g
    fibre: number;     // g  
    protein: number;   // g
    carbohydrate: number; // g
    sodium: number;    // mg
  };
  yield: number; // original serving count
  ingredientsCollection: {
    total: number;
    items: Ingredient[];
  };
}

interface Ingredient {
  sys: { id: string };
  measurement?: string;        // Human-readable measurement
  metricMeasurement: number;   // Grams or millilitres
  notes?: string;             // Preparation notes
  includedInNutrition: boolean;
  food?: {
    sys: { id: string };
    name: string;
  };
  heading?: string;           // For section headings like "For the dressing:"
}
```

### State Management Requirements
- Track current serving size
- Track current unit system preference
- Calculate adjusted nutrition values
- Calculate adjusted ingredient amounts
- Handle unit conversions for both nutrition and ingredients
- Handle loading/error states if applicable

### Accessibility Requirements
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader announcements for value changes
- Sufficient color contrast
- Focus management

## Edge Cases to Handle

### Data Edge Cases
- Zero nutrition values
- Very small values (< 0.01)
- Very large values (> 1000)
- Missing or null nutrition data
- Invalid serving sizes
- Zero ingredient amounts (e.g., "to taste" items)
- Missing ingredient names or measurements
- Ingredients with only headings (no actual food items)
- Mixed measurement types in ingredients list

### User Interaction Edge Cases
- Rapid clicking on increment/decrement
- Invalid input in serving size field
- System preference persistence
- Component unmounting during calculation
- Switching units while adjusting serving sizes

### Display Edge Cases
- Very long recipe names
- Very long ingredient names
- Narrow screen widths
- High serving counts (display formatting)
- Decimal precision with different unit systems
- Large ingredient lists that exceed screen height
- Very small scaled ingredient amounts (< 0.01)

## User Experience Guidelines

### Visual Design
- Clear hierarchy of information
- Consistent spacing and typography
- Visual grouping of related data
- Loading states for any async operations
- Error states with helpful messages

### Interaction Design
- Immediate feedback on user actions
- Smooth transitions between states
- Clear affordances for interactive elements
- Progressive enhancement approach

### Performance Considerations
- Debounce rapid input changes
- Optimize re-calculations
- Avoid unnecessary re-renders
- Efficient unit conversion algorithms

## Testing Considerations

### Unit Tests
- Unit conversion accuracy
- Serving size calculation accuracy (nutrition and ingredients)
- Ingredient amount scaling calculations
- Edge case handling
- State management logic

### Integration Tests
- Component rendering with different data
- User interaction flows
- Nutrition and ingredient scaling coordination
- Unit system changes affecting both nutrition and ingredients
- Accessibility compliance
- Responsive behavior

### User Testing Scenarios
1. Switch between metric and imperial units (verify both nutrition and ingredients convert)
2. Adjust serving size from 1 to 4 servings (verify both nutrition and ingredients scale)
3. Test with very small serving size (0.25) to check decimal handling
4. Test with recipe that has zero values in nutrition or ingredients
5. Test with recipe that has "to taste" ingredients (zero amounts)
6. Test ingredient list scrolling with long ingredient lists
7. Test keyboard navigation through all interactive elements
8. Test on mobile device for responsive behavior

## Example Implementation Structure

```
NutritionDisplay/
├── NutritionDisplay.svelte (or .tsx/.vue)
├── NutritionDisplay.test.js
├── utils/
│   ├── unitConversion.js
│   ├── nutritionCalculations.js
│   ├── ingredientCalculations.js
│   └── formatters.js
├── components/
│   ├── ServingAdjuster.svelte
│   ├── UnitToggle.svelte
│   ├── NutritionPanel.svelte
│   └── IngredientsList.svelte
└── README.md
```

## Success Criteria

A successful implementation should:
- Display all nutrition information clearly
- Display complete ingredients list with appropriate formatting
- Convert units accurately between metric and imperial for both nutrition and ingredients
- Scale nutrition and ingredient values correctly with serving adjustments
- Coordinate changes between nutrition and ingredients (both update together)
- Provide intuitive user interactions
- Handle edge cases gracefully (zero amounts, missing data, etc.)
- Be accessible to all users
- Include basic documentation and tests
- Demonstrate clean code organization