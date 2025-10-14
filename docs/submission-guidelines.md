# Submission Guidelines

## How to Submit Your Solution

### 1. Fork the Repository
- Fork this repository to your personal GitHub account
- Clone your fork to your local development environment
- Work on your solution in your forked repository

### 2. Choose Your Approach
You have several options for implementing the solution:

**Option A: Use a Starter Template**
- Copy one of the starter templates from `/templates/` to your project root
- Follow the setup instructions in the template's README
- Implement the `NutritionDisplay` component according to the requirements

**Option B: Start from Scratch**
- Create your own project structure using your preferred setup
- Use the sample data from `/data/recipes.json`
- Implement the component according to `/docs/component-requirements.md`

### 3. Implementation Requirements

Your submission must include:

#### Core Implementation
- ✅ Nutrition information display component
- ✅ Unit system toggle (metric/imperial)
- ✅ Serving size adjustment functionality
- ✅ Proper unit conversions and calculations
- ✅ Edge case handling

#### Documentation
- ✅ README.md in your project root with:
  - Setup and installation instructions
  - How to run the application
  - Brief explanation of your approach
  - Any assumptions or trade-offs made
  - Time spent on the exercise (optional)

#### Code Quality
- ✅ Clean, well-organized code structure
- ✅ Meaningful variable and function names
- ✅ Comments for complex logic
- ✅ Consistent code formatting

#### Optional (Time Permitting)
- ⭐ Basic tests for core functionality
- ⭐ Responsive design considerations
- ⭐ Accessibility features
- ⭐ **Deploy your solution** - Host it on Vercel, Netlify, GitHub Pages, or similar (include the live URL in your README)
- ⭐ Additional features that add value

### 4. Project Structure

Your final project should have a structure similar to:

```
your-project/
├── README.md                     # Your implementation docs
├── package.json                  # Dependencies and scripts
├── src/                          # Source code
│   ├── components/
│   │   └── NutritionDisplay.*    # Your main component
│   └── ...                       # Other source files
├── data/                         # Sample data (if copied)
│   └── recipes.json
└── ...                          # Build configs, etc.
```

### 5. Final Steps

#### Before Submitting
- [ ] Test your application thoroughly
- [ ] Ensure all features work as specified
- [ ] Verify setup instructions are correct
- [ ] Check that your code is clean and well-commented
- [ ] Review your README for clarity

#### Submission Process
1. **Commit your changes** to your forked repository
2. **Push to GitHub** - ensure all code is uploaded
3. **Test your repository** - clone it fresh and verify it works
4. **(Optional) Deploy your solution** - If you'd like to showcase your work, deploy it to a hosting platform like Netlify, Vercel, or GitHub Pages
5. **Send us the link** to your completed repository (and live URL if deployed)

### 6. What We'll Evaluate

We'll assess your submission based on:

1. **Functionality** - Does it meet the requirements?
2. **Code Quality** - Is it well-organized and maintainable?
3. **Documentation** - Can we understand and run your solution?
4. **User Experience** - Is it intuitive and well-designed?
5. **Problem Solving** - How did you handle challenges and edge cases?

### 7. Timeline

- **Time Expectation:** 2-4 hours
- **Submission Deadline:** [To be specified when sending the exercise]
- **Questions:** Feel free to reach out if you need clarification

### 8. Technical Specifications

#### Supported Frameworks
- **Preferred:** Svelte + Vite + Tailwind/SASS
- **Also Accepted:** React, Vue, or Vanilla JavaScript
- **Build Tools:** Vite preferred, but alternatives are fine

#### Browser Support
- Target modern browsers (Chrome, Firefox, Safari, Edge)
- No need for legacy browser support

#### Data Source
- Use the provided sample data in `/data/recipes.json`
- No need to implement API calls or data fetching

### 9. Common Questions

**Q: Can I use external libraries?**
A: Yes, but be thoughtful about dependencies. Prefer standard libraries for utilities (lodash, date-fns) over heavy frameworks.

**Q: How detailed should my documentation be?**
A: Focus on clarity. Include setup instructions, how to run the app, and a brief explanation of your approach. Don't over-document simple code.

**Q: What if I don't finish everything?**
A: Submit what you have! We'd rather see a well-implemented subset than a rushed full implementation. Document what you would do next.

**Q: Should I deploy my solution?**
A: **Deployment is optional but encouraged!** If you have time and would like to showcase your work in a live environment, feel free to deploy to platforms like Vercel, Netlify, GitHub Pages, or similar. Include the live URL in your README. However, this is not required for evaluation - a working local setup is perfectly fine.

**Q: Should I include the original exercise files?**
A: No need to include the `/docs/` or `/templates/` folders in your submission. Focus on your implementation.

### 10. Troubleshooting

If you encounter issues:

1. **Setup Problems:** Double-check Node.js version and package installation
2. **Data Loading:** Ensure the path to `recipes.json` is correct in your setup
3. **Build Issues:** Check that all dependencies are properly installed
4. **Questions:** Don't hesitate to reach out for clarification

---

## Ready to Submit?

1. ✅ Code is working and tested
2. ✅ README is complete and accurate
3. ✅ Repository is pushed to GitHub
4. ✅ You've tested the setup instructions
5. ⭐ (Optional) Solution is deployed with live URL included in README

**Send us the link to your repository (and live URL if you deployed it) and we'll review it promptly!**

Good luck, and we look forward to seeing your solution!