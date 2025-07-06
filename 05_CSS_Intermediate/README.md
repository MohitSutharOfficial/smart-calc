# 🎨 CSS Intermediate

## 🎯 Learning Objectives
By the end of this lesson, you will understand:
- Flexbox layout for one-dimensional designs
- CSS Grid for two-dimensional layouts
- Responsive design principles and media queries
- CSS transitions and animations
- Advanced CSS selectors
- Modern CSS features like container queries

## 🔄 Flexbox Layout

Flexbox is perfect for one-dimensional layouts (either row or column).

### Basic Flexbox Setup:
```css
.container {
    display: flex;
}

.item {
    flex: 1; /* Equal width items */
}
```

### Flex Container Properties:

#### Flex Direction:
```css
flex-direction: row;        /* Default - horizontal */
flex-direction: column;     /* Vertical */
flex-direction: row-reverse;    /* Horizontal reversed */
flex-direction: column-reverse; /* Vertical reversed */
```

#### Justify Content (Main Axis):
```css
justify-content: flex-start;    /* Default - start */
justify-content: center;        /* Center items */
justify-content: space-between; /* Space between items */
justify-content: space-around;  /* Space around items */
justify-content: space-evenly;  /* Equal space */
```

#### Align Items (Cross Axis):
```css
align-items: stretch;       /* Default - stretch to fill */
align-items: center;        /* Center items */
align-items: flex-start;    /* Align to start */
align-items: flex-end;      /* Align to end */
align-items: baseline;      /* Align to text baseline */
```

#### Flex Wrap:
```css
flex-wrap: nowrap;          /* Default - single line */
flex-wrap: wrap;            /* Allow wrapping */
flex-wrap: wrap-reverse;    /* Wrap in reverse */
```

### Flex Item Properties:

```css
.item {
    flex-grow: 1;           /* How much to grow */
    flex-shrink: 1;         /* How much to shrink */
    flex-basis: auto;       /* Initial size */
    
    /* Shorthand */
    flex: 1 1 auto;         /* grow shrink basis */
    flex: 1;                /* Common: equal distribution */
    
    align-self: center;     /* Override container's align-items */
}
```

### Common Flexbox Patterns:

#### Centered Content:
```css
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

#### Navigation Bar:
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links {
    display: flex;
    gap: 1rem;
}
```

#### Card Layout:
```css
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    flex: 1 1 300px; /* Minimum 300px width */
}
```

## 📐 CSS Grid Layout

Grid is perfect for two-dimensional layouts (rows and columns).

### Basic Grid Setup:
```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
    grid-template-rows: auto auto;       /* 2 rows */
    gap: 1rem;                          /* Space between items */
}
```

### Grid Container Properties:

#### Grid Template Columns/Rows:
```css
/* Fixed sizes */
grid-template-columns: 200px 300px 100px;

/* Flexible sizes */
grid-template-columns: 1fr 2fr 1fr; /* 1:2:1 ratio */

/* Repeat notation */
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

/* Mixed sizes */
grid-template-columns: 200px 1fr auto;
```

#### Grid Template Areas:
```css
.container {
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

#### Grid Gap:
```css
gap: 1rem;                  /* Both row and column */
row-gap: 1rem;              /* Row spacing only */
column-gap: 2rem;           /* Column spacing only */
```

### Grid Item Properties:

#### Grid Lines:
```css
.item {
    grid-column-start: 1;
    grid-column-end: 3;
    
    /* Shorthand */
    grid-column: 1 / 3;     /* From line 1 to line 3 */
    grid-column: span 2;    /* Span 2 columns */
    
    grid-row: 2 / 4;        /* From row 2 to row 4 */
    grid-row: span 2;       /* Span 2 rows */
}
```

#### Grid Area:
```css
.item {
    grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
```

### Advanced Grid Features:

#### Auto-fit vs Auto-fill:
```css
/* Auto-fit: Stretches to fill container */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

/* Auto-fill: Maintains column size */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
```

#### Grid Functions:
```css
/* Minimum and maximum sizes */
grid-template-columns: minmax(200px, 1fr) 2fr;

/* Fit content */
grid-template-columns: fit-content(200px) 1fr;
```

## 📱 Responsive Design

### Mobile-First Approach:
```css
/* Base styles for mobile */
.container {
    padding: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        max-width: 1024px;
        margin: 0 auto;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
    }
}
```

### Common Breakpoints:
```css
/* Mobile first */
@media (min-width: 480px) { /* Large mobile */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large desktop */ }

/* Desktop first */
@media (max-width: 1024px) { /* Tablet and below */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small mobile */ }
```

### Responsive Images:
```css
img {
    max-width: 100%;
    height: auto;
}

/* Picture element for different images */
/* HTML: */
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Description">
</picture>
```

### Responsive Typography:
```css
/* Fluid typography */
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Viewport units */
h2 {
    font-size: 5vw; /* 5% of viewport width */
}
```

### Container Queries (Modern):
```css
.container {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        display: flex;
    }
}
```

## ✨ CSS Transitions & Animations

### CSS Transitions:
```css
.button {
    background: blue;
    transition: all 0.3s ease;
}

.button:hover {
    background: darkblue;
    transform: translateY(-2px);
}

/* Individual properties */
.element {
    transition-property: transform, opacity;
    transition-duration: 0.3s, 0.5s;
    transition-timing-function: ease, linear;
    transition-delay: 0s, 0.1s;
}
```

### Timing Functions:
```css
transition-timing-function: ease;         /* Default */
transition-timing-function: linear;       /* Constant speed */
transition-timing-function: ease-in;      /* Slow start */
transition-timing-function: ease-out;     /* Slow end */
transition-timing-function: ease-in-out;  /* Slow start and end */

/* Custom cubic-bezier */
transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### CSS Animations:
```css
/* Define keyframes */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Apply animation */
.element {
    animation: slideIn 0.5s ease-out;
}

/* Multiple keyframes */
@keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0); }
}

/* Animation properties */
.element {
    animation-name: bounce;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    
    /* Shorthand */
    animation: bounce 1s ease-in-out infinite alternate 0.5s forwards;
}
```

### Transform Properties:
```css
/* 2D Transforms */
transform: translate(50px, 100px);    /* Move */
transform: translateX(50px);          /* Move horizontally */
transform: translateY(100px);         /* Move vertically */
transform: scale(1.5);                /* Scale uniformly */
transform: scaleX(2);                 /* Scale horizontally */
transform: scaleY(0.5);               /* Scale vertically */
transform: rotate(45deg);             /* Rotate */
transform: skew(45deg, 10deg);        /* Skew */

/* 3D Transforms */
transform: rotateX(45deg);
transform: rotateY(45deg);
transform: translateZ(50px);
transform: perspective(1000px);

/* Multiple transforms */
transform: translateX(50px) rotate(45deg) scale(1.2);
```

## 🎯 Advanced CSS Selectors

### Pseudo-classes:
```css
/* Structural pseudo-classes */
:first-child                /* First child element */
:last-child                 /* Last child element */
:nth-child(2)              /* Second child */
:nth-child(2n)             /* Even children */
:nth-child(2n+1)           /* Odd children */
:nth-child(3n)             /* Every third child */

/* State pseudo-classes */
:hover                      /* Mouse over */
:focus                      /* Has focus */
:active                     /* Being clicked */
:visited                    /* Visited link */
:checked                    /* Checked input */
:disabled                   /* Disabled input */
:valid                      /* Valid form input */
:invalid                    /* Invalid form input */

/* Content pseudo-classes */
:empty                      /* No content */
:not(.class)               /* Not matching selector */
```

### Pseudo-elements:
```css
::before                    /* Insert content before */
::after                     /* Insert content after */
::first-letter             /* First letter */
::first-line               /* First line */
::selection                /* Selected text */
::placeholder              /* Input placeholder */

/* Example usage */
.element::before {
    content: "★";
    color: gold;
}

.quote::before {
    content: """;
}

.quote::after {
    content: """;
}
```

### Attribute Selectors:
```css
[data-type="button"]       /* Exact match */
[href^="https"]            /* Starts with */
[href$=".pdf"]             /* Ends with */
[class*="btn"]             /* Contains */
[title~="important"]       /* Word in space-separated list */
[lang|="en"]               /* Language code */
```

### Combinators:
```css
/* Descendant combinator */
.parent .child { }         /* .child inside .parent */

/* Child combinator */
.parent > .child { }       /* Direct child only */

/* Adjacent sibling */
h1 + p { }                 /* <p> immediately after <h1> */

/* General sibling */
h1 ~ p { }                 /* All <p> siblings after <h1> */
```

## 🎯 Practice Exercises

Open `index.html` in your browser and explore:

1. **Flexbox Examples** - See how flex properties affect layout
2. **Grid Layouts** - Understand two-dimensional design
3. **Responsive Design** - Resize browser to see breakpoints
4. **Animations** - Hover and watch transitions
5. **Advanced Selectors** - Inspect how selectors target elements

## 💡 Best Practices

### Flexbox vs Grid:
- **Use Flexbox for**: Navigation bars, centering content, distributing space
- **Use Grid for**: Page layouts, card grids, complex two-dimensional designs

### Responsive Design:
- Start with mobile-first design
- Use relative units (rem, em, %)
- Test on real devices
- Consider touch targets (minimum 44px)

### Performance:
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating layout properties (width, height, margin)
- Use `will-change` property sparingly
- Minimize repaints and reflows

### Accessibility:
- Respect `prefers-reduced-motion`
- Ensure sufficient color contrast
- Make interactive elements keyboard accessible
- Use semantic HTML with CSS styling

## ➡️ Next Steps

Once you're comfortable with intermediate CSS, move on to:
- **06_JavaScript_Intermediate** - Advanced JavaScript concepts
- **07_HTML_Advanced** - Accessibility and SEO
- **08_CSS_Advanced** - Modern CSS features and architecture

## 🔗 Useful Resources

- **CSS Grid Garden** - Interactive Grid learning game
- **Flexbox Froggy** - Interactive Flexbox learning game
- **Can I Use** - Browser support tables
- **MDN CSS Reference** - Comprehensive documentation
- **CSS Tricks** - Practical CSS examples and guides

## 🏆 What You've Learned

- ✅ Flexbox for one-dimensional layouts
- ✅ CSS Grid for two-dimensional layouts
- ✅ Responsive design with media queries
- ✅ CSS transitions and animations
- ✅ Advanced selectors and pseudo-elements
- ✅ Modern CSS features like container queries

Congratulations! You now have a solid foundation in intermediate CSS. Keep practicing with real projects! 🚀
