# prettier-plugin-tailwindcss-normalizer

[![npm version](https://badge.fury.io/js/%40youthfulhps%2Fprettier-plugin-tailwindcss-normalizer.svg)](https://badge.fury.io/js/%40youthfulhps%2Fprettier-plugin-tailwindcss-normalizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Prettier plugin that automatically normalizes Tailwind CSS arbitrary values into standard utility classes, helping maintain consistent and optimized CSS across your project.

> **⚠️ Important**: This plugin requires **Prettier v3.0.0 or higher**. It does not support Prettier v2.

## ✨ Features

- **Automatic Normalization**: Converts arbitrary values like `p-[4px]` to standard classes like `p-1`
- **Multi-Framework Support**: Works with HTML, React/JSX, Vue.js, and Angular
- **Safe Transformation**: Only transforms class attributes, leaving comments, text, and other attributes untouched
- **Comprehensive Mapping**: Supports padding, margin, sizing, typography, borders, shadows, and more
- **Prettier v3+ Only**: Built specifically for Prettier v3.0.0 and above (v2 not supported)

## 🚀 Installation

**Prerequisites**: Make sure you have Prettier v3.0.0 or higher installed.

```bash
# Install Prettier v3+ (if not already installed)
npm install --save-dev prettier@^3.0.0

# Install the plugin
npm install --save-dev @youthfulhps/prettier-plugin-tailwindcss-normalizer
```

## 📖 Usage

### 1. Configure Prettier

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

### 2. Run Prettier

```bash
# Format all files
npx prettier --write .

# Format specific files
npx prettier --write src/**/*.{tsx,jsx,html,vue}
```

## 🔗 Using with Other Prettier Tailwind Plugins

To use this plugin alongside other prettier tailwind plugins, you need to install and configure `prettier-plugin-merge`.

### Installation

```bash
npm install --save-dev prettier-plugin-merge
```

### Configuration

In your `.prettierrc.js` file, add `prettier-plugin-merge` as the last item in the plugins array:

```javascript
module.exports = {
  plugins: [
    "@youthfulhps/prettier-plugin-tailwindcss-normalizer",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-merge",
  ],
};
```

> **Note**: `prettier-plugin-merge` is a plugin that enables multiple prettier plugins to work together. When using with other tailwind-related plugins, it should always be placed last in the plugins array.

## 🎯 Examples

### Before

```jsx
<div className="p-[16px] m-[8px] bg-blue-500">
  <span className="px-[24px] py-[12px] rounded-[6px]">Button</span>
</div>
```

### After

```jsx
<div className="p-4 m-2 bg-blue-500">
  <span className="px-6 py-3 rounded-md">Button</span>
</div>
```

## 🛡️ Safety Features

The plugin is designed to be safe and only transforms class-related attributes:

### ✅ What Gets Transformed

- `className` attributes in JSX/TSX
- `class` attributes in HTML
- `:class` and `v-bind:class` in Vue
- `[class]` in Angular
- String literals in template literals
- Function calls like `clsx()`, `classnames()`, `cn()`

### ❌ What Stays Untouched

- Comments and documentation
- Regular text content
- Other HTML attributes (`title`, `data-*`, etc.)
- JavaScript strings and variables
- CSS in `<style>` tags

## 📋 Supported Mappings

### Spacing

- **Padding**: `p-[4px]` → `p-1`, `px-[16px]` → `px-4`
- **Margin**: `m-[8px]` → `m-2`, `my-[12px]` → `my-3`
- **Gap**: `gap-[8px]` → `gap-2`, `gap-x-[16px]` → `gap-x-4`

### Sizing

- **Width**: `w-[100px]` → `w-25`, `w-[200px]` → `w-50`
- **Height**: `h-[50px]` → `h-12.5`, `h-[100px]` → `h-25`

### Typography

- **Font Size**: `text-[14px]` → `text-sm`, `text-[18px]` → `text-lg`

### Layout

- **Border Radius**: `rounded-[4px]` → `rounded`, `rounded-[6px]` → `rounded-md`
- **Border Width**: `border-[1px]` → `border`, `border-[2px]` → `border-2`

### Effects

- **Box Shadow**: `shadow-[0_1px_3px_rgba(0,0,0,0.1)]` → `shadow-sm`
- **Opacity**: `opacity-[0.5]` → `opacity-50`

## 🔧 Configuration

### Basic Configuration

The plugin works out of the box with default settings. No additional configuration is required.

### Custom Spacing Unit

If you've customized your Tailwind CSS spacing scale, you can configure the plugin to match your custom spacing unit.

By default, Tailwind uses **4px** as the base spacing unit (e.g., `p-1` = 4px, `p-2` = 8px). If you've changed this in your Tailwind configuration, you should update the `customSpacingUnit` option.

**`.prettierrc.js`**

```javascript
module.exports = {
  plugins: ["@youthfulhps/prettier-plugin-tailwindcss-normalizer"],
  customSpacingUnit: 8, // Change to match your Tailwind spacing scale
};
```

**`tailwind.config.js` (Example with 8px base unit)**

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        1: "8px", // 8px * 1
        2: "16px", // 8px * 2
        3: "24px", // 8px * 3
        4: "32px", // 8px * 4
        // ... etc
      },
    },
  },
};
```

**Tailwind CSS v4 (`global.css` or similar)**

```css
@theme {
  --spacing: 1px;
  /* ... etc */
}
```

**Example with `customSpacingUnit: 8`**

```jsx
// Before
<div className="p-[8px] m-[16px] gap-[24px]">Content</div>

// After (with customSpacingUnit: 8)
<div className="p-1 m-2 gap-3">Content</div>
```

**Example with default `customSpacingUnit: 4`**

```jsx
// Before
<div className="p-[4px] m-[8px] gap-[12px]">Content</div>

// After (with customSpacingUnit: 4)
<div className="p-1 m-2 gap-3">Content</div>
```

See the [examples/custom-spacing](./examples/custom-spacing) directory for a complete working example.

> **Note**: This plugin is optimized for Prettier v3+ and takes advantage of the new plugin architecture. If you're using Prettier v2, please upgrade to v3 or use an alternative solution.

## 🧪 Testing

The plugin includes comprehensive tests covering:

- Various file formats (HTML, JSX, TSX, Vue)
- Edge cases and complex scenarios
- Safety features and non-transformation cases
- Different Tailwind CSS patterns

Run tests:

```bash
npm test
```

## 📁 File Support

| Format    | Extension         | Support |
| --------- | ----------------- | ------- |
| HTML      | `.html`           | ✅      |
| React JSX | `.jsx`            | ✅      |
| React TSX | `.tsx`            | ✅      |
| Vue       | `.vue`            | ✅      |
| Angular   | `.component.html` | ✅      |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Prettier ecosystem
- Inspired by Tailwind CSS best practices
- Thanks to all contributors and users

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/youthfulhps/prettier-plugin-tailwindcss-normalizer/issues) page
2. Create a new issue with detailed information
3. Provide examples of your code and expected behavior

### Common Issues

**Q: The plugin doesn't work with Prettier v2**
A: This plugin requires Prettier v3.0.0 or higher. Please upgrade your Prettier version.

**Q: How do I check my Prettier version?**
A: Run `npx prettier --version` to check your current Prettier version.

**Q: Can I use this with Prettier v2?**
A: No, this plugin is built specifically for Prettier v3+ and will not work with v2.

---

**Made with ❤️ for the developer community**
