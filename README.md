# prettier-plugin-tailwindcss-normalizer

[![npm version](https://badge.fury.io/js/%40youthfulhps%2Fprettier-plugin-tailwindcss-normalizer.svg)](https://badge.fury.io/js/%40youthfulhps%2Fprettier-plugin-tailwindcss-normalizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Prettier plugin that automatically normalizes Tailwind CSS arbitrary values into standard utility classes, helping maintain consistent and optimized CSS across your project.

**Requires Prettier v3.0.0 or higher** (Prettier v2 is not supported)

## Features

- Converts arbitrary values like `p-[4px]` to standard classes like `p-1`
- Works with HTML, React/JSX, Vue.js, and Angular
- Only transforms class attributes, leaving comments, text, and other attributes untouched
- Supports padding, margin, sizing, typography, borders, shadows, and more
- Supports all Tailwind CSS variants (responsive, state, dark mode, group, peer, etc.)

## Installation

```bash
npm install --save-dev prettier@^3.0.0
npm install --save-dev @youthfulhps/prettier-plugin-tailwindcss-normalizer
```

## Usage

### Basic Configuration

Add the plugin to your Prettier configuration:

**`.prettierrc`**

```json
{
  "plugins": ["@youthfulhps/prettier-plugin-tailwindcss-normalizer"]
}
```

**`prettier.config.js`**

```javascript
module.exports = {
  plugins: ["@youthfulhps/prettier-plugin-tailwindcss-normalizer"],
};
```

### Running Prettier

```bash
# Format all files
npx prettier --write .

# Format specific files
npx prettier --write src/**/*.{tsx,jsx,html,vue}
```

## Using with Other Prettier Tailwind Plugins

To use this plugin alongside other prettier tailwind plugins (like `prettier-plugin-tailwindcss`), install and configure `prettier-plugin-merge`:

```bash
npm install --save-dev prettier-plugin-merge
```

**`.prettierrc.js`**

```javascript
module.exports = {
  plugins: [
    "@youthfulhps/prettier-plugin-tailwindcss-normalizer",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-merge", // Must be last
  ],
};
```

## Examples

**Before:**

```jsx
<div className="p-[16px] m-[8px] bg-blue-500">
  <span className="px-[24px] py-[12px] rounded-[6px]">Button</span>
</div>
```

**After:**

```jsx
<div className="p-4 m-2 bg-blue-500">
  <span className="px-6 py-3 rounded-md">Button</span>
</div>
```

**With Variants:**

```jsx
// Before
<div className="md:p-[16px] hover:m-[8px] dark:bg-[#1f2937]">
  Content
</div>

// After
<div className="md:p-4 hover:m-2 dark:bg-[#1f2937]">
  Content
</div>
```

## Supported Mappings

### Spacing

- Padding: `p-[4px]` → `p-1`, `px-[16px]` → `px-4`
- Margin: `m-[8px]` → `m-2`, `my-[12px]` → `my-3`
- Gap: `gap-[8px]` → `gap-2`, `gap-x-[16px]` → `gap-x-4`

### Sizing

- Width: `w-[100px]` → `w-25`, `w-[200px]` → `w-50`
- Height: `h-[50px]` → `h-12.5`, `h-[100px]` → `h-25`

### Typography

- Font Size: `text-[14px]` → `text-sm`, `text-[18px]` → `text-lg`
- Letter Spacing: `tracking-[-0.05em]` → `tracking-tighter`

### Layout

- Border Radius: `rounded-[4px]` → `rounded`, `rounded-[6px]` → `rounded-md`
- Border Width: `border-[1px]` → `border`, `border-[2px]` → `border-2`

### Effects

- Box Shadow: `shadow-[0_1px_3px_rgba(0,0,0,0.1)]` → `shadow-sm`
- Opacity: `opacity-[0.5]` → `opacity-50`

### Transforms

- Rotate: `rotate-[-180deg]` → `-rotate-180`
- Translate: `translate-x-[-100%]` → `-translate-x-full`

## Configuration

### Custom Spacing Unit

By default, Tailwind uses **4px** as the base spacing unit (e.g., `p-1` = 4px, `p-2` = 8px). If you've customized your Tailwind spacing scale, configure the `customSpacingUnit` option:

**`.prettierrc.js`**

```javascript
module.exports = {
  plugins: ["@youthfulhps/prettier-plugin-tailwindcss-normalizer"],
  customSpacingUnit: 8, // Change to match your Tailwind spacing scale
};
```

**Example with `customSpacingUnit: 8`:**

```jsx
// Before
<div className="p-[8px] m-[16px] gap-[24px]">Content</div>

// After
<div className="p-1 m-2 gap-3">Content</div>
```

See the [examples/custom-spacing](./examples/custom-spacing) directory for a complete working example.

## Supported Variants

The plugin supports all Tailwind CSS variants:

- **Responsive**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **State**: `hover:`, `focus:`, `active:`, `disabled:`, etc.
- **Dark Mode**: `dark:`
- **Group/Peer**: `group-hover:`, `peer-checked:`, etc.
- **Pseudo-elements**: `before:`, `after:`, `placeholder:`, etc.
- **ARIA**: `aria-checked:`, `aria-disabled:`, etc.
- **Data Attributes**: `data-[status=active]:`
- **Arbitrary**: `[&:nth-child(3)]:`, `has-[input:focus]:`, etc.

## Safety Features

The plugin only transforms class-related attributes:

**Transformed:**

- `className` attributes in JSX/TSX
- `class` attributes in HTML
- `:class` and `v-bind:class` in Vue
- `[class]` in Angular
- String literals in template literals
- Function calls like `clsx()`, `classnames()`, `cn()`

**Untouched:**

- Comments and documentation
- Regular text content
- Other HTML attributes
- JavaScript strings and variables
- CSS in `<style>` tags

## File Support

| Format    | Extension         |
| --------- | ----------------- |
| HTML      | `.html`           |
| React JSX | `.jsx`            |
| React TSX | `.tsx`            |
| Vue       | `.vue`            |
| Angular   | `.component.html` |

## Testing

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/youthfulhps/prettier-plugin-tailwindcss-normalizer/issues) page
2. Create a new issue with detailed information
3. Provide examples of your code and expected behavior

### Common Issues

**Q: The plugin doesn't work with Prettier v2**  
A: This plugin requires Prettier v3.0.0 or higher. Please upgrade your Prettier version.

**Q: How do I check my Prettier version?**  
A: Run `npx prettier --version` to check your current Prettier version.
