# ⚡ JavaScript Basics

## 🎯 Learning Objectives
By the end of this lesson, you will understand:
- What JavaScript is and how it works
- Variables and data types
- Functions and how to create them
- Events and user interaction
- DOM manipulation (changing HTML with JavaScript)
- Conditional statements (if/else)
- Basic programming concepts

## 📝 What is JavaScript?

**JavaScript** is a programming language that makes web pages interactive. While HTML provides structure and CSS provides styling, JavaScript adds behavior and functionality.

### Key Features:
- **Client-side scripting** - Runs in the browser
- **Dynamic content** - Can change HTML and CSS
- **Event handling** - Responds to user actions
- **No compilation needed** - Runs directly in browser

## 🔗 How to Add JavaScript to HTML

### Method 1: External JavaScript (Recommended)
```html
<script src="script.js"></script>
```

### Method 2: Internal JavaScript
```html
<script>
    alert("Hello, World!");
</script>
```

### Method 3: Inline JavaScript
```html
<button onclick="alert('Button clicked!')">Click me</button>
```

## 📦 Variables and Data Types

### Declaring Variables:
```javascript
let userName = "John";          // String
let age = 25;                   // Number
let isStudent = true;           // Boolean
let hobbies = ["reading", "coding"]; // Array
let person = {                  // Object
    name: "John",
    age: 25
};
```

### Variable Types:
- **let** - Modern way to declare variables (block scope)
- **const** - For constants that don't change
- **var** - Old way (avoid using)

### Data Types:
- **String**: Text data `"Hello"`
- **Number**: Numeric data `42`, `3.14`
- **Boolean**: True/false values `true`, `false`
- **Array**: List of items `[1, 2, 3]`
- **Object**: Key-value pairs `{name: "John"}`
- **undefined**: Variable declared but not assigned
- **null**: Intentionally empty value

## 🔧 Functions

Functions are reusable blocks of code:

```javascript
// Function declaration
function greetUser(name) {
    return "Hello, " + name + "!";
}

// Function call
let message = greetUser("John");
console.log(message); // "Hello, John!"

// Arrow function (modern syntax)
const addNumbers = (a, b) => {
    return a + b;
};
```

## 🎮 Events and User Interaction

### Common Events:
```javascript
// Click event
button.addEventListener("click", function() {
    alert("Button clicked!");
});

// Mouse events
element.addEventListener("mouseenter", function() {
    console.log("Mouse entered!");
});

// Keyboard events
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        console.log("Enter key pressed!");
    }
});
```

## 🌐 DOM Manipulation

**DOM (Document Object Model)** represents the HTML structure that JavaScript can modify:

### Selecting Elements:
```javascript
// By ID
let element = document.getElementById("myId");

// By class
let elements = document.getElementsByClassName("myClass");

// By tag
let paragraphs = document.getElementsByTagName("p");

// Modern selectors
let element = document.querySelector("#myId");
let elements = document.querySelectorAll(".myClass");
```

### Changing Content:
```javascript
// Change text content
element.textContent = "New text";

// Change HTML content
element.innerHTML = "<strong>Bold text</strong>";

// Change attributes
element.style.color = "red";
element.classList.add("active");
```

## ❓ Conditional Statements

### If/Else Statements:
```javascript
let age = 18;

if (age < 13) {
    console.log("Child");
} else if (age < 20) {
    console.log("Teenager");
} else if (age < 65) {
    console.log("Adult");
} else {
    console.log("Senior");
}
```

### Comparison Operators:
- `===` - Strict equality
- `!==` - Strict inequality
- `<`, `>`, `<=`, `>=` - Comparison
- `&&` - AND
- `||` - OR
- `!` - NOT

## 🔄 Loops (Preview)

```javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// While loop
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}
```

## 🛠️ Built-in Objects and Methods

### Math Object:
```javascript
Math.random()        // Random number 0-1
Math.floor(4.7)      // 4 (round down)
Math.ceil(4.3)       // 5 (round up)
Math.max(1, 5, 3)    // 5 (maximum)
```

### Date Object:
```javascript
let now = new Date();
now.getHours()       // Current hour
now.getMinutes()     // Current minutes
now.toLocaleDateString() // Formatted date
```

### String Methods:
```javascript
let text = "Hello World";
text.length          // 11
text.toUpperCase()   // "HELLO WORLD"
text.toLowerCase()   // "hello world"
text.includes("World") // true
```

## 🎯 Practice Exercises

Open `index.html` in your browser and try:

1. **Variables Demo** - See different data types in action
2. **Function Practice** - Enter your name and get a greeting
3. **Event Handling** - Click and hover over buttons
4. **DOM Manipulation** - Change text and colors
5. **Conditionals** - Check age categories
6. **Calculator** - Perform basic math operations
7. **Dynamic Content** - Create a todo list
8. **Date/Time** - Work with current date and time
9. **Random Numbers** - Generate random values
10. **Console** - View debug messages

## 🔍 What You'll See

When you open `index.html`, you'll see interactive examples of:
- Variable declarations and data types
- Function calls and returns
- Event listeners and user interaction
- Real-time DOM manipulation
- Conditional logic in action
- Dynamic content creation
- Working with dates and random numbers

## 🐛 Debugging with Console

```javascript
console.log("Debug message");     // General logging
console.info("Information");      // Info message
console.warn("Warning");          // Warning message
console.error("Error");           // Error message
```

**How to open Console:**
- **Chrome/Edge**: F12 → Console tab
- **Firefox**: F12 → Console tab
- **Safari**: Cmd+Option+C

## 💡 JavaScript Best Practices

1. **Use meaningful variable names**
   ```javascript
   // Good
   let userName = "John";
   
   // Bad
   let x = "John";
   ```

2. **Always use semicolons**
   ```javascript
   let name = "John";
   console.log(name);
   ```

3. **Use const for values that don't change**
   ```javascript
   const PI = 3.14159;
   const API_URL = "https://api.example.com";
   ```

4. **Comment your code**
   ```javascript
   // Calculate the area of a circle
   const area = PI * radius * radius;
   ```

5. **Handle errors gracefully**
   ```javascript
   if (isNaN(userInput)) {
       alert("Please enter a valid number");
       return;
   }
   ```

## ➡️ Next Steps

Once you're comfortable with JavaScript basics, move on to:
- **04_HTML_Intermediate** - Advanced HTML features
- **05_CSS_Intermediate** - Responsive design and layouts
- **06_JavaScript_Intermediate** - Loops, arrays, and advanced concepts

## 🔗 Useful Resources

- **MDN Web Docs** - Comprehensive JavaScript documentation
- **Browser DevTools** - Essential for debugging
- **Console.log()** - Your best friend for testing
- **Online JavaScript Playground** - Practice coding

## 🎉 Common Beginner Mistakes to Avoid

1. **Forgetting to link JavaScript file**
2. **Using = instead of === for comparison**
3. **Not handling null/undefined values**
4. **Forgetting to declare variables with let/const**
5. **Not using the browser console for debugging**

Happy coding! 🚀 JavaScript opens up a whole new world of interactivity!
