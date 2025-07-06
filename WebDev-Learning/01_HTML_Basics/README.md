# 📖 HTML Basics

## 🎯 Learning Objectives
By the end of this lesson, you will understand:
- What HTML is and how it works
- Basic HTML document structure
- Essential HTML tags and elements
- How to create headings, paragraphs, links, and images
- How to create lists and forms
- Text formatting basics

## 📝 What is HTML?

**HTML (HyperText Markup Language)** is the standard markup language used to create web pages. It describes the structure and content of a webpage using elements called **tags**.

### Key Concepts:
- **Tags**: Keywords enclosed in angle brackets `<tag>`
- **Elements**: Complete tags with content `<tag>content</tag>`
- **Attributes**: Additional information about elements `<tag attribute="value">`

## 🏗️ HTML Document Structure

Every HTML document follows this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Your content goes here -->
</body>
</html>
```

### Explanation:
- `<!DOCTYPE html>`: Tells the browser this is an HTML5 document
- `<html>`: Root element of the page
- `<head>`: Contains metadata (not visible on page)
- `<body>`: Contains the visible content

## 🔖 Essential HTML Tags

### Headings
```html
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<!-- h4, h5, h6 for smaller headings -->
```

### Paragraphs
```html
<p>This is a paragraph of text.</p>
```

### Links
```html
<a href="https://example.com">External Link</a>
<a href="#section">Internal Link</a>
<a href="page.html">Local Page Link</a>
```

### Images
```html
<img src="image.jpg" alt="Description of image">
```

### Lists
```html
<!-- Unordered List -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Ordered List -->
<ol>
    <li>First item</li>
    <li>Second item</li>
</ol>
```

## 🎨 Text Formatting

- `<strong>` - Important text (bold)
- `<em>` - Emphasized text (italic)
- `<u>` - Underlined text
- `<mark>` - Highlighted text
- `<del>` - Deleted text
- `<ins>` - Inserted text

## 📋 Forms

Forms collect user input:

```html
<form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <input type="submit" value="Submit">
</form>
```

## 🎯 Practice Exercise

Open `index.html` in your web browser and:

1. **View the page** - See how each HTML element appears
2. **Inspect the code** - Right-click and select "View Page Source"
3. **Try modifications**:
   - Change the heading text
   - Add a new paragraph
   - Create your own list
   - Add another image

## 🔍 What You'll See

When you open `index.html`, you'll see:
- Various heading levels
- Formatted paragraphs
- Clickable links
- An image
- Different types of lists
- Text formatting examples
- A basic form

## ➡️ Next Steps

Once you're comfortable with HTML basics, move on to:
- **02_CSS_Basics** - Learn how to style your HTML
- Practice creating your own HTML pages
- Experiment with different tags and attributes

## 💡 Tips for Success

1. **Always close your tags** - `<p>content</p>`
2. **Use semantic HTML** - Choose tags based on meaning, not appearance
3. **Validate your HTML** - Use online validators to check for errors
4. **Practice regularly** - Build simple pages to reinforce learning

Happy coding! 🚀
