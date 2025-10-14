# SvelteKit Starter Template

This template provides a basic SvelteKit setup with Tailwind CSS for the nutrition display component exercise.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── lib/
│   └── components/
│       └── NutritionDisplay.svelte  # TODO: Implement this component
├── routes/
│   └── +page.svelte                 # Main page with recipe selector
├── app.css                          # Global styles (Tailwind)
├── app.html                         # HTML template
└── app.svelte                       # Root component
```

## Your Task

Implement the `NutritionDisplay` component in `src/lib/components/NutritionDisplay.svelte` according to the requirements in `/docs/component-requirements.md`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests with Vitest
- `npm run check` - Type checking
- `npm run lint` - Lint code
- `npm run format` - Format code

## Tech Stack

- **SvelteKit** - Application framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Vitest** - Testing framework

## Tips

1. The sample recipe data is already imported in `+page.svelte`
2. Start with the basic component structure in `NutritionDisplay.svelte`
3. Break down the component into smaller parts as needed
4. Use Tailwind classes for styling
5. Add tests in `*.test.ts` files
6. Refer to the detailed requirements in `/docs/component-requirements.md`

## Sample Data Access

The recipe data structure is available as:
```javascript
{
  sys: { id: "..." },
  name: "Recipe Name",
  nutritionalSummary: {
    energy: 2165.97,      // kJ
    fat: 23.935,          // g
    fibre: 3.833,         // g
    protein: 33.789,      // g
    carbohydrate: 39.048, // g
    sodium: 369.75        // mg
  },
  yield: 1,               // servings
  ingredientsCollection: { ... }
}
```

Good luck with your implementation!