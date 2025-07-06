// JavaScript Advanced - Modern ES6+ Features and Patterns
// This file demonstrates advanced JavaScript concepts and techniques

// ========== MODULE IMPORTS AND SETUP ==========
console.log('🚀 JavaScript Advanced Examples Loading...');

// Global state for demos
let globalState = {
    counter: null,
    observers: [],
    stateManager: null,
    eventSystem: null,
    testFramework: null,
    memoryLeaks: []
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Loaded - Initializing Advanced JavaScript Demos');
    initializeAllDemos();
    setupGlobalErrorHandling();
    logPerformanceMetrics();
});

// Initialize all demo functionalities
function initializeAllDemos() {
    initES6Demos();
    initAsyncDemos();
    initPatternDemos();
    initPerformanceDemos();
    initStateManagement();
    initErrorHandling();
    initTestingFramework();
}

// ========== ES6+ MODERN FEATURES ==========

function initES6Demos() {
    // Arrow Functions & Destructuring Demo
    document.getElementById('arrowFunctionsDemo').addEventListener('click', () => {
        const results = document.getElementById('es6Results');

        // Arrow function examples
        const numbers = [1, 2, 3, 4, 5];

        // Traditional function vs arrow function
        const traditional = numbers.map(function (n) { return n * 2; });
        const arrow = numbers.map(n => n * 2);

        // Advanced arrow functions
        const complexOperation = numbers
            .filter(n => n % 2 === 0)
            .map(n => ({ value: n, squared: n ** 2 }))
            .reduce((acc, curr) => acc + curr.squared, 0);

        results.textContent = `Traditional: [${traditional.join(', ')}]
Arrow: [${arrow.join(', ')}]
Complex operation result: ${complexOperation}`;
        results.className = 'results-display success';
    });

    // Destructuring Demo
    document.getElementById('destructuringDemo').addEventListener('click', () => {
        const results = document.getElementById('es6Results');

        // Object destructuring
        const user = {
            name: 'Alice',
            age: 30,
            email: 'alice@example.com',
            address: { city: 'New York', country: 'USA' }
        };

        const { name, age, address: { city } } = user;

        // Array destructuring
        const colors = ['red', 'green', 'blue', 'yellow'];
        const [primary, secondary, ...others] = colors;

        // Function parameter destructuring
        const createUserProfile = ({ name, age, email = 'No email' }) => {
            return `Profile: ${name}, ${age} years old, ${email}`;
        };

        const profile = createUserProfile(user);

        results.textContent = `Destructured: ${name}, ${age}, ${city}
Array: primary=${primary}, secondary=${secondary}, others=[${others.join(', ')}]
${profile}`;
        results.className = 'results-display success';
    });

    // Template Literals Demo
    document.getElementById('templateLiteralsDemo').addEventListener('click', () => {
        const nameInput = document.getElementById('nameInput');
        const ageInput = document.getElementById('ageInput');
        const results = document.getElementById('templateResults');

        const name = nameInput.value || 'Anonymous';
        const age = parseInt(ageInput.value) || 0;

        // Tagged template literal
        function highlight(strings, ...values) {
            return strings.reduce((result, string, i) => {
                const value = values[i] ? `<strong>${values[i]}</strong>` : '';
                return result + string + value;
            }, '');
        }

        // Multi-line template with expressions
        const template = `Hello ${name}!
You are ${age} years old.
${age >= 18 ? 'You are an adult.' : 'You are a minor.'}
Your birth year is approximately ${new Date().getFullYear() - age}.`;

        const tagged = highlight`User: ${name}, Age: ${age}`;

        results.innerHTML = `${template}\n\nTagged template: ${tagged}`;
        results.className = 'results-display success';
    });

    // Spread & Rest Operators Demo
    document.getElementById('spreadRestDemo').addEventListener('click', () => {
        const results = document.getElementById('spreadResults');

        // Rest parameters
        const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
        const multiply = (factor, ...values) => values.map(v => v * factor);

        // Spread operator with arrays
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const combined = [...arr1, ...arr2];
        const cloned = [...arr1];

        // Spread operator with objects
        const baseUser = { name: 'John', age: 25 };
        const extendedUser = { ...baseUser, email: 'john@example.com', age: 26 };

        // Function spreading
        const numbers = [1, 2, 3, 4, 5];
        const maxValue = Math.max(...numbers);

        results.textContent = `Sum of 1,2,3,4,5: ${sum(1, 2, 3, 4, 5)}
Multiply by 2: [${multiply(2, 1, 2, 3).join(', ')}]
Combined arrays: [${combined.join(', ')}]
Max value: ${maxValue}
Extended user: ${JSON.stringify(extendedUser, null, 2)}`;
        results.className = 'results-display success';
    });
}

// ========== ASYNCHRONOUS PROGRAMMING ==========

function initAsyncDemos() {
    // Fetch API Demo
    document.getElementById('fetchUsersBtn').addEventListener('click', async () => {
        const results = document.getElementById('fetchResults');
        const loading = document.getElementById('loadingIndicator');

        try {
            loading.style.display = 'flex';
            results.textContent = '';

            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            const userList = users.slice(0, 3).map(user =>
                `${user.name} (${user.email}) - ${user.company.name}`
            ).join('\n');

            results.textContent = `Fetched ${users.length} users:\n\n${userList}`;
            results.className = 'results-display success';

        } catch (error) {
            results.textContent = `Error: ${error.message}`;
            results.className = 'results-display error';
        } finally {
            loading.style.display = 'none';
        }
    });

    document.getElementById('fetchPostsBtn').addEventListener('click', async () => {
        const results = document.getElementById('fetchResults');
        const loading = document.getElementById('loadingIndicator');

        try {
            loading.style.display = 'flex';

            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
            const posts = await response.json();

            const postList = posts.map(post =>
                `${post.title}\n${post.body.substring(0, 100)}...`
            ).join('\n\n');

            results.textContent = `Latest posts:\n\n${postList}`;
            results.className = 'results-display success';

        } catch (error) {
            results.textContent = `Error: ${error.message}`;
            results.className = 'results-display error';
        } finally {
            loading.style.display = 'none';
        }
    });

    document.getElementById('fetchErrorBtn').addEventListener('click', async () => {
        const results = document.getElementById('fetchResults');
        const loading = document.getElementById('loadingIndicator');

        try {
            loading.style.display = 'flex';

            // Intentionally trigger an error
            const response = await fetch('https://nonexistent-api.example.com/data');
            const data = await response.json();

        } catch (error) {
            results.textContent = `Caught error: ${error.message}\n\nThis demonstrates proper error handling in async functions.`;
            results.className = 'results-display warning';
        } finally {
            loading.style.display = 'none';
        }
    });

    // Promise Chain vs Async/Await Demo
    document.getElementById('promiseChainBtn').addEventListener('click', () => {
        const results = document.getElementById('asyncResults');
        const startTime = performance.now();

        // Promise chain approach
        simulateAsyncOperation(1000, 'First')
            .then(result => {
                console.log(result);
                return simulateAsyncOperation(500, 'Second');
            })
            .then(result => {
                console.log(result);
                return simulateAsyncOperation(300, 'Third');
            })
            .then(result => {
                const endTime = performance.now();
                results.textContent = `Promise chain completed!
Final result: ${result}
Total time: ${Math.round(endTime - startTime)}ms
Check console for detailed logs.`;
                results.className = 'results-display success';
            })
            .catch(error => {
                results.textContent = `Error in promise chain: ${error.message}`;
                results.className = 'results-display error';
            });
    });

    document.getElementById('asyncAwaitBtn').addEventListener('click', async () => {
        const results = document.getElementById('asyncResults');
        const startTime = performance.now();

        try {
            // Async/await approach
            const first = await simulateAsyncOperation(1000, 'First');
            console.log(first);

            const second = await simulateAsyncOperation(500, 'Second');
            console.log(second);

            const third = await simulateAsyncOperation(300, 'Third');
            console.log(third);

            const endTime = performance.now();
            results.textContent = `Async/await completed!
Final result: ${third}
Total time: ${Math.round(endTime - startTime)}ms
Check console for detailed logs.`;
            results.className = 'results-display success';

        } catch (error) {
            results.textContent = `Error in async/await: ${error.message}`;
            results.className = 'results-display error';
        }
    });

    document.getElementById('parallelAsyncBtn').addEventListener('click', async () => {
        const results = document.getElementById('asyncResults');
        const startTime = performance.now();

        try {
            // Parallel execution with Promise.all
            const promises = [
                simulateAsyncOperation(1000, 'Task A'),
                simulateAsyncOperation(800, 'Task B'),
                simulateAsyncOperation(600, 'Task C')
            ];

            const allResults = await Promise.all(promises);
            const endTime = performance.now();

            results.textContent = `Parallel execution completed!
Results: ${allResults.join(', ')}
Total time: ${Math.round(endTime - startTime)}ms
(Much faster than sequential!)`;
            results.className = 'results-display success';

        } catch (error) {
            results.textContent = `Error in parallel execution: ${error.message}`;
            results.className = 'results-display error';
        }
    });

    // Web Workers Demo
    document.getElementById('mainThreadBtn').addEventListener('click', () => {
        const input = document.getElementById('workerInput');
        const results = document.getElementById('workerResults');
        const n = parseInt(input.value) || 40;

        const startTime = performance.now();

        // CPU-intensive task on main thread (blocks UI)
        const result = fibonacci(n);
        const endTime = performance.now();

        results.textContent = `Main Thread Result:
Fibonacci(${n}) = ${result}
Time: ${Math.round(endTime - startTime)}ms
(UI was blocked during calculation)`;
        results.className = 'results-display warning';
    });

    document.getElementById('webWorkerBtn').addEventListener('click', () => {
        const input = document.getElementById('workerInput');
        const results = document.getElementById('workerResults');
        const n = parseInt(input.value) || 40;

        // Create a Web Worker inline
        const workerCode = `
            function fibonacci(n) {
                if (n <= 1) return n;
                return fibonacci(n - 1) + fibonacci(n - 2);
            }
            
            self.onmessage = function(e) {
                const n = e.data;
                const startTime = performance.now();
                const result = fibonacci(n);
                const endTime = performance.now();
                
                self.postMessage({
                    result: result,
                    time: endTime - startTime
                });
            };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));

        const startTime = performance.now();
        results.textContent = 'Calculating in Web Worker... (UI remains responsive)';
        results.className = 'results-display';

        worker.postMessage(n);

        worker.onmessage = function (e) {
            const { result, time } = e.data;
            const totalTime = performance.now() - startTime;

            results.textContent = `Web Worker Result:
Fibonacci(${n}) = ${result}
Calculation time: ${Math.round(time)}ms
Total time: ${Math.round(totalTime)}ms
(UI remained responsive!)`;
            results.className = 'results-display success';

            worker.terminate();
            URL.revokeObjectURL(blob);
        };

        worker.onerror = function (error) {
            results.textContent = `Worker error: ${error.message}`;
            results.className = 'results-display error';
        };
    });
}

// ========== ADVANCED PATTERNS ==========

function initPatternDemos() {
    // Module Pattern with Closures
    document.getElementById('createCounterBtn').addEventListener('click', () => {
        const results = document.getElementById('moduleResults');

        // Module pattern implementation
        globalState.counter = createCounter();

        // Enable other buttons
        document.getElementById('incrementBtn').disabled = false;
        document.getElementById('decrementBtn').disabled = false;
        document.getElementById('getValueBtn').disabled = false;

        results.textContent = 'Counter module created! Use the buttons to interact with it.';
        results.className = 'results-display success';
    });

    document.getElementById('incrementBtn').addEventListener('click', () => {
        const results = document.getElementById('moduleResults');
        if (globalState.counter) {
            globalState.counter.increment();
            results.textContent = `Counter incremented. Current value: ${globalState.counter.getValue()}`;
            results.className = 'results-display success';
        }
    });

    document.getElementById('decrementBtn').addEventListener('click', () => {
        const results = document.getElementById('moduleResults');
        if (globalState.counter) {
            globalState.counter.decrement();
            results.textContent = `Counter decremented. Current value: ${globalState.counter.getValue()}`;
            results.className = 'results-display success';
        }
    });

    document.getElementById('getValueBtn').addEventListener('click', () => {
        const results = document.getElementById('moduleResults');
        if (globalState.counter) {
            results.textContent = `Current counter value: ${globalState.counter.getValue()}`;
            results.className = 'results-display';
        }
    });

    // Observer Pattern Demo
    let observerCount = 0;

    document.getElementById('addObserverBtn').addEventListener('click', () => {
        const results = document.getElementById('observerResults');
        observerCount++;

        const observer = {
            id: observerCount,
            update: (data) => {
                console.log(`Observer ${observer.id} received:`, data);
                results.textContent += `Observer ${observer.id}: ${JSON.stringify(data)}\n`;
            }
        };

        globalState.observers.push(observer);
        results.textContent = `Added Observer ${observerCount}. Total observers: ${globalState.observers.length}`;
        results.className = 'results-display success';
    });

    document.getElementById('notifyObserversBtn').addEventListener('click', () => {
        const results = document.getElementById('observerResults');

        if (globalState.observers.length === 0) {
            results.textContent = 'No observers to notify. Add some observers first.';
            results.className = 'results-display warning';
            return;
        }

        const data = {
            timestamp: new Date().toISOString(),
            event: 'button_clicked',
            value: Math.random()
        };

        results.textContent = `Notifying ${globalState.observers.length} observers:\n`;
        globalState.observers.forEach(observer => observer.update(data));
        results.className = 'results-display success';
    });

    document.getElementById('removeObserverBtn').addEventListener('click', () => {
        const results = document.getElementById('observerResults');

        if (globalState.observers.length > 0) {
            const removed = globalState.observers.pop();
            results.textContent = `Removed Observer ${removed.id}. Remaining: ${globalState.observers.length}`;
            results.className = 'results-display';
        } else {
            results.textContent = 'No observers to remove.';
            results.className = 'results-display warning';
        }
    });

    // Proxy & Reflection Demo
    let proxyTarget = {};
    const proxyHandler = {
        get(target, property) {
            console.log(`Getting property: ${property}`);
            return target[property];
        },
        set(target, property, value) {
            console.log(`Setting property: ${property} = ${value}`);
            target[property] = value;
            return true;
        },
        has(target, property) {
            console.log(`Checking if property exists: ${property}`);
            return property in target;
        }
    };

    const proxiedObject = new Proxy(proxyTarget, proxyHandler);

    document.getElementById('setProxyBtn').addEventListener('click', () => {
        const keyInput = document.getElementById('proxyKey');
        const valueInput = document.getElementById('proxyValue');
        const results = document.getElementById('proxyResults');

        const key = keyInput.value || 'defaultKey';
        const value = valueInput.value || 'defaultValue';

        proxiedObject[key] = value;

        results.textContent = `Set ${key} = ${value}
All properties: ${JSON.stringify(proxyTarget, null, 2)}
Check console for proxy logs.`;
        results.className = 'results-display success';
    });

    document.getElementById('getProxyBtn').addEventListener('click', () => {
        const results = document.getElementById('proxyResults');

        const keys = Object.keys(proxyTarget);
        const properties = keys.map(key => `${key}: ${proxiedObject[key]}`).join('\n');

        results.textContent = `Object properties:\n${properties || 'No properties set'}
Object methods available: ${Object.getOwnPropertyNames(Object.prototype).slice(0, 5).join(', ')}...`;
        results.className = 'results-display';
    });
}

// ========== PERFORMANCE & OPTIMIZATION ==========

function initPerformanceDemos() {
    // Debouncing Demo
    const debouncedFunction = debounce((value) => {
        const results = document.getElementById('performanceResults');
        results.textContent += `Debounced function called with: "${value}" at ${new Date().toLocaleTimeString()}\n`;
    }, 500);

    document.getElementById('debounceInput').addEventListener('input', (e) => {
        debouncedFunction(e.target.value);
    });

    // Throttling Demo
    let throttleCount = 0;
    const throttledFunction = throttle(() => {
        const results = document.getElementById('performanceResults');
        throttleCount++;
        results.textContent += `Throttled function called ${throttleCount} times at ${new Date().toLocaleTimeString()}\n`;
    }, 1000);

    document.getElementById('throttleBtn').addEventListener('click', throttledFunction);

    // Memory Management Demo
    document.getElementById('createLeakBtn').addEventListener('click', () => {
        const results = document.getElementById('memoryResults');

        // Intentionally create memory leaks for demonstration
        const bigArray = new Array(1000000).fill('memory leak data');
        const leakyObject = {
            data: bigArray,
            circularRef: null
        };
        leakyObject.circularRef = leakyObject; // Circular reference

        globalState.memoryLeaks.push(leakyObject);

        results.textContent = `Created memory leak ${globalState.memoryLeaks.length}
Total leaks: ${globalState.memoryLeaks.length}
⚠️ This is for demonstration only!`;
        results.className = 'results-display warning';
    });

    document.getElementById('cleanupBtn').addEventListener('click', () => {
        const results = document.getElementById('memoryResults');

        // Clean up memory leaks
        globalState.memoryLeaks.forEach(leak => {
            leak.circularRef = null; // Break circular reference
            leak.data = null; // Clear large data
        });
        globalState.memoryLeaks = [];

        // Suggest garbage collection (if available)
        if (window.gc) {
            window.gc();
        }

        results.textContent = `Memory cleaned up!
Circular references broken.
Large arrays cleared.
Garbage collection suggested.`;
        results.className = 'results-display success';
    });

    document.getElementById('checkMemoryBtn').addEventListener('click', () => {
        const results = document.getElementById('memoryResults');

        if ('performance' in window && 'memory' in performance) {
            const memory = performance.memory;
            results.textContent = `Memory Usage:
Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB
Total: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB
Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB
Active leaks: ${globalState.memoryLeaks.length}`;
        } else {
            results.textContent = `Memory API not available in this browser.
Active leaks: ${globalState.memoryLeaks.length}
Use Chrome DevTools Memory tab for detailed analysis.`;
        }
        results.className = 'results-display';
    });

    // Intersection Observer Demo
    document.getElementById('createObserverBtn').addEventListener('click', () => {
        const results = document.getElementById('intersectionResults');
        const targets = document.querySelectorAll('.observe-target');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target;
                const id = target.getAttribute('data-id');

                if (entry.isIntersecting) {
                    target.classList.add('visible');
                    results.textContent += `Target ${id} entered viewport\n`;
                } else {
                    target.classList.remove('visible');
                    results.textContent += `Target ${id} left viewport\n`;
                }
            });
        }, { threshold: 0.5 });

        targets.forEach(target => observer.observe(target));

        results.textContent = 'Intersection Observer created! Scroll the container to see targets enter/leave viewport.\n';
        results.className = 'results-display success';
    });
}

// ========== STATE MANAGEMENT ==========

function initStateManagement() {
    // Custom State Manager
    globalState.stateManager = createStateManager();

    document.getElementById('updateUserBtn').addEventListener('click', () => {
        const nameInput = document.getElementById('userNameInput');
        const emailInput = document.getElementById('userEmailInput');
        const results = document.getElementById('stateResults');

        const userData = {
            name: nameInput.value || 'Anonymous',
            email: emailInput.value || 'no-email@example.com',
            lastUpdated: new Date().toISOString()
        };

        globalState.stateManager.setState('user', userData);

        results.textContent = `User state updated:
${JSON.stringify(userData, null, 2)}`;
        results.className = 'results-display success';
    });

    document.getElementById('getStateBtn').addEventListener('click', () => {
        const results = document.getElementById('stateResults');
        const allState = globalState.stateManager.getState();

        results.textContent = `Current state:
${JSON.stringify(allState, null, 2)}`;
        results.className = 'results-display';
    });

    document.getElementById('subscribeBtn').addEventListener('click', () => {
        const results = document.getElementById('stateResults');

        globalState.stateManager.subscribe('user', (newUserData) => {
            results.textContent += `\n🔔 State change detected:
${JSON.stringify(newUserData, null, 2)}`;
        });

        results.textContent += '\n✅ Subscribed to user state changes!';
        results.className = 'results-display success';
    });

    // Advanced LocalStorage Manager
    document.getElementById('saveStorageBtn').addEventListener('click', () => {
        const keyInput = document.getElementById('storageKey');
        const dataInput = document.getElementById('storageData');
        const results = document.getElementById('storageResults');

        try {
            const key = keyInput.value || 'defaultKey';
            const data = JSON.parse(dataInput.value || '{}');

            const storageData = {
                data: data,
                timestamp: Date.now(),
                version: '1.0'
            };

            localStorage.setItem(key, JSON.stringify(storageData));

            results.textContent = `Data saved to localStorage:
Key: ${key}
Data: ${JSON.stringify(storageData, null, 2)}`;
            results.className = 'results-display success';

        } catch (error) {
            results.textContent = `Error saving data: ${error.message}`;
            results.className = 'results-display error';
        }
    });

    document.getElementById('loadStorageBtn').addEventListener('click', () => {
        const keyInput = document.getElementById('storageKey');
        const results = document.getElementById('storageResults');

        try {
            const key = keyInput.value || 'defaultKey';
            const stored = localStorage.getItem(key);

            if (stored) {
                const data = JSON.parse(stored);
                const age = Date.now() - data.timestamp;

                results.textContent = `Data loaded from localStorage:
Key: ${key}
Age: ${Math.round(age / 1000)} seconds
Data: ${JSON.stringify(data, null, 2)}`;
                results.className = 'results-display success';
            } else {
                results.textContent = `No data found for key: ${key}`;
                results.className = 'results-display warning';
            }

        } catch (error) {
            results.textContent = `Error loading data: ${error.message}`;
            results.className = 'results-display error';
        }
    });

    document.getElementById('clearStorageBtn').addEventListener('click', () => {
        const keyInput = document.getElementById('storageKey');
        const results = document.getElementById('storageResults');

        const key = keyInput.value || 'defaultKey';
        localStorage.removeItem(key);

        results.textContent = `Cleared data for key: ${key}`;
        results.className = 'results-display';
    });

    // Custom Event System
    globalState.eventSystem = createEventSystem();

    document.getElementById('emitEventBtn').addEventListener('click', () => {
        const typeInput = document.getElementById('eventType');
        const dataInput = document.getElementById('eventData');
        const results = document.getElementById('eventResults');

        try {
            const eventType = typeInput.value || 'defaultEvent';
            const eventData = JSON.parse(dataInput.value || '{}');

            globalState.eventSystem.emit(eventType, eventData);

            results.textContent += `\n📤 Event emitted:
Type: ${eventType}
Data: ${JSON.stringify(eventData, null, 2)}`;
            results.className = 'results-display success';

        } catch (error) {
            results.textContent = `Error emitting event: ${error.message}`;
            results.className = 'results-display error';
        }
    });

    document.getElementById('listenEventBtn').addEventListener('click', () => {
        const typeInput = document.getElementById('eventType');
        const results = document.getElementById('eventResults');

        const eventType = typeInput.value || 'defaultEvent';

        globalState.eventSystem.on(eventType, (data) => {
            results.textContent += `\n📥 Event received:
Type: ${eventType}
Data: ${JSON.stringify(data, null, 2)}
Time: ${new Date().toLocaleTimeString()}`;
        });

        results.textContent += `\n👂 Listening for '${eventType}' events`;
        results.className = 'results-display success';
    });
}

// ========== ERROR HANDLING & TESTING ==========

function initErrorHandling() {
    document.getElementById('customErrorBtn').addEventListener('click', () => {
        const results = document.getElementById('errorResults');

        try {
            // Custom error class
            class ValidationError extends Error {
                constructor(message, field) {
                    super(message);
                    this.name = 'ValidationError';
                    this.field = field;
                }
            }

            throw new ValidationError('Invalid email format', 'email');

        } catch (error) {
            if (error instanceof ValidationError) {
                results.textContent = `Custom Error Caught:
Type: ${error.name}
Field: ${error.field}
Message: ${error.message}
Stack: ${error.stack.split('\n')[0]}`;
            } else {
                results.textContent = `Unexpected error: ${error.message}`;
            }
            results.className = 'results-display warning';
        }
    });

    document.getElementById('asyncErrorBtn').addEventListener('click', async () => {
        const results = document.getElementById('errorResults');

        try {
            await asyncErrorDemo();
        } catch (error) {
            results.textContent = `Async Error Caught:
Message: ${error.message}
Type: ${error.constructor.name}
Async operation failed gracefully.`;
            results.className = 'results-display warning';
        }
    });

    document.getElementById('errorBoundaryBtn').addEventListener('click', () => {
        const results = document.getElementById('errorResults');

        // Simulate error boundary concept
        const errorBoundary = {
            componentDidCatch(error, errorInfo) {
                console.error('Error boundary caught:', error, errorInfo);
                results.textContent = `Error Boundary Activated:
Error: ${error.message}
Component Stack: Simulated React component
Fallback UI would be shown to user.`;
                results.className = 'results-display warning';
            }
        };

        try {
            // Simulate component error
            throw new Error('Component render failed');
        } catch (error) {
            errorBoundary.componentDidCatch(error, { componentStack: 'at App > Header > Navigation' });
        }
    });
}

function initTestingFramework() {
    globalState.testFramework = createMiniTestFramework();

    // Add some default tests
    globalState.testFramework.test('Array methods work correctly', () => {
        const arr = [1, 2, 3];
        globalState.testFramework.assert(arr.length === 3, 'Array should have 3 elements');
        globalState.testFramework.assert(arr.includes(2), 'Array should contain 2');
        globalState.testFramework.assert(arr.map(x => x * 2).join(',') === '2,4,6', 'Map should double values');
    });

    globalState.testFramework.test('Object operations work', () => {
        const obj = { a: 1, b: 2 };
        globalState.testFramework.assert(Object.keys(obj).length === 2, 'Object should have 2 keys');
        globalState.testFramework.assert(obj.a === 1, 'Property a should equal 1');
    });

    document.getElementById('runTestsBtn').addEventListener('click', () => {
        const results = document.getElementById('testResults');
        const testResults = globalState.testFramework.run();

        results.textContent = `Test Results:
${testResults.summary}
${testResults.details}`;
        results.className = testResults.passed ? 'results-display success' : 'results-display error';
    });

    document.getElementById('addTestBtn').addEventListener('click', () => {
        const results = document.getElementById('testResults');

        // Add a dynamic test
        const testName = `Dynamic test ${Date.now()}`;
        globalState.testFramework.test(testName, () => {
            const random = Math.random();
            globalState.testFramework.assert(random >= 0, 'Random should be >= 0');
            globalState.testFramework.assert(random < 1, 'Random should be < 1');
        });

        results.textContent += `\n✅ Added test: ${testName}`;
        results.className = 'results-display success';
    });

    // Performance Monitoring
    document.getElementById('measurePerformanceBtn').addEventListener('click', () => {
        const results = document.getElementById('perfResults');

        // Measure performance of different operations
        const measurements = {};

        // Array operations
        performance.mark('array-start');
        const bigArray = new Array(100000).fill(0).map((_, i) => i);
        const filtered = bigArray.filter(x => x % 2 === 0);
        const mapped = filtered.map(x => x * 2);
        performance.mark('array-end');
        performance.measure('array-operations', 'array-start', 'array-end');
        measurements.arrayOps = performance.getEntriesByName('array-operations')[0].duration;

        // Object operations
        performance.mark('object-start');
        const bigObject = {};
        for (let i = 0; i < 10000; i++) {
            bigObject[`key${i}`] = i;
        }
        const keys = Object.keys(bigObject);
        const values = Object.values(bigObject);
        performance.mark('object-end');
        performance.measure('object-operations', 'object-start', 'object-end');
        measurements.objectOps = performance.getEntriesByName('object-operations')[0].duration;

        results.textContent = `Performance Measurements:
Array operations (100k items): ${measurements.arrayOps.toFixed(2)}ms
Object operations (10k props): ${measurements.objectOps.toFixed(2)}ms
Filtered ${filtered.length} even numbers
Created ${keys.length} object keys`;
        results.className = 'results-display success';
    });

    document.getElementById('profileFunctionBtn').addEventListener('click', () => {
        const results = document.getElementById('perfResults');

        // Profile a function
        const profiledFunction = profileFunction(function expensiveOperation() {
            let result = 0;
            for (let i = 0; i < 1000000; i++) {
                result += Math.sqrt(i);
            }
            return result;
        });

        const result = profiledFunction();

        results.textContent = `Function Profiling:
Function: expensiveOperation
Result: ${result.toFixed(2)}
Execution time: ${profiledFunction.lastExecutionTime.toFixed(2)}ms
Call count: ${profiledFunction.callCount}
Average time: ${profiledFunction.averageTime.toFixed(2)}ms`;
        results.className = 'results-display success';
    });
}

// ========== UTILITY FUNCTIONS ==========

// Simulate async operation
function simulateAsyncOperation(delay, value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${value} completed after ${delay}ms`);
        }, delay);
    });
}

// Async error demo
async function asyncErrorDemo() {
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('Simulated async operation failure');
}

// Fibonacci function for Web Worker demo
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Debounce utility
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

// Throttle utility
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

// Counter module with closure
function createCounter() {
    let count = 0;

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getValue() {
            return count;
        }
    };
}

// State manager
function createStateManager() {
    let state = {};
    let subscribers = {};

    return {
        setState(key, value) {
            const oldValue = state[key];
            state[key] = value;

            if (subscribers[key]) {
                subscribers[key].forEach(callback => callback(value, oldValue));
            }
        },

        getState(key) {
            return key ? state[key] : { ...state };
        },

        subscribe(key, callback) {
            if (!subscribers[key]) {
                subscribers[key] = [];
            }
            subscribers[key].push(callback);

            return () => {
                const index = subscribers[key].indexOf(callback);
                if (index > -1) {
                    subscribers[key].splice(index, 1);
                }
            };
        }
    };
}

// Event system
function createEventSystem() {
    const events = {};

    return {
        on(event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(callback);
        },

        off(event, callback) {
            if (events[event]) {
                const index = events[event].indexOf(callback);
                if (index > -1) {
                    events[event].splice(index, 1);
                }
            }
        },

        emit(event, data) {
            if (events[event]) {
                events[event].forEach(callback => callback(data));
            }
        }
    };
}

// Mini testing framework
function createMiniTestFramework() {
    const tests = [];

    return {
        test(name, testFunction) {
            tests.push({ name, testFunction });
        },

        assert(condition, message) {
            if (!condition) {
                throw new Error(`Assertion failed: ${message}`);
            }
        },

        run() {
            let passed = 0;
            let failed = 0;
            let details = '';

            tests.forEach(test => {
                try {
                    test.testFunction();
                    passed++;
                    details += `✅ ${test.name}\n`;
                } catch (error) {
                    failed++;
                    details += `❌ ${test.name}: ${error.message}\n`;
                }
            });

            const total = passed + failed;
            const summary = `Tests: ${total}, Passed: ${passed}, Failed: ${failed}`;

            return {
                passed: failed === 0,
                summary,
                details,
                total,
                passedCount: passed,
                failedCount: failed
            };
        }
    };
}

// Function profiler
function profileFunction(func) {
    let callCount = 0;
    let totalTime = 0;

    const profiled = function (...args) {
        const start = performance.now();
        const result = func.apply(this, args);
        const end = performance.now();

        callCount++;
        const executionTime = end - start;
        totalTime += executionTime;

        profiled.lastExecutionTime = executionTime;
        profiled.callCount = callCount;
        profiled.totalTime = totalTime;
        profiled.averageTime = totalTime / callCount;

        return result;
    };

    profiled.lastExecutionTime = 0;
    profiled.callCount = 0;
    profiled.totalTime = 0;
    profiled.averageTime = 0;

    return profiled;
}

// Global error handling
function setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('Global error caught:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        event.preventDefault(); // Prevent default browser handling
    });
}

// Performance metrics logging
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    console.group('📊 Performance Metrics');
                    console.log(`DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
                    console.log(`Load Complete: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
                    console.log(`Total Load Time: ${navigation.loadEventEnd - navigation.fetchStart}ms`);
                    console.groupEnd();
                }
            }, 0);
        });
    }
}

console.log('✅ JavaScript Advanced Examples Fully Loaded!');
