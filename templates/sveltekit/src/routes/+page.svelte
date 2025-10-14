<script>
  import recipesData from '../../../data/recipes.json';
  
  // TODO: Import your NutritionDisplay component here
  // import NutritionDisplay from '$lib/components/NutritionDisplay.svelte';
  
  const recipes = recipesData.data.recipes;
  let selectedRecipe = recipes[0];
</script>

<svelte:head>
  <title>Nutrition Display Exercise</title>
  <meta name="description" content="Front-end coding exercise - Nutrition Information Display Component" />
</svelte:head>

<main class="container mx-auto px-4 py-8 max-w-4xl">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">
      Nutrition Information Display
    </h1>
    <p class="text-gray-600">
      Select a recipe to view its nutrition information. Implement the NutritionDisplay component
      to show nutrition data with unit conversion and serving size adjustment features.
    </p>
  </header>

  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Select Recipe</h2>
    <div class="flex flex-wrap gap-2">
      {#each recipes as recipe}
        <button
          class="px-4 py-2 rounded-lg border transition-colors {selectedRecipe.sys.id === recipe.sys.id
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}"
          on:click={() => selectedRecipe = recipe}
        >
          {recipe.name}
        </button>
      {/each}
    </div>
  </section>

  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Recipe: {selectedRecipe.name}</h2>
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 class="font-medium mb-2">Recipe Details</h3>
      <p class="text-sm text-gray-600">Serves: {selectedRecipe.yield}</p>
      <p class="text-sm text-gray-600">Ingredients: {selectedRecipe.ingredientsCollection.total}</p>
    </div>
    
    <!-- TODO: Replace this placeholder with your NutritionDisplay component -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-yellow-800 mb-4">
        🚧 Implement NutritionDisplay Component Here
      </h3>
      
      <div class="text-sm text-yellow-700 mb-4">
        <p>Your component should display nutrition information AND ingredients list:</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-white rounded p-4 border">
          <h4 class="font-medium mb-2">Nutrition (per serving):</h4>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>Energy: {selectedRecipe.nutritionalSummary.energy} kJ</div>
            <div>Fat: {selectedRecipe.nutritionalSummary.fat}g</div>
            <div>Fibre: {selectedRecipe.nutritionalSummary.fibre}g</div>
            <div>Protein: {selectedRecipe.nutritionalSummary.protein}g</div>
            <div>Carbohydrate: {selectedRecipe.nutritionalSummary.carbohydrate}g</div>
            <div>Sodium: {selectedRecipe.nutritionalSummary.sodium}mg</div>
          </div>
        </div>
        
        <div class="bg-white rounded p-4 border">
          <h4 class="font-medium mb-2">Ingredients ({selectedRecipe.ingredientsCollection.total} items):</h4>
          <div class="space-y-1 text-sm">
            {#each selectedRecipe.ingredientsCollection.items as ingredient}
              {#if ingredient.food}
                <div>{ingredient.food.name}: {ingredient.metricMeasurement}g/ml</div>
              {:else if ingredient.heading}
                <div class="font-medium text-gray-600 mt-2">{ingredient.heading}</div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
      
      <div class="mt-4 text-sm text-yellow-700">
        <p>Replace this entire yellow section with:</p>
        <code class="bg-yellow-100 px-2 py-1 rounded text-xs">
          &lt;NutritionDisplay recipe={selectedRecipe} /&gt;
        </code>
      </div>
    </div>
    
    <!-- Uncomment when you've implemented your component:
    <NutritionDisplay recipe={selectedRecipe} />
    -->
  </section>

  <footer class="text-center text-sm text-gray-500 mt-12">
    <p>Front-end Developer Coding Exercise</p>
  </footer>
</main>