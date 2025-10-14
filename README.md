# Front-End Developer Coding Exercise

## Overview

Welcome to our take-home coding exercise! This exercise is designed to assess your skills in front-end development, particularly your ability to:

- Organize and structure code effectively
- Understand and implement requirements
- Document assumptions and decisions
- Manage application state
- Apply UI design and UX conventions
- Work with data transformations and calculations

**Time Expectation:** 2-4 hours

## The Task

Build a **Nutrition Information Display Component** that allows users to view and interact with nutritional data from recipes. The component should provide a smooth user experience for viewing nutrition information in different units and serving sizes.

Completing the core functionality should be a fairly straightforward task: This should allow you scope to fine-tune the user-experience and visuals. We're looking for both a clean technical implementation and a display that looks and feels great.

## Requirements

### Core Functionality

1. **Display Nutrition Information**
   - Show energy, fat, fibre, protein, carbohydrate, and sodium values
   - Display values with appropriate units and formatting

2. **Display Ingredients List**
   - Show all ingredients with their amounts
   - Display ingredient names and measurements
   - Scale ingredient amounts based on serving size adjustments
   - Convert ingredient amounts according to selected unit system

3. **Unit System Toggle**
   - Allow users to switch between metric and imperial units
   - Metric: kilojoules (kJ) ,grams (g), kilograms (kg), millilitres (ml), litres (l)
   - Imperial: nutritional calories/kilocalories (cal), ounces (oz), pounds (lb), fluid ounces (fl oz)
   - Convert ingredient amounts to "friendly" display units, eg: display 1.1kg instead of 1100g

4. **Serving Size Scaling**
   - Allow users to adjust serving count up and down in increments of 1 serving.
   - Scale all nutrition values proportionally
   - Scale all ingredient amounts proportionally
   - A simple multiplier approach is fine

### Technical Requirements

- **Preferred Stack:** SvelteKit + Vite + Tailwind/SASS
- **Alternatives Accepted:** React, Vue, or Vanilla JavaScript
- Use the provided sample data (see `/data` folder)
- Implement proper state management
- Include basic documentation
- Add simple tests where appropriate

### UX Considerations

- Choose appropriate UI patterns for unit switching and serving adjustment
- Consider the devices and input modes likely to be used 
- Ensure the interface is attractive, intuitive and accessible
- Handle edge cases gracefully (e.g., very small/large serving sizes)
- Consider loading states and user feedback

## Sample Data

Sample recipe data with nutrition information is provided in the `/data` folder. This includes:

- Recipe metadata
- Ingredient lists with `metricMeasurement` values (grams or ml)
- Nutrition information per serving
- Multiple recipe examples to test with

## Getting Started

1. **Fork this repository** to your GitHub account
2. **Choose your approach:**
   - You can use the Svelte starter template in `/templates`, or start from scratch with your preferred setup
3. **Review the component requirements** in `/docs/component-requirements.md`
4. **Implement the solution** according to the requirements
5. **Document your approach** and any assumptions made

## What We're Looking For

### Code Organization
- Clear project structure
- Logical component hierarchy
- Separation of concerns
- Source control etiquette

### Requirements Understanding
- All core functionality implemented
- Edge cases considered
- UX best practices applied

### Documentation
- Clear setup and run instructions
- Explanation of architectural decisions
- Documentation of any assumptions made

### State Management
- Appropriate state handling approach
- Clean data flow
- Predictable state updates

### UI/UX Design
- Intuitive user interface
- Responsive design considerations
- Accessibility best practices

## Submission Guidelines

**📋 For detailed submission instructions, see [`/docs/submission-guidelines.md`](./docs/submission-guidelines.md)**

### Quick Summary:
1. **Fork this repository** to your GitHub account
2. **Choose your approach:** Use a starter template or build from scratch
3. **Implement the requirements** according to the specifications
4. **Document your solution** with a clear README
5. **Push to your fork** and send us the repository link

## Questions?

If you have any questions about the requirements or need clarification, please don't hesitate to reach out. We're happy to provide guidance to ensure you can showcase your best work.

Good luck, and we look forward to seeing your solution!

---

## Repository Structure

```
├── README.md                 # This file
├── data/                     # Sample recipe data
│   ├── recipes.json          # Recipe collection
│   └── README.md             # Data format documentation
├── docs/                     # Detailed documentation
│   ├── component-requirements.md
│   └── assessment-criteria.md
└── templates/                # Optional starter templates
    ├── sveltekit/
    ├── react/
    └── vue/
```