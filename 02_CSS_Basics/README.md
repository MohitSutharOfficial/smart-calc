# 🎨 CSS Basics

## 🎯 Learning Objectives
By the end of this lesson, you will understand:
- What CSS is and how it works with HTML
- CSS syntax and selectors
- Colors, fonts, and typography
- The CSS Box Model
- Margins, padding, and borders
- Text alignment and display properties
- How to link CSS to HTML

## 📝 What is CSS?

**CSS (Cascading Style Sheets)** is a stylesheet language used to describe the presentation and styling of HTML documents. While HTML provides structure and content, CSS controls the visual appearance.

### Key Benefits:
- **Separation of content and presentation**
- **Consistent styling** across multiple pages
- **Responsive design** capabilities
- **Better maintainability**

## 🔗 How to Add CSS to HTML

### Method 1: External CSS (Recommended)
```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

### Method 2: Internal CSS
```html
<head>
    <style>
        body { background-color: blue; }
    </style>
</head>
```

### Method 3: Inline CSS
```html
<p style="color: red;">This text is red</p>
```

## 📖 CSS Syntax

```css
selector {
    property: value;
    property: value;
}
```

### Example:
```css
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}
```

## 🎯 CSS Selectors

### Element Selector
```css
p { color: blue; }          /* All <p> elements */
h1 { font-size: 32px; }     /* All <h1> elements */
```

### Class Selector
```css
.my-class { color: red; }   /* Elements with class="my-class" */
```

### ID Selector
```css
#my-id { color: green; }    /* Element with id="my-id" */
```

### Multiple Selectors
```css
h1, h2, h3 { color: blue; } /* All h1, h2, and h3 elements */
```

## 🌈 Colors in CSS

### Color Methods:
```css
/* Color names */
color: red;
color: blue;

/* Hex codes */
color: #ff0000;  /* Red */
color: #0000ff;  /* Blue */

/* RGB values */
color: rgb(255, 0, 0);      /* Red */
color: rgba(255, 0, 0, 0.5); /* Red with 50% transparency */

/* HSL values */
color: hsl(0, 100%, 50%);   /* Red */
```

## 🔤 Typography and Fonts

### Font Properties:
```css
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;
font-style: italic;
line-height: 1.5;
text-align: center;
text-decoration: underline;
```

### Font Families:
- **Serif**: Times New Roman, Georgia
- **Sans-serif**: Arial, Helvetica
- **Monospace**: Courier New, Monaco

## 📦 The CSS Box Model

Every HTML element is a rectangular box consisting of:

```
+---------------------------+
|         MARGIN            |
|  +---------------------+  |
|  |      BORDER         |  |
|  |  +---------------+  |  |
|  |  |   PADDING     |  |  |
|  |  |  +---------+  |  |  |
|  |  |  | CONTENT |  |  |  |
|  |  |  +---------+  |  |  |
|  |  +---------------+  |  |
|  +---------------------+  |
+---------------------------+
```

### Box Model Properties:
```css
.box {
    width: 200px;
    height: 100px;
    padding: 20px;      /* Space inside the border */
    border: 2px solid black;
    margin: 10px;       /* Space outside the border */
}
```

## 📏 Spacing: Margins and Padding

### Margin (outside spacing):
```css
margin: 10px;           /* All sides */
margin: 10px 20px;      /* Top/bottom, left/right */
margin: 10px 20px 30px 40px; /* Top, right, bottom, left */

margin-top: 10px;
margin-right: 20px;
margin-bottom: 30px;
margin-left: 40px;
```

### Padding (inside spacing):
```css
padding: 10px;          /* All sides */
padding: 10px 20px;     /* Top/bottom, left/right */
padding: 10px 20px 30px 40px; /* Top, right, bottom, left */

padding-top: 10px;
padding-right: 20px;
padding-bottom: 30px;
padding-left: 40px;
```

## 🔲 Borders

### Border Properties:
```css
border: 2px solid black;    /* Width, style, color */

/* Individual properties */
border-width: 2px;
border-style: solid;        /* solid, dashed, dotted */
border-color: black;

/* Individual sides */
border-top: 1px solid red;
border-right: 2px dashed blue;
border-bottom: 3px dotted green;
border-left: 4px solid purple;

/* Rounded corners */
border-radius: 10px;
```

## 📝 Text Alignment

```css
text-align: left;       /* Default */
text-align: center;     /* Centered */
text-align: right;      /* Right-aligned */
text-align: justify;    /* Justified */
```

## 📋 Display Properties

### Common Display Values:
```css
display: block;         /* Takes full width */
display: inline;        /* Only takes needed width */
display: inline-block;  /* Combination of both */
display: none;          /* Hides element */
```

## 🎯 Practice Exercise

Open `index.html` in your web browser and:

1. **View the styled page** - See how CSS transforms plain HTML
2. **Inspect elements** - Right-click and select "Inspect Element"
3. **Modify the CSS**:
   - Change colors in `style.css`
   - Adjust font sizes
   - Modify spacing values
   - Try different border styles

## 🔍 What You'll See

When you open `index.html`, you'll see:
- Colorful boxes demonstrating different colors
- Various font styles and sizes
- Examples of the box model in action
- Different spacing and border effects
- Text alignment variations
- Display property demonstrations

## 💡 CSS Best Practices

1. **Use external CSS files** for better organization
2. **Use classes over IDs** for styling (IDs should be unique)
3. **Keep selectors simple** and specific
4. **Use consistent naming conventions**
5. **Comment your CSS** for clarity
6. **Test in multiple browsers**

## ➡️ Next Steps

Once you're comfortable with CSS basics, move on to:
- **03_JavaScript_Basics** - Add interactivity to your pages
- Practice creating different layouts
- Experiment with more color combinations
- Try creating your own design system

## 🛠️ Tools to Help You

- **Browser Developer Tools** - Right-click → Inspect Element
- **CSS Validators** - Check your CSS for errors
- **Color Pickers** - Choose perfect colors
- **Google Fonts** - Free web fonts

Happy styling! 🎨
