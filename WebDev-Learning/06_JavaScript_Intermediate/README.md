# ⚡ JavaScript Intermediate

## 🎯 Learning Objectives
By the end of this lesson, you will understand:
- Loops and iteration
- Arrays and array methods
- Objects and object manipulation
- Advanced DOM manipulation
- Event handling and event delegation
- Functions and scope
- Error handling
- Introduction to asynchronous JavaScript

## 🔄 Loops and Iteration

### For Loop:
```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// For...of loop (for arrays)
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
    console.log(fruit);
}

// For...in loop (for objects)
const person = { name: 'John', age: 30 };
for (const key in person) {
    console.log(key, person[key]);
}
```

### While Loop:
```javascript
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}

// Do...while loop
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 3);
```

## 📚 Arrays and Array Methods

### Creating Arrays:
```javascript
const numbers = [1, 2, 3, 4, 5];
const mixed = ['hello', 42, true, null];
const empty = [];
const arrayFromLength = new Array(5); // [empty × 5]
```

### Essential Array Methods:

#### Adding/Removing Elements:
```javascript
const arr = [1, 2, 3];

// Add to end
arr.push(4); // [1, 2, 3, 4]

// Remove from end
arr.pop(); // [1, 2, 3]

// Add to beginning
arr.unshift(0); // [0, 1, 2, 3]

// Remove from beginning
arr.shift(); // [1, 2, 3]

// Add/remove at specific position
arr.splice(1, 1, 'new'); // [1, 'new', 3]
```

#### Searching Arrays:
```javascript
const fruits = ['apple', 'banana', 'orange'];

fruits.indexOf('banana'); // 1
fruits.includes('apple'); // true
fruits.find(fruit => fruit.length > 5); // 'banana'
fruits.findIndex(fruit => fruit === 'orange'); // 2
```

#### Array Iteration Methods:
```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach - execute function for each element
numbers.forEach(num => console.log(num));

// map - transform each element
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]

// reduce - reduce array to single value
const sum = numbers.reduce((total, num) => total + num, 0); // 15

// some - test if any element passes
const hasEven = numbers.some(num => num % 2 === 0); // true

// every - test if all elements pass
const allPositive = numbers.every(num => num > 0); // true
```

## 🗂️ Objects and Object Manipulation

### Creating Objects:
```javascript
// Object literal
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}
const john = new Person('John', 30);

// Object.create()
const personPrototype = {
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};
const alice = Object.create(personPrototype);
alice.name = 'Alice';
```

### Accessing Object Properties:
```javascript
const person = { name: 'John', age: 30 };

// Dot notation
console.log(person.name); // 'John'

// Bracket notation
console.log(person['age']); // 30

// Dynamic property access
const prop = 'name';
console.log(person[prop]); // 'John'
```

### Object Methods:
```javascript
const person = {
    name: 'John',
    age: 30,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Object.keys() - get property names
Object.keys(person); // ['name', 'age', 'greet']

// Object.values() - get property values
Object.values(person); // ['John', 30, function]

// Object.entries() - get key-value pairs
Object.entries(person); // [['name', 'John'], ['age', 30], ['greet', function]]

// Object.assign() - copy properties
const newPerson = Object.assign({}, person, { city: 'New York' });

// Destructuring assignment
const { name, age } = person;
```

## 🌐 Advanced DOM Manipulation

### Selecting Elements:
```javascript
// Multiple selection methods
const elements = document.querySelectorAll('.item');
const firstElement = document.querySelector('.item');
const byId = document.getElementById('myId');
const byClass = document.getElementsByClassName('myClass');
const byTag = document.getElementsByTagName('div');
```

### Creating and Modifying Elements:
```javascript
// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'my-class';
newDiv.setAttribute('data-id', '123');

// Add to DOM
document.body.appendChild(newDiv);

// Modify existing elements
const element = document.querySelector('.item');
element.innerHTML = '<strong>Bold text</strong>';
element.style.color = 'blue';
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');
```

### Event Handling:
```javascript
// Add event listener
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    event.preventDefault(); // Prevent default behavior
});

// Remove event listener
function handleClick(event) {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Event delegation
document.addEventListener('click', function(event) {
    if (event.target.matches('.button')) {
        console.log('Button clicked via delegation!');
    }
});
```

## ⚙️ Functions and Scope

### Function Types:
```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const greet = function(name) {
    return `Hello, ${name}!`;
};

// Arrow function
const greet = (name) => `Hello, ${name}!`;

// Arrow function with multiple parameters
const add = (a, b) => a + b;

// Arrow function with block body
const calculate = (a, b) => {
    const sum = a + b;
    return sum * 2;
};
```

### Scope and Closures:
```javascript
// Global scope
let globalVar = 'I am global';

function outerFunction(x) {
    // Function scope
    let outerVar = 'I am outer';
    
    function innerFunction(y) {
        // Inner function has access to outer variables
        console.log(globalVar); // Accessible
        console.log(outerVar);  // Accessible
        console.log(x);         // Accessible
        console.log(y);         // Accessible
    }
    
    return innerFunction;
}

// Closure example
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## 🚨 Error Handling

### Try...Catch:
```javascript
try {
    // Code that might throw an error
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    // Handle the error
    console.error('An error occurred:', error.message);
} finally {
    // Always executes
    console.log('Cleanup code here');
}

// Throwing custom errors
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (error) {
    console.log(error.message); // 'Division by zero is not allowed'
}
```

## 🔄 Introduction to Asynchronous JavaScript

### setTimeout and setInterval:
```javascript
// setTimeout - execute once after delay
setTimeout(() => {
    console.log('This runs after 2 seconds');
}, 2000);

// setInterval - execute repeatedly
const intervalId = setInterval(() => {
    console.log('This runs every second');
}, 1000);

// Clear interval
setTimeout(() => {
    clearInterval(intervalId);
}, 5000);
```

### Promises (Introduction):
```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve('Operation successful!');
        } else {
            reject('Operation failed!');
        }
    }, 1000);
});

// Using a promise
myPromise
    .then(result => {
        console.log(result); // 'Operation successful!'
    })
    .catch(error => {
        console.error(error);
    });
```

## 🎯 Practice Examples

### Todo List Application:
```javascript
class TodoList {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    
    addTodo(text) {
        const todo = {
            id: this.nextId++,
            text: text,
            completed: false,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }
    
    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }
    
    getCompletedTodos() {
        return this.todos.filter(todo => todo.completed);
    }
    
    getPendingTodos() {
        return this.todos.filter(todo => !todo.completed);
    }
}
```

### Form Validation:
```javascript
function validateForm(formData) {
    const errors = {};
    
    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password || formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }
    
    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

// Usage
const formData = {
    name: 'John',
    email: 'john@example.com',
    password: 'password123'
};

const validation = validateForm(formData);
if (validation.isValid) {
    console.log('Form is valid!');
} else {
    console.log('Validation errors:', validation.errors);
}
```

## 💡 Best Practices

1. **Use const by default**, let when you need to reassign
2. **Use meaningful variable names**
3. **Keep functions small and focused**
4. **Handle errors gracefully**
5. **Use array methods instead of loops when possible**
6. **Avoid global variables**
7. **Comment your code**
8. **Use strict mode**: `'use strict';`

## ➡️ Next Steps

Once you're comfortable with intermediate JavaScript:
- **07_HTML_Advanced** - Accessibility and semantic HTML
- **08_CSS_Advanced** - Modern CSS features
- **09_JavaScript_Advanced** - ES6+, modules, and APIs

## 🔗 Useful Resources

- **MDN JavaScript Guide** - Comprehensive documentation
- **JavaScript.info** - Modern JavaScript tutorial
- **Array Method Explorer** - Interactive array method reference
- **You Don't Know JS** - Deep dive into JavaScript

## 🏆 What You've Learned

- ✅ Loops and iteration patterns
- ✅ Array methods and manipulation
- ✅ Object creation and manipulation
- ✅ Advanced DOM manipulation
- ✅ Event handling and delegation
- ✅ Functions, scope, and closures
- ✅ Error handling
- ✅ Introduction to asynchronous programming

Great progress! You're now ready for more advanced JavaScript concepts! 🚀
