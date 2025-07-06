// JavaScript Intermediate - Interactive Examples
// This file demonstrates intermediate JavaScript concepts with practical examples

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript Intermediate examples loaded!');

    // Initialize all demo functions
    initArrayDemo();
    initObjectDemo();
    initLoopDemo();
    initDOMManipulation();
    initEventHandling();
    initErrorHandling();
    initAsyncDemo();
    initLocalStorage();
    initFormValidation();
});

// ========== ARRAYS AND OBJECTS ==========

function initArrayDemo() {
    const arrayDemoBtn = document.getElementById('arrayDemo');
    const arrayResults = document.getElementById('arrayResults');

    arrayDemoBtn.addEventListener('click', function () {
        const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
        let results = '';

        // Array methods demonstration
        results += 'Original array: ' + fruits.join(', ') + '\n\n';

        // map() - transform each element
        const upperFruits = fruits.map(fruit => fruit.toUpperCase());
        results += 'Uppercase (map): ' + upperFruits.join(', ') + '\n\n';

        // filter() - filter elements
        const longFruits = fruits.filter(fruit => fruit.length > 5);
        results += 'Long names (filter): ' + longFruits.join(', ') + '\n\n';

        // reduce() - reduce to single value
        const totalLength = fruits.reduce((sum, fruit) => sum + fruit.length, 0);
        results += 'Total characters (reduce): ' + totalLength + '\n\n';

        // find() - find first match
        const foundFruit = fruits.find(fruit => fruit.startsWith('a'));
        results += 'First fruit starting with "a": ' + foundFruit + '\n\n';

        // some() and every()
        const hasLongName = fruits.some(fruit => fruit.length > 6);
        const allShortNames = fruits.every(fruit => fruit.length < 10);
        results += 'Has fruit longer than 6 chars: ' + hasLongName + '\n';
        results += 'All fruits shorter than 10 chars: ' + allShortNames;

        arrayResults.textContent = results;
    });
}

function initObjectDemo() {
    const objectDemoBtn = document.getElementById('objectDemo');
    const objectResults = document.getElementById('objectResults');

    objectDemoBtn.addEventListener('click', function () {
        // Object demonstration
        const person = {
            name: 'John Doe',
            age: 30,
            city: 'New York',
            skills: ['JavaScript', 'HTML', 'CSS']
        };

        let results = '';

        // Object methods
        results += 'Original object:\n' + JSON.stringify(person, null, 2) + '\n\n';

        // Object.keys(), Object.values(), Object.entries()
        results += 'Keys: ' + Object.keys(person).join(', ') + '\n';
        results += 'Values: ' + Object.values(person).join(', ') + '\n\n';

        // Object destructuring
        const { name, age, city } = person;
        results += 'Destructured - Name: ' + name + ', Age: ' + age + ', City: ' + city + '\n\n';

        // Object spread operator
        const updatedPerson = { ...person, age: 31, email: 'john@example.com' };
        results += 'Updated with spread:\n' + JSON.stringify(updatedPerson, null, 2);

        objectResults.textContent = results;
    });
}

// ========== LOOPS ==========

function initLoopDemo() {
    const loopDemoBtn = document.getElementById('loopDemo');
    const loopResults = document.getElementById('loopResults');

    loopDemoBtn.addEventListener('click', function () {
        const numbers = [1, 2, 3, 4, 5];
        const person = { name: 'Alice', age: 25, city: 'Boston' };
        let results = '';

        // Traditional for loop
        results += 'Traditional for loop:\n';
        for (let i = 0; i < numbers.length; i++) {
            results += `Index ${i}: ${numbers[i]}\n`;
        }
        results += '\n';

        // for...of loop (for arrays)
        results += 'for...of loop (arrays):\n';
        for (const number of numbers) {
            results += `Value: ${number}\n`;
        }
        results += '\n';

        // for...in loop (for objects)
        results += 'for...in loop (objects):\n';
        for (const key in person) {
            results += `${key}: ${person[key]}\n`;
        }
        results += '\n';

        // forEach method
        results += 'forEach method:\n';
        numbers.forEach((num, index) => {
            results += `Index ${index}: ${num * 2}\n`;
        });

        loopResults.textContent = results;
    });
}

// ========== DOM MANIPULATION ==========

function initDOMManipulation() {
    const addItemBtn = document.getElementById('addItem');
    const removeItemBtn = document.getElementById('removeItem');
    const clearAllBtn = document.getElementById('clearAll');
    const dynamicList = document.getElementById('dynamicList');

    let itemCount = 0;

    addItemBtn.addEventListener('click', function () {
        itemCount++;
        const listItem = document.createElement('li');
        listItem.textContent = `Dynamic Item ${itemCount}`;
        listItem.setAttribute('data-id', itemCount);

        // Add click event to individual items
        listItem.addEventListener('click', function () {
            this.style.backgroundColor = '#bee3f8';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 1000);
        });

        dynamicList.appendChild(listItem);
    });

    removeItemBtn.addEventListener('click', function () {
        const lastItem = dynamicList.lastElementChild;
        if (lastItem) {
            lastItem.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                dynamicList.removeChild(lastItem);
            }, 300);
        }
    });

    clearAllBtn.addEventListener('click', function () {
        while (dynamicList.firstChild) {
            dynamicList.removeChild(dynamicList.firstChild);
        }
        itemCount = 0;
    });
}

// ========== EVENT HANDLING ==========

function initEventHandling() {
    const eventContainer = document.getElementById('eventContainer');
    const addEventBtn = document.getElementById('addEventBtn');
    const eventResults = document.getElementById('eventResults');

    let buttonCount = 3;

    // Event delegation - handle clicks on any button in the container
    eventContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('event-btn')) {
            const buttonText = event.target.textContent;
            eventResults.textContent = `Clicked: ${buttonText} at ${new Date().toLocaleTimeString()}`;

            // Visual feedback
            event.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.style.transform = '';
            }, 150);
        }
    });

    // Add new buttons dynamically
    addEventBtn.addEventListener('click', function () {
        buttonCount++;
        const newButton = document.createElement('button');
        newButton.textContent = `Button ${buttonCount}`;
        newButton.className = 'event-btn';
        eventContainer.appendChild(newButton);
    });
}

// ========== ERROR HANDLING ==========

function initErrorHandling() {
    const errorDemoBtn = document.getElementById('errorDemo');
    const errorResults = document.getElementById('errorResults');

    errorDemoBtn.addEventListener('click', function () {
        let results = '';

        // Try-catch example
        try {
            results += 'Testing error handling...\n\n';

            // This will work
            const validJSON = JSON.parse('{"name": "John", "age": 30}');
            results += 'Valid JSON parsed: ' + validJSON.name + '\n\n';

            // This will throw an error
            const invalidJSON = JSON.parse('invalid json string');
            results += 'This line will not execute\n';

        } catch (error) {
            results += 'Caught error: ' + error.message + '\n\n';
        } finally {
            results += 'Finally block always executes\n\n';
        }

        // Custom error handling
        try {
            validateAge(-5);
        } catch (error) {
            results += 'Custom error: ' + error.message + '\n';
        }

        errorResults.textContent = results;
    });
}

// Custom validation function
function validateAge(age) {
    if (age < 0) {
        throw new Error('Age cannot be negative');
    }
    if (age > 150) {
        throw new Error('Age seems unrealistic');
    }
    return true;
}

// ========== ASYNCHRONOUS JAVASCRIPT ==========

function initAsyncDemo() {
    const promiseDemoBtn = document.getElementById('promiseDemo');
    const asyncDemoBtn = document.getElementById('asyncDemo');
    const asyncResults = document.getElementById('asyncResults');

    promiseDemoBtn.addEventListener('click', function () {
        asyncResults.textContent = 'Loading promise demo...';

        // Promise example
        fetchUserData()
            .then(user => {
                asyncResults.textContent = `Promise resolved: Welcome ${user.name}!`;
            })
            .catch(error => {
                asyncResults.textContent = `Promise rejected: ${error.message}`;
            });
    });

    asyncDemoBtn.addEventListener('click', async function () {
        asyncResults.textContent = 'Loading async/await demo...';

        try {
            const user = await fetchUserData();
            const posts = await fetchUserPosts(user.id);
            asyncResults.textContent = `Async/await: ${user.name} has ${posts.length} posts`;
        } catch (error) {
            asyncResults.textContent = `Async error: ${error.message}`;
        }
    });
}

// Simulated async functions
function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve({ id: 1, name: 'Alice Johnson' });
            } else {
                reject(new Error('Failed to fetch user data'));
            }
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const posts = [
                { id: 1, title: 'First Post' },
                { id: 2, title: 'Second Post' },
                { id: 3, title: 'Third Post' }
            ];
            resolve(posts);
        }, 500);
    });
}

// ========== LOCAL STORAGE ==========

function initLocalStorage() {
    const storageInput = document.getElementById('storageInput');
    const saveDataBtn = document.getElementById('saveData');
    const loadDataBtn = document.getElementById('loadData');
    const clearStorageBtn = document.getElementById('clearStorage');
    const storageResults = document.getElementById('storageResults');

    const STORAGE_KEY = 'webdev_learning_data';

    saveDataBtn.addEventListener('click', function () {
        const data = storageInput.value;
        if (data.trim()) {
            // Save to localStorage
            localStorage.setItem(STORAGE_KEY, data);
            storageResults.textContent = `Data saved: "${data}"`;
            storageResults.className = 'results success';
        } else {
            storageResults.textContent = 'Please enter some data to save';
            storageResults.className = 'results error';
        }
    });

    loadDataBtn.addEventListener('click', function () {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            storageInput.value = data;
            storageResults.textContent = `Data loaded: "${data}"`;
            storageResults.className = 'results success';
        } else {
            storageResults.textContent = 'No data found in storage';
            storageResults.className = 'results error';
        }
    });

    clearStorageBtn.addEventListener('click', function () {
        localStorage.removeItem(STORAGE_KEY);
        storageInput.value = '';
        storageResults.textContent = 'Storage cleared';
        storageResults.className = 'results';
    });

    // Load data on page load
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        storageInput.value = savedData;
    }
}

// ========== FORM VALIDATION ==========

function initFormValidation() {
    const form = document.getElementById('advancedForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Real-time validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // Form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            clearErrors();
        }
    });

    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            return false;
        }

        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.classList.add('error');
            return false;
        }

        emailError.textContent = '';
        emailInput.classList.remove('error');
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;

        if (!password) {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            return false;
        }

        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordInput.classList.add('error');
            return false;
        }

        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        return true;
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!confirmPassword) {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordInput.classList.add('error');
            return false;
        }

        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('error');
            return false;
        }

        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('error');
        return true;
    }

    function clearErrors() {
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
        confirmPasswordInput.classList.remove('error');
    }
}

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }
    
    .error {
        border-color: #e53e3e !important;
    }
`;
document.head.appendChild(style);
