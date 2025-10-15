<script lang="ts">
  import {
    isLiquidIngredient,
    scaleNutrition,
    scaleIngredients,
  } from "$lib/utils";

  import { VALIDATION_CONSTANTS } from "$lib/utils";

  export let recipe: Recipe;

  let servingSize: number = 1;
  let useImperialUnits: boolean = false;

  $: scaledNutrition = scaleNutrition(
    recipe.nutritionalSummary,
    servingSize,
    useImperialUnits
  );

  $: scaledIngredients = scaleIngredients(
    recipe.ingredientsCollection.items,
    servingSize,
    recipe.yield,
    useImperialUnits
  );
</script>

<div class="bg-white rounded-lg border p-4 grid flex-col gap-4">
  <div class="xs:flex-col md:flex gap-4 justify-between items-center">
    <h3 class="text-lg font-semibold">Nutrition Information</h3>
    <div class="xs:flex-col md:flex grid mt-2 gap-4 items-center">
      <div class="xs:flex-col md:flex grid items-center gap-2">
        <label for="servingSize" class="text-sm font-medium">Servings:</label>
        <input
          type="number"
          min={VALIDATION_CONSTANTS.MIN_SERVING_SIZE}
          step={VALIDATION_CONSTANTS.MIN_SERVING_SIZE}
          max={VALIDATION_CONSTANTS.MAX_SERVING_SIZE}
          bind:value={servingSize}
          class="w-20 px-2 py-1 border rounded text-sm w-full"
        />
      </div>

      <button
        on:click={() => (useImperialUnits = !useImperialUnits)}
        class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
      >
        Convert to {useImperialUnits ? "Metric" : "Imperial"}
      </button>
    </div>
  </div>

  <div class="grid gap-6">
    <div class="bg-gray-50 rounded-lg p-4">
      <h4 class="font-medium mb-3">Nutrition (per serving)</h4>
      <div class="grid grid-cols-2 md:gap-x-4 gap-2 text-sm">
        {#each Object.entries(scaledNutrition) as [key, value]}
          <div class="flex justify-between">
            <span class="capitalize">{key}:</span>
            <span class="font-medium">
              {value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {#if useImperialUnits}
                {#if key === "energy"}
                  kCal
                {:else}
                  oz
                {/if}
              {:else if key === "energy"}
                kJ
              {:else if key === "sodium"}
                mg
              {:else}
                g
              {/if}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <div class="bg-gray-50 rounded-lg p-4">
      <h4 class="font-medium mb-3">
        Ingredients ({recipe.ingredientsCollection.total} items)
      </h4>
      <div
        class="grid md:grid-cols-4 align-items-stretch md:gap-4 gap-2 text-sm"
      >
        {#each scaledIngredients as ingredient}
          <div
            class={ingredient.heading
              ? `md:col-span-4`
              : `p-4 bg-white rounded-lg border`}
          >
            {#if ingredient.food}
              <div class="flex justify-between items-start">
                <span class="flex-1 capitalize">{ingredient.food.name}:</span>
                {#if ingredient.displayAmount}
                  <span class="font-medium ml-2"
                    >{ingredient.displayAmount}</span
                  >
                {/if}
              </div>
              {#if ingredient.notes}
                <div class="text-xs text-gray-500 italic text-justify-left">
                  ({ingredient.notes})
                </div>
              {/if}
            {:else if ingredient.heading}
              <div
                class="font-bold text-gray-700 pt-4 pb-2 text-xs uppercase tracking-wide"
              >
                {ingredient.heading}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
{#if recipe && servingSize}
  <div class="text-xs text-gray-500 mt-4">
    Recipe serves {recipe.yield} • Showing nutrition for {servingSize} serving{servingSize !==
    1
      ? "s"
      : ""}
  </div>
{/if}

<style>
</style>
