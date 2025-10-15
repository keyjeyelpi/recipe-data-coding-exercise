<!-- 
  NutritionDisplay Component
  
  TODO: Implement this component according to the requirements in /docs/component-requirements.md
  
  This is a placeholder component to get you started. You should:
  1. Accept a recipe prop
  2. Display all nutrition information (energy, fat, fibre, protein, carbohydrate, sodium)
  3. Implement unit system toggle (metric/imperial)
  4. Implement serving size adjustment
  5. Handle all edge cases mentioned in the requirements
  6. Add proper accessibility features
  7. Include tests
  
  Feel free to break this into smaller components as needed.
-->

<script>
  // Example prop interface - adjust as needed
  export let recipe;
  export let initialServings = recipe?.yield || 1;
  export let initialUnitSystem = 'metric';
  
  // TODO: Implement your component logic here
  
  // Placeholder data for development
  $: nutrition = recipe?.nutritionalSummary || {};
  $: currentServings = initialServings;
  $: unitSystem = initialUnitSystem;
  
  console.log('NutritionDisplay received recipe:', recipe?.name);
</script>

<div class="nutrition-display p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
  <h3 class="text-lg font-semibold mb-4">Nutrition Information</h3>
  
  <!-- TODO: Remove this placeholder and implement your component -->
  <div class="bg-blue-50 border border-blue-200 rounded p-4">
    <p class="text-blue-800 font-medium mb-2">🚧 Component Implementation Needed</p>
    <p class="text-blue-700 text-sm mb-4">
      Replace this placeholder with your nutrition display implementation.
    </p>
    
    <div class="text-xs text-blue-600">
      <p>Current recipe: {recipe?.name || 'None'}</p>
      <p>Servings: {currentServings}</p>
      <p>Unit system: {unitSystem}</p>
    </div>
  </div>
  
  <!-- TODO: Implement controls for scaling number of servings -->
  <!-- TODO: Implement controls for switching units -->
  <!-- TODO: Display a tabular or other suitable display of nutrition information -->
   <!-- TODO: Display a tabula, list or other suitable display of ingredients for the selected recipe -->
</div>

<style>
  /* Add your component styles here */
  .nutrition-display {
    /* Your styles */
  }
</style>