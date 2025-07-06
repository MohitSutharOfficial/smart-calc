# ⚡ JavaScript Advanced - ES6+, APIs & Modern Development

## 🎯 Learning Objectives
- Master ES6+ features and modern JavaScript syntax
- Understand asynchronous JavaScript (Promises, async/await)
- Work with APIs and fetch data
- Implement local storage and session management
- Learn JavaScript modules and imports
- Understand modern development patterns

## 🆕 ES6+ Features

### Template Literals
```javascript
const name = 'John';
const age = 30;

// Template literals with expressions
const message = `Hello, my name is ${name} and I'm ${age} years old.`;

// Multi-line strings
const html = `
    <div class="card">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
    </div>
`;

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] ? `<mark>${values[i]}</mark>` : '');
    }, '');
}

const highlighted = highlight`Hello ${name}, you are ${age} years old!`;
```

### Destructuring Assignment
```javascript
// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Object destructuring
const person = { name: 'John', age: 30, city: 'New York' };
const { name, age, city = 'Unknown' } = person;

// Nested destructuring
const user = {
    id: 1,
    profile: {
        name: 'John',
        email: 'john@example.com'
    }
};
const { profile: { name: userName, email } } = user;

// Function parameter destructuring
function greet({ name, age = 25 }) {
    return `Hello ${name}, you are ${age} years old`;
}
```

### Spread and Rest Operators
```javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4); // 10
```

### Arrow Functions
```javascript
// Basic arrow function
const add = (a, b) => a + b;

// Arrow function with block body
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

// Arrow function in callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

// This binding with arrow functions
class Timer {
    constructor() {
        this.seconds = 0;
    }
    
    start() {
        // Arrow function preserves 'this' context
        setInterval(() => {
            this.seconds++;
            console.log(this.seconds);
        }, 1000);
    }
}
```

### Classes and Inheritance
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    // Getter
    get info() {
        return `${this.name} (${this.age})`;
    }
    
    // Setter
    set age(value) {
        if (value > 0) {
            this._age = value;
        }
    }
    
    // Static method
    static species() {
        return 'Homo sapiens';
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // Call parent constructor
        this.grade = grade;
    }
    
    // Override method
    greet() {
        return `${super.greet()}, I'm a student in grade ${this.grade}`;
    }
}
```

## 🔄 Asynchronous JavaScript

### Promises
```javascript
// Creating a promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.3;
            if (success) {
                resolve({ data: 'Success!', timestamp: Date.now() });
            } else {
                reject(new Error('Failed to fetch data'));
            }
        }, 1000);
    });
};

// Using promises
fetchData()
    .then(result => {
        console.log('Success:', result);
        return result.data.toUpperCase();
    })
    .then(uppercaseData => {
        console.log('Processed:', uppercaseData);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log('Promise completed');
    });

// Promise.all - wait for all promises
const promise1 = fetch('/api/data1');
const promise2 = fetch('/api/data2');
const promise3 = fetch('/api/data3');

Promise.all([promise1, promise2, promise3])
    .then(responses => {
        // All requests completed
        return Promise.all(responses.map(r => r.json()));
    })
    .then(data => {
        console.log('All data:', data);
    });

// Promise.race - first to complete
Promise.race([promise1, promise2, promise3])
    .then(response => {
        console.log('First response:', response);
    });
```

### Async/Await
```javascript
// Async function
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error; // Re-throw if needed
    }
}

// Using async/await
async function displayUserProfile(userId) {
    try {
        const user = await fetchUserData(userId);
        const posts = await fetchUserPosts(user.id);
        
        updateUI(user, posts);
    } catch (error) {
        showErrorMessage('Failed to load user profile');
    }
}

// Async iteration
async function processItems(items) {
    for (const item of items) {
        try {
            const result = await processItem(item);
            console.log('Processed:', result);
        } catch (error) {
            console.error('Failed to process item:', item, error);
        }
    }
}
```

## 🌐 Working with APIs

### Fetch API
```javascript
// GET request
async function getUsers() {
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// POST request
async function createUser(userData) {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Upload file
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        return await response.json();
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
}
```

### Error Handling and Retry Logic
```javascript
class APIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.defaultOptions = {
            timeout: 10000,
            retries: 3,
            ...options
        };
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = { ...this.defaultOptions, ...options };
        
        for (let attempt = 1; attempt <= config.retries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), config.timeout);
                
                const response = await fetch(url, {
                    ...config,
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                return await response.json();
            } catch (error) {
                if (attempt === config.retries) {
                    throw error;
                }
                
                // Wait before retry (exponential backoff)
                await new Promise(resolve => 
                    setTimeout(resolve, Math.pow(2, attempt) * 1000)
                );
            }
        }
    }
}
```

## 💾 Local Storage and Session Management

### Local Storage
```javascript
// Store data
localStorage.setItem('user', JSON.stringify({ name: 'John', id: 123 }));
localStorage.setItem('theme', 'dark');

// Retrieve data
const user = JSON.parse(localStorage.getItem('user'));
const theme = localStorage.getItem('theme') || 'light';

// Remove data
localStorage.removeItem('user');
localStorage.clear(); // Clear all

// Check if storage is available
function isStorageAvailable(type) {
    try {
        const storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

// Storage utility class
class Storage {
    static set(key, value, expiry = null) {
        const item = {
            value: value,
            expiry: expiry ? Date.now() + expiry : null
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
    
    static get(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        
        // Check if expired
        if (item.expiry && Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        
        return item.value;
    }
    
    static remove(key) {
        localStorage.removeItem(key);
    }
}

// Usage
Storage.set('sessionData', { userId: 123 }, 60 * 60 * 1000); // 1 hour expiry
```

### Session Storage
```javascript
// Session storage (cleared when tab closes)
sessionStorage.setItem('tempData', 'value');
const tempData = sessionStorage.getItem('tempData');

// Cookies (for server communication)
function setCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
```

## 📦 Modules and Imports

### ES6 Modules
```javascript
// math.js - Named exports
export const PI = 3.14159;
export function add(a, b) {
    return a + b;
}
export function multiply(a, b) {
    return a * b;
}

// utils.js - Default export
export default class Utils {
    static formatDate(date) {
        return date.toLocaleDateString();
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// main.js - Importing
import Utils from './utils.js';
import { PI, add, multiply } from './math.js';
import { PI as PiValue, add as addNumbers } from './math.js'; // Aliases

// Dynamic imports
async function loadModule() {
    try {
        const { default: Utils } = await import('./utils.js');
        const calculator = await import('./calculator.js');
        
        // Use dynamically imported modules
        Utils.formatDate(new Date());
    } catch (error) {
        console.error('Failed to load module:', error);
    }
}
```

### Module Patterns
```javascript
// Revealing Module Pattern
const UserModule = (function() {
    let users = [];
    let currentUser = null;
    
    function addUser(user) {
        users.push(user);
    }
    
    function removeUser(id) {
        users = users.filter(user => user.id !== id);
    }
    
    function getCurrentUser() {
        return currentUser;
    }
    
    function setCurrentUser(user) {
        currentUser = user;
    }
    
    // Public API
    return {
        add: addUser,
        remove: removeUser,
        getCurrent: getCurrentUser,
        setCurrent: setCurrentUser,
        getCount: () => users.length
    };
})();

// Namespace Pattern
const App = {
    Models: {},
    Views: {},
    Controllers: {},
    Utils: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        }
    }
};
```

## 🔧 Advanced JavaScript Patterns

### Observer Pattern
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

// Usage
const emitter = new EventEmitter();
emitter.on('userLogin', (user) => {
    console.log(`User ${user.name} logged in`);
});
emitter.emit('userLogin', { name: 'John' });
```

### Proxy and Reflection
```javascript
// Data validation with Proxy
function createValidatedUser(initialData = {}) {
    return new Proxy(initialData, {
        set(target, property, value) {
            if (property === 'email' && !value.includes('@')) {
                throw new Error('Invalid email address');
            }
            if (property === 'age' && (value < 0 || value > 150)) {
                throw new Error('Invalid age');
            }
            target[property] = value;
            return true;
        },
        
        get(target, property) {
            if (property in target) {
                return target[property];
            }
            throw new Error(`Property ${property} does not exist`);
        }
    });
}

const user = createValidatedUser();
user.name = 'John';
user.email = 'john@example.com'; // OK
// user.email = 'invalid'; // Throws error
```

### WeakMap and WeakSet
```javascript
// Private data with WeakMap
const privateData = new WeakMap();

class User {
    constructor(name, email) {
        privateData.set(this, {
            name: name,
            email: email,
            id: Math.random().toString(36)
        });
    }
    
    getName() {
        return privateData.get(this).name;
    }
    
    getEmail() {
        return privateData.get(this).email;
    }
    
    getId() {
        return privateData.get(this).id;
    }
}
```

## 🎯 Practical Examples

### Debounce and Throttle
```javascript
// Debounce - wait for pause in calls
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// Throttle - limit frequency of calls
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage
const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

const throttledScroll = throttle(() => {
    console.log('Scroll event');
}, 100);
```

### State Management
```javascript
class StateManager {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.listeners = [];
        this.middleware = [];
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    setState(updates) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...updates };
        
        // Apply middleware
        this.middleware.forEach(mw => mw(prevState, this.state));
        
        // Notify listeners
        this.listeners.forEach(listener => listener(this.state, prevState));
    }
    
    getState() {
        return { ...this.state };
    }
    
    addMiddleware(middleware) {
        this.middleware.push(middleware);
    }
}

// Usage
const appState = new StateManager({ count: 0, user: null });

const unsubscribe = appState.subscribe((newState, prevState) => {
    console.log('State changed:', newState);
});

appState.setState({ count: 1 });
```

## 💡 Best Practices

### Code Organization
- Use ES6 modules for better code organization
- Implement proper error handling
- Use async/await over Promises for better readability
- Leverage destructuring and spread operators
- Use const by default, let when reassignment is needed

### Performance
- Avoid memory leaks with proper cleanup
- Use debouncing/throttling for expensive operations
- Implement lazy loading for large datasets
- Use Web Workers for heavy computations

### Security
- Validate and sanitize user input
- Use HTTPS for API calls
- Implement proper authentication
- Avoid storing sensitive data in localStorage

## ➡️ Next Steps

After mastering advanced JavaScript:
- **10_Final_Projects** - Build complete applications
- Explore JavaScript frameworks (React, Vue, Angular)
- Learn Node.js for backend development
- Study TypeScript for type safety

## 🏆 What You've Learned

- ✅ ES6+ features and modern syntax
- ✅ Asynchronous JavaScript patterns
- ✅ API integration and data fetching
- ✅ Local storage and state management
- ✅ Module systems and code organization
- ✅ Advanced JavaScript patterns and techniques

You're now equipped with advanced JavaScript skills to build complex, modern web applications! 🚀
