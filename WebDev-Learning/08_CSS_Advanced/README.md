# 🎨 CSS Advanced - Modern Features & Architecture

## 🎯 Learning Objectives
- Master CSS custom properties (variables)
- Understand CSS architecture and methodologies
- Learn modern CSS features (container queries, :has(), etc.)
- Implement CSS-in-JS concepts
- Build design systems and component libraries
- Optimize CSS performance

## 🔧 CSS Custom Properties (Variables)

### Basic Usage
```css
:root {
    /* Global variables */
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size-base: 1rem;
    --spacing-unit: 8px;
    --border-radius: 4px;
}

.button {
    background-color: var(--primary-color);
    font-size: var(--font-size-base);
    padding: calc(var(--spacing-unit) * 2);
    border-radius: var(--border-radius);
}

/* Fallback values */
.element {
    color: var(--text-color, #333);
}
```

### Dynamic Variables with JavaScript
```css
.component {
    background: hsl(
        var(--hue, 200),
        var(--saturation, 50%),
        var(--lightness, 50%)
    );
}
```

```javascript
// Update CSS variables dynamically
document.documentElement.style.setProperty('--hue', '120');
```

### Theme Switching
```css
/* Light theme (default) */
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --border-color: #e0e0e0;
}

/* Dark theme */
[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --border-color: #404040;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}
```

## 🏗️ CSS Architecture & Methodologies

### BEM (Block Element Modifier)
```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--large { }
.card__header--highlighted { }
```

### ITCSS (Inverted Triangle CSS)
```css
/* 1. Settings - Variables and config */
:root {
    --primary-color: blue;
}

/* 2. Tools - Mixins and functions */
@function rem($pixels) {
    @return #{$pixels / 16}rem;
}

/* 3. Generic - Reset and normalize */
* {
    box-sizing: border-box;
}

/* 4. Elements - Base HTML elements */
h1 {
    font-size: 2rem;
}

/* 5. Objects - Layout-related styles */
.o-container {
    max-width: 1200px;
    margin: 0 auto;
}

/* 6. Components - UI components */
.c-button {
    padding: 1rem 2rem;
    border: none;
}

/* 7. Utilities - Helper classes */
.u-text-center {
    text-align: center;
}
```

### Component-Based Architecture
```css
/* Component isolation */
.component {
    /* Component styles */
    all: initial; /* Reset all properties */
    font-family: system-ui;
}

/* CSS Modules approach */
.component :local(.button) {
    background: blue;
}
```

## 🆕 Modern CSS Features

### Container Queries
```css
.sidebar {
    container-type: inline-size;
    container-name: sidebar;
}

@container sidebar (min-width: 300px) {
    .widget {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}

@container (min-width: 400px) {
    .card {
        flex-direction: row;
    }
}
```

### :has() Selector (Parent Selector)
```css
/* Select card that has an image */
.card:has(img) {
    padding-top: 0;
}

/* Select form that has invalid input */
.form:has(input:invalid) {
    border: 2px solid red;
}

/* Select article that doesn't have an image */
.article:not(:has(img)) {
    padding: 2rem;
}
```

### CSS Nesting
```css
.card {
    padding: 1rem;
    border: 1px solid #ccc;
    
    & .title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    & .content {
        line-height: 1.6;
        
        & p {
            margin-bottom: 1rem;
        }
    }
    
    &:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    &.featured {
        border-color: gold;
    }
}
```

### Logical Properties
```css
.element {
    /* Instead of margin-left */
    margin-inline-start: 1rem;
    
    /* Instead of margin-top */
    margin-block-start: 1rem;
    
    /* Instead of width and height */
    inline-size: 100%;
    block-size: 200px;
    
    /* Instead of border-left */
    border-inline-start: 1px solid #ccc;
}
```

### CSS Scroll Snap
```css
.container {
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    display: flex;
}

.item {
    scroll-snap-align: start;
    flex: none;
    width: 100%;
}
```

## 🎭 Advanced Animations

### CSS @property
```css
@property --rotation {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

.element {
    transform: rotate(var(--rotation));
    transition: --rotation 0.3s ease;
}

.element:hover {
    --rotation: 180deg;
}
```

### Complex Keyframe Animations
```css
@keyframes complexMove {
    0% {
        transform: translateX(0) rotate(0deg);
        opacity: 1;
    }
    25% {
        transform: translateX(100px) rotate(90deg);
        opacity: 0.8;
    }
    50% {
        transform: translateX(100px) translateY(100px) rotate(180deg);
        opacity: 0.6;
    }
    75% {
        transform: translateX(0) translateY(100px) rotate(270deg);
        opacity: 0.8;
    }
    100% {
        transform: translateX(0) translateY(0) rotate(360deg);
        opacity: 1;
    }
}

.element {
    animation: complexMove 4s ease-in-out infinite;
}
```

### CSS Motion Path
```css
.element {
    offset-path: path("M 10 10 Q 50 50 90 10");
    offset-distance: 0%;
    animation: move-along-path 3s linear infinite;
}

@keyframes move-along-path {
    to {
        offset-distance: 100%;
    }
}
```

## 🎨 Design Systems

### Design Token System
```css
:root {
    /* Colors */
    --color-primary-50: #eff6ff;
    --color-primary-100: #dbeafe;
    --color-primary-500: #3b82f6;
    --color-primary-900: #1e3a8a;
    
    /* Typography */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    
    /* Spacing */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-4: 1rem;
    --space-8: 2rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Component Library Pattern
```css
/* Base button component */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-2) var(--space-4);
    border: 1px solid transparent;
    border-radius: 0.375rem;
    font-size: var(--font-size-sm);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.15s ease;
}

/* Button variants */
.btn--primary {
    background-color: var(--color-primary-500);
    color: white;
}

.btn--secondary {
    background-color: transparent;
    color: var(--color-primary-500);
    border-color: var(--color-primary-500);
}

/* Button sizes */
.btn--sm {
    padding: var(--space-1) var(--space-2);
    font-size: var(--font-size-xs);
}

.btn--lg {
    padding: var(--space-4) var(--space-8);
    font-size: var(--font-size-lg);
}
```

## 🚀 Performance Optimization

### Critical CSS
```css
/* Critical above-the-fold styles */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Non-critical styles loaded separately */
@media print {
    /* Print styles */
}
```

### CSS Containment
```css
.component {
    contain: layout style paint;
}

.sidebar {
    contain: size layout;
}
```

### Efficient Selectors
```css
/* Good - specific and efficient */
.navigation__item {
    color: blue;
}

/* Avoid - overly specific */
.header .navigation ul li a {
    color: blue;
}

/* Good - use classes instead of deep nesting */
.nav-link {
    color: blue;
}
```

## 🔧 CSS Preprocessors & Post-processors

### Sass/SCSS Features
```scss
// Variables
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;

// Mixins
@mixin button-style($bg-color, $text-color: white) {
    background-color: $bg-color;
    color: $text-color;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
}

// Functions
@function px-to-rem($px) {
    @return #{$px / 16}rem;
}

// Nesting
.navigation {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    li {
        display: inline-block;
    }
    
    a {
        text-decoration: none;
        
        &:hover {
            color: $primary-color;
        }
    }
}
```

### PostCSS Plugins
```css
/* Autoprefixer adds vendor prefixes */
.element {
    display: flex; /* Becomes display: -webkit-flex; display: flex; */
}

/* CSS Nano for minification */
/* PurgeCSS removes unused styles */
```

## 🎯 Advanced Layout Techniques

### Subgrid
```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.subgrid {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
}
```

### Intrinsic Web Design
```css
.layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

/* Flexible sizing */
.flexible {
    width: clamp(300px, 50vw, 600px);
    font-size: clamp(1rem, 2.5vw, 2rem);
}
```

## 💡 Best Practices

### CSS Organization
```
styles/
├── abstracts/
│   ├── _variables.scss
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _button.scss
│   └── _card.scss
├── layout/
│   ├── _header.scss
│   └── _grid.scss
├── pages/
│   └── _home.scss
└── main.scss
```

### Performance Tips
- Use CSS containment
- Minimize repaints and reflows
- Optimize animations for 60fps
- Use `transform` and `opacity` for animations
- Avoid complex selectors
- Implement critical CSS

## 🛠️ Tools & Resources

### Development Tools
- **Sass/SCSS** - CSS preprocessor
- **PostCSS** - CSS post-processor
- **Stylelint** - CSS linter
- **PurgeCSS** - Remove unused CSS
- **CSS Modules** - Scoped CSS

### Design Tools
- **Figma** - Design system creation
- **Storybook** - Component documentation
- **CSS Grid Generator** - Visual grid creation
- **Flexbox Generator** - Visual flexbox creation

## ➡️ Next Steps

After mastering advanced CSS:
- **09_JavaScript_Advanced** - ES6+, modules, and APIs
- **10_Final_Projects** - Build complete applications
- Explore CSS frameworks (Tailwind, Styled Components)
- Learn CSS-in-JS libraries

## 🏆 What You've Learned

- ✅ CSS custom properties and theming
- ✅ CSS architecture methodologies
- ✅ Modern CSS features and APIs
- ✅ Advanced animations and effects
- ✅ Design system implementation
- ✅ Performance optimization techniques
- ✅ CSS tooling and workflows

You're now ready to build scalable, maintainable, and performant CSS architectures! 🎨✨
