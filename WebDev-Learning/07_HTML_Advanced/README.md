# ♿ HTML Advanced - Accessibility & SEO

## 🎯 Learning Objectives
- Master web accessibility (ARIA, semantic HTML)
- Implement SEO best practices
- Understand progressive enhancement
- Learn performance optimization
- Explore modern HTML APIs
- Build inclusive web experiences

## ♿ Web Accessibility (A11y)

### ARIA (Accessible Rich Internet Applications)
```html
<!-- ARIA roles -->
<nav role="navigation">
<main role="main">
<button role="button" aria-pressed="false">Toggle</button>

<!-- ARIA properties -->
<input type="text" aria-label="Search" aria-required="true">
<div aria-live="polite" id="status">Status updates here</div>
<button aria-expanded="false" aria-controls="menu">Menu</button>

<!-- ARIA states -->
<div aria-hidden="true">Hidden from screen readers</div>
<button aria-disabled="true">Disabled button</button>
```

### Semantic HTML Structure
```html
<article>
    <header>
        <h1>Article Title</h1>
        <time datetime="2025-01-15">January 15, 2025</time>
    </header>
    <main>
        <section>
            <h2>Section Title</h2>
            <p>Content here...</p>
        </section>
    </main>
    <footer>
        <address>Contact information</address>
    </footer>
</article>
```

### Form Accessibility
```html
<form>
    <fieldset>
        <legend>Personal Information</legend>
        
        <label for="name">Full Name (required)</label>
        <input type="text" id="name" name="name" 
               required aria-describedby="name-help">
        <div id="name-help">Enter your first and last name</div>
        
        <label for="email">Email</label>
        <input type="email" id="email" name="email" 
               aria-invalid="false" aria-describedby="email-error">
        <div id="email-error" role="alert" aria-live="polite"></div>
    </fieldset>
</form>
```

## 🔍 SEO Optimization

### Meta Tags and Document Head
```html
<head>
    <!-- Essential meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Brand Name</title>
    <meta name="description" content="Concise page description under 160 characters">
    
    <!-- Open Graph meta tags -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card meta tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@username">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page description">
    <meta name="twitter:image" content="https://example.com/image.jpg">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://example.com/page">
    
    <!-- Structured data -->
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
        "image": "https://example.com/article-image.jpg"
    }
    </script>
</head>
```

### Semantic HTML for SEO
```html
<!-- Use proper heading hierarchy -->
<h1>Main Page Title</h1>
    <h2>Section Title</h2>
        <h3>Subsection Title</h3>
        <h3>Another Subsection</h3>
    <h2>Another Section</h2>

<!-- Use semantic elements -->
<article>
    <header>
        <h1>Article Title</h1>
        <time datetime="2025-01-15">January 15, 2025</time>
    </header>
    <section>
        <h2>Section heading</h2>
        <p>Content with <strong>important keywords</strong>.</p>
    </section>
</article>
```

## 🚀 Performance Optimization

### Image Optimization
```html
<!-- Responsive images -->
<picture>
    <source media="(min-width: 800px)" srcset="large.webp" type="image/webp">
    <source media="(min-width: 800px)" srcset="large.jpg" type="image/jpeg">
    <source media="(min-width: 400px)" srcset="medium.webp" type="image/webp">
    <source media="(min-width: 400px)" srcset="medium.jpg" type="image/jpeg">
    <img src="small.jpg" alt="Descriptive alt text" loading="lazy">
</picture>

<!-- Lazy loading -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Preload critical images -->
<link rel="preload" href="hero-image.jpg" as="image">
```

### Resource Loading
```html
<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="important-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch future resources -->
<link rel="prefetch" href="next-page.html">

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//external-domain.com">

<!-- Critical CSS inline -->
<style>
    /* Critical above-the-fold styles */
    .hero { font-size: 2rem; }
</style>

<!-- Non-critical CSS -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

## 🔧 Modern HTML APIs

### Web Components
```html
<!-- Custom elements -->
<my-custom-button type="primary">Click me</my-custom-button>

<!-- Shadow DOM -->
<template id="my-template">
    <style>
        button { background: blue; color: white; }
    </style>
    <button><slot></slot></button>
</template>
```

### Progressive Web App Features
```html
<!-- Web App Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Service Worker -->
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
</script>

<!-- Offline page -->
<html manifest="cache.manifest">
```

### Modern Form Features
```html
<!-- Input types -->
<input type="color" name="color">
<input type="date" name="date">
<input type="datetime-local" name="datetime">
<input type="month" name="month">
<input type="range" min="0" max="100" name="range">
<input type="search" name="search">
<input type="time" name="time">
<input type="week" name="week">

<!-- Form validation -->
<input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
<input type="text" minlength="3" maxlength="20">
<input type="number" min="0" max="100" step="5">

<!-- Custom validation messages -->
<input type="text" required oninvalid="this.setCustomValidity('Please enter your name')">
```

## 📊 Analytics and Tracking

### Google Analytics 4
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Schema.org Structured Data
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Company Name",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service"
    },
    "sameAs": [
        "https://facebook.com/company",
        "https://twitter.com/company"
    ]
}
</script>
```

## 🔒 Security Best Practices

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

### Security Headers
```html
<!-- Prevent clickjacking -->
<meta http-equiv="X-Frame-Options" content="DENY">

<!-- XSS Protection -->
<meta http-equiv="X-XSS-Protection" content="1; mode=block">

<!-- Content type sniffing -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- Referrer policy -->
<meta name="referrer" content="strict-origin-when-cross-origin">
```

## 🎯 Testing and Validation

### Accessibility Testing Tools:
- **WAVE Web Accessibility Evaluator**
- **axe DevTools**
- **Lighthouse Accessibility Audit**
- **Screen reader testing** (NVDA, JAWS, VoiceOver)

### SEO Testing Tools:
- **Google Search Console**
- **Google PageSpeed Insights**
- **Screaming Frog SEO Spider**
- **Schema.org Validator**

### HTML Validation:
- **W3C Markup Validator**
- **HTML5 Validator**

## 💡 Best Practices Checklist

### Accessibility:
- ✅ Use semantic HTML elements
- ✅ Provide alt text for images
- ✅ Ensure keyboard navigation
- ✅ Use proper heading hierarchy
- ✅ Provide sufficient color contrast
- ✅ Use ARIA attributes appropriately
- ✅ Test with screen readers

### SEO:
- ✅ Optimize page titles and descriptions
- ✅ Use proper heading structure
- ✅ Implement structured data
- ✅ Optimize images with alt text
- ✅ Ensure fast loading times
- ✅ Make content mobile-friendly
- ✅ Use clean, descriptive URLs

### Performance:
- ✅ Minimize HTTP requests
- ✅ Optimize images and media
- ✅ Use lazy loading
- ✅ Implement caching strategies
- ✅ Minify CSS and JavaScript
- ✅ Use a Content Delivery Network (CDN)

## ➡️ Next Steps

After mastering advanced HTML:
- **08_CSS_Advanced** - Modern CSS features and architecture
- **09_JavaScript_Advanced** - ES6+, modules, and APIs
- **10_Final_Projects** - Build complete applications

## 🔗 Resources

- **Web Content Accessibility Guidelines (WCAG)**
- **Google SEO Starter Guide**
- **MDN Web Docs - Accessibility**
- **Schema.org Documentation**
- **Google Lighthouse**

## 🏆 What You've Learned

- ✅ Web accessibility principles and implementation
- ✅ SEO optimization techniques
- ✅ Performance optimization strategies
- ✅ Modern HTML APIs and features
- ✅ Security best practices
- ✅ Testing and validation methods

You're now equipped to build professional, accessible, and SEO-friendly websites! 🌟
