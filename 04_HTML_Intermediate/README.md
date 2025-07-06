# 🔧 HTML Intermediate

## 🎯 Learning Objectives
By the end of this lesson, you will understand:
- How to create and structure HTML tables
- Advanced form elements and validation
- Semantic HTML5 elements and their importance
- Embedding multimedia content (audio, video, images)
- Using iFrames for external content
- Web accessibility basics
- SEO-friendly HTML structure

## 📊 HTML Tables

Tables are used to display structured data in rows and columns.

### Basic Table Structure:
```html
<table>
    <caption>Table Description</caption>
    <thead>
        <tr>
            <th scope="col">Header 1</th>
            <th scope="col">Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Footer 1</td>
            <td>Footer 2</td>
        </tr>
    </tfoot>
</table>
```

### Table Elements:
- `<table>` - The table container
- `<caption>` - Table title/description
- `<thead>` - Table header section
- `<tbody>` - Table body section
- `<tfoot>` - Table footer section
- `<tr>` - Table row
- `<th>` - Table header cell
- `<td>` - Table data cell

### Table Attributes:
- `colspan="2"` - Spans across multiple columns
- `rowspan="2"` - Spans across multiple rows
- `scope="col"` - Defines header scope for accessibility

## 📝 Advanced Forms

### Form Structure:
```html
<form action="/submit" method="POST">
    <fieldset>
        <legend>Personal Information</legend>
        <!-- Form controls -->
    </fieldset>
</form>
```

### Input Types:
```html
<!-- Text inputs -->
<input type="text" placeholder="Enter text">
<input type="email" placeholder="Enter email">
<input type="password" placeholder="Enter password">
<input type="tel" placeholder="Enter phone">
<input type="url" placeholder="Enter website">

<!-- Number inputs -->
<input type="number" min="0" max="100">
<input type="range" min="0" max="10" value="5">

<!-- Date inputs -->
<input type="date">
<input type="time">
<input type="datetime-local">

<!-- File inputs -->
<input type="file" accept=".pdf,.jpg,.png">
<input type="file" multiple>

<!-- Selection inputs -->
<input type="radio" name="group" value="option1">
<input type="checkbox" name="options" value="option1">
```

### Form Validation:
```html
<input type="email" required 
       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
       title="Please enter a valid email address">

<input type="text" required 
       minlength="3" 
       maxlength="20"
       pattern="[A-Za-z]+"
       title="Name should only contain letters">
```

### Advanced Form Elements:
```html
<!-- Select with groups -->
<select>
    <optgroup label="Group 1">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </optgroup>
</select>

<!-- Textarea -->
<textarea rows="4" cols="50" placeholder="Enter message"></textarea>

<!-- Output element -->
<output id="result">0</output>
```

## 🏗️ Semantic HTML5 Elements

Semantic elements provide meaning to your HTML structure, improving accessibility and SEO.

### Layout Elements:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Semantic Page</title>
</head>
<body>
    <header>
        <nav>
            <!-- Navigation links -->
        </nav>
    </header>
    
    <main>
        <article>
            <header>
                <h1>Article Title</h1>
            </header>
            <section>
                <h2>Section Title</h2>
                <!-- Content -->
            </section>
            <aside>
                <!-- Sidebar content -->
            </aside>
            <footer>
                <!-- Article footer -->
            </footer>
        </article>
    </main>
    
    <footer>
        <!-- Page footer -->
    </footer>
</body>
</html>
```

### Semantic Elements Overview:

| Element | Purpose |
|---------|---------|
| `<header>` | Introductory content or navigation |
| `<nav>` | Navigation links |
| `<main>` | Main content area |
| `<article>` | Independent, self-contained content |
| `<section>` | Thematic grouping of content |
| `<aside>` | Content aside from main content |
| `<footer>` | Footer information |
| `<figure>` | Self-contained content (images, diagrams) |
| `<figcaption>` | Caption for figure |
| `<time>` | Date/time information |
| `<address>` | Contact information |

### Text-Level Semantics:
```html
<p>This is <strong>important</strong> text.</p>
<p>This is <em>emphasized</em> text.</p>
<p>This is <mark>highlighted</mark> text.</p>
<p>This is <del>deleted</del> and <ins>inserted</ins> text.</p>
<p>This is <small>fine print</small>.</p>
<p>This is <cite>a citation</cite>.</p>
<p>This is <code>inline code</code>.</p>
<p>This is <kbd>keyboard input</kbd>.</p>
<p>This is <var>a variable</var>.</p>
<p>This is <samp>sample output</samp>.</p>
```

## 🎬 Multimedia Elements

### Video Element:
```html
<video controls width="640" height="480" poster="thumbnail.jpg">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <track kind="subtitles" src="subtitles.vtt" srclang="en" label="English">
    <p>Your browser doesn't support HTML5 video.</p>
</video>
```

### Audio Element:
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <p>Your browser doesn't support HTML5 audio.</p>
</audio>
```

### Responsive Images:
```html
<!-- Picture element for responsive images -->
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Description">
</picture>

<!-- Image with multiple resolutions -->
<img src="image.jpg" 
     srcset="image-320w.jpg 320w,
             image-640w.jpg 640w,
             image-1280w.jpg 1280w"
     sizes="(max-width: 320px) 280px,
            (max-width: 640px) 600px,
            1200px"
     alt="Description">
```

### Figure and Figcaption:
```html
<figure>
    <img src="chart.png" alt="Sales data chart">
    <figcaption>
        Figure 1: Sales data for Q4 2025 showing 
        a 25% increase over the previous quarter.
    </figcaption>
</figure>
```

## 🖼️ iFrames and Embedded Content

### Basic iFrame:
```html
<iframe src="https://example.com" 
        width="600" 
        height="400"
        title="External content"
        frameborder="0">
</iframe>
```

### YouTube Embed:
```html
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>
```

### Google Maps Embed:
```html
<iframe src="https://www.google.com/maps/embed?pb=..." 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

### Security Considerations:
```html
<!-- Sandbox attribute for security -->
<iframe src="untrusted-content.html" 
        sandbox="allow-scripts allow-same-origin">
</iframe>
```

## ♿ Web Accessibility Basics

### ARIA Attributes:
```html
<!-- ARIA labels -->
<button aria-label="Close dialog">×</button>
<img src="chart.png" alt="" aria-describedby="chart-desc">
<p id="chart-desc">Detailed description of the chart data...</p>

<!-- ARIA roles -->
<div role="button" tabindex="0">Custom button</div>
<nav role="navigation">
<main role="main">

<!-- ARIA states -->
<button aria-expanded="false">Menu</button>
<div aria-hidden="true">Hidden content</div>
```

### Accessibility Best Practices:

1. **Use semantic HTML elements**
2. **Provide alt text for images**
3. **Use proper heading hierarchy (h1, h2, h3...)**
4. **Ensure keyboard navigation**
5. **Use sufficient color contrast**
6. **Label form controls properly**
7. **Use ARIA attributes when needed**

### Form Accessibility:
```html
<label for="name">Full Name (required)</label>
<input type="text" id="name" name="name" 
       required aria-describedby="name-help">
<div id="name-help">Enter your first and last name</div>

<fieldset>
    <legend>Gender</legend>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">Male</label>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">Female</label>
</fieldset>
```

## 🔍 SEO-Friendly HTML

### Meta Tags:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description for search engines">
    <meta name="keywords" content="keyword1, keyword2, keyword3">
    <meta name="author" content="Author Name">
    
    <!-- Open Graph meta tags -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description">
    <meta property="og:image" content="image.jpg">
    <meta property="og:url" content="https://example.com">
    
    <!-- Twitter Card meta tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page description">
    <meta name="twitter:image" content="image.jpg">
</head>
```

### Structured Data:
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "author": {
        "@type": "Person",
        "name": "Author Name"
    },
    "datePublished": "2025-01-15",
    "image": "article-image.jpg"
}
</script>
```

## 🎯 Practice Exercises

Open `index.html` in your browser and explore:

1. **Table Examples** - See how data is structured in tables
2. **Advanced Forms** - Try different input types and validation
3. **Semantic Structure** - Understand the HTML5 semantic layout
4. **Multimedia Content** - Interact with video, audio, and images
5. **Embedded Content** - View iFrames and external content

## 💡 Best Practices

### Table Best Practices:
- Use tables only for tabular data, not layout
- Always include proper headers with `scope` attributes
- Use `<caption>` to describe table content
- Make tables responsive for mobile devices

### Form Best Practices:
- Always associate labels with form controls
- Use appropriate input types for better UX
- Implement client-side and server-side validation
- Group related fields with `<fieldset>` and `<legend>`
- Provide clear error messages

### Semantic HTML Best Practices:
- Use headings in logical order (h1, h2, h3...)
- Don't skip heading levels
- Use semantic elements for their intended purpose
- Provide meaningful alt text for images
- Use `lang` attribute for language specification

## ➡️ Next Steps

Once you're comfortable with intermediate HTML, move on to:
- **05_CSS_Intermediate** - Advanced CSS layouts and responsive design
- **06_JavaScript_Intermediate** - DOM manipulation and advanced JavaScript
- Practice building complete web pages with semantic structure

## 🔗 Useful Resources

- **MDN Web Docs** - Comprehensive HTML documentation
- **W3C Validator** - Validate your HTML
- **WAVE Web Accessibility Evaluator** - Check accessibility
- **Schema.org** - Structured data reference
- **WebAIM** - Web accessibility guidelines

## 🏆 What You've Learned

- ✅ Creating structured tables with proper semantics
- ✅ Building advanced forms with validation
- ✅ Using HTML5 semantic elements effectively
- ✅ Embedding multimedia content
- ✅ Understanding web accessibility principles
- ✅ Implementing SEO-friendly HTML structure

Congratulations! You now have a solid foundation in intermediate HTML concepts. Keep practicing and building more complex web structures! 🚀
