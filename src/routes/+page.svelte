<script lang="ts">
  import * as recipesData from "../lib/data/recipes.json";
  import NutritionDisplay from "../lib/components/NutritionDisplay.svelte";

  const recipes = recipesData.data.recipes;
  let selectedRecipe = recipes[0];
</script>

<svelte:head>
  <title>Nutrition Display Exercise</title>
  <meta
    name="description"
    content="Front-end coding exercise - Nutrition Information Display Component"
  />
</svelte:head>

<main class="container mx-auto px-4 py-8 max-w-4xl">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">
      Nutrition Information Display
    </h1>
    <p class="text-gray-600">
      Select a recipe to view its nutrition information. Implement the
      NutritionDisplay component to show nutrition data with unit conversion and
      serving size adjustment features.
    </p>
  </header>

  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Select Recipe</h2>
    <div class="flex flex-wrap gap-2">
      {#each recipes as recipe}
        <button
          class="px-4 py-2 rounded-lg border transition-colors {selectedRecipe
            .sys.id === recipe.sys.id
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}"
          on:click={() => (selectedRecipe = recipe)}
        >
          {recipe.name}
        </button>
      {/each}
    </div>
  </section>

  <section>
    <NutritionDisplay recipe={selectedRecipe} />
  </section>
</main>
