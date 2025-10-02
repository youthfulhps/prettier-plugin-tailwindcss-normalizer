module.exports = {
  plugins: ["@youthfulhps/prettier-plugin-tailwindcss-normalizer"],
  // Custom spacing unit (default: 4)
  // If your Tailwind config uses a different spacing scale, set this accordingly
  // For example, if you've customized Tailwind's spacing so that:
  // - spacing[1] = 8px instead of 4px
  // - spacing[2] = 16px instead of 8px
  // Then set customSpacingUnit to 8
  customSpacingUnit: 8,
};
