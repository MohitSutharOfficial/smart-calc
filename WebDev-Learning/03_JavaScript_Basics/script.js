// JavaScript Basics - Complete Interactive Examples

// This code runs when the page loads
console.log("Welcome to JavaScript Basics! 🚀");

// Variables and Data Types Demo
function showVariables() {
    // Different types of variables
    let userName = "John Doe";              // String
    let userAge = 25;                       // Number
    let isStudent = true;                   // Boolean
    let hobbies = ["reading", "coding", "gaming"]; // Array
    let userInfo = {                        // Object
        name: "John",
        city: "New York",
        occupation: "Developer"
    };

    // Display variables in the output
    let output = document.getElementById("variablesOutput");
    output.innerHTML = `
        <h4>Variable Examples:</h4>
        <p><strong>String:</strong> ${userName}</p>
        <p><strong>Number:</strong> ${userAge}</p>
        <p><strong>Boolean:</strong> ${isStudent}</p>
        <p><strong>Array:</strong> [${hobbies.join(", ")}]</p>
        <p><strong>Object:</strong> Name: ${userInfo.name}, City: ${userInfo.city}</p>
        <p><strong>Variable Types:</strong></p>
        <ul>
            <li>typeof userName: ${typeof userName}</li>
            <li>typeof userAge: ${typeof userAge}</li>
            <li>typeof isStudent: ${typeof isStudent}</li>
            <li>typeof hobbies: ${typeof hobbies}</li>
        </ul>
    `;
    output.classList.add("slide-in");
}

// Function to greet user
function greetUser() {
    // Get the input value
    let nameInput = document.getElementById("nameInput");
    let name = nameInput.value;

    // Get current time for personalized greeting
    let currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    // Display greeting
    let output = document.getElementById("greetingOutput");
    if (name.trim() === "") {
        output.innerHTML = `<p class="error">Please enter your name!</p>`;
    } else {
        output.innerHTML = `<p class="success">${greeting}, ${name}! Welcome to JavaScript! 🎉</p>`;
    }

    // Clear the input
    nameInput.value = "";
}

// Event Listeners - Adding interactivity
document.addEventListener("DOMContentLoaded", function () {
    // Click event
    let clickBtn = document.getElementById("clickMeBtn");
    let clickCount = 0;

    clickBtn.addEventListener("click", function () {
        clickCount++;
        let output = document.getElementById("eventOutput");
        output.innerHTML = `<p>Button clicked ${clickCount} time(s)! 👆</p>`;

        // Change button color on each click
        let colors = ["#48bb78", "#ed8936", "#9f7aea", "#38b2ac", "#e53e3e"];
        clickBtn.style.background = colors[clickCount % colors.length];
    });

    // Hover event
    let hoverBtn = document.getElementById("hoverMeBtn");
    hoverBtn.addEventListener("mouseenter", function () {
        let output = document.getElementById("eventOutput");
        output.innerHTML = `<p>Mouse is hovering over the button! 🖱️</p>`;
        hoverBtn.style.transform = "scale(1.1)";
    });

    hoverBtn.addEventListener("mouseleave", function () {
        let output = document.getElementById("eventOutput");
        output.innerHTML = `<p>Mouse left the button! 👋</p>`;
        hoverBtn.style.transform = "scale(1)";
    });
});

// DOM Manipulation functions
let textColors = ["#e53e3e", "#38a169", "#3182ce", "#805ad5", "#d69e2e"];
let colorIndex = 0;

function changeText() {
    let element = document.getElementById("changableText");
    let newTexts = [
        "Text has been changed! ✨",
        "JavaScript is awesome! 🚀",
        "DOM manipulation is fun! 🎯",
        "You're learning quickly! 📚",
        "Keep practicing! 💪"
    ];

    let randomText = newTexts[Math.floor(Math.random() * newTexts.length)];
    element.textContent = randomText;
    element.style.fontSize = "1.2rem";
    element.style.fontWeight = "bold";
}

function changeColor() {
    let element = document.getElementById("changableText");
    element.style.color = textColors[colorIndex];
    colorIndex = (colorIndex + 1) % textColors.length;
    element.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
}

function resetText() {
    let element = document.getElementById("changableText");
    element.textContent = "This text can be changed!";
    element.style.color = "#333";
    element.style.fontSize = "1rem";
    element.style.fontWeight = "normal";
    element.style.textShadow = "none";
}

// Conditional Statements (if/else)
function checkAge() {
    let ageInput = document.getElementById("ageInput");
    let age = parseInt(ageInput.value);
    let output = document.getElementById("ageOutput");

    if (isNaN(age) || age < 0) {
        output.innerHTML = `<p class="error">Please enter a valid age!</p>`;
        return;
    }

    let category, message, emoji;

    if (age < 13) {
        category = "Child";
        message = "Enjoy your childhood!";
        emoji = "🧒";
    } else if (age < 20) {
        category = "Teenager";
        message = "Teen years are exciting!";
        emoji = "🧑";
    } else if (age < 65) {
        category = "Adult";
        message = "Adult life brings opportunities!";
        emoji = "👨‍💼";
    } else {
        category = "Senior";
        message = "Wisdom comes with age!";
        emoji = "👴";
    }

    output.innerHTML = `
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Category:</strong> ${category} ${emoji}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;

    ageInput.value = "";
}

// Calculator function
function calculate() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operation = document.getElementById("operation").value;
    let output = document.getElementById("calculatorResult");

    // Check if numbers are valid
    if (isNaN(num1) || isNaN(num2)) {
        output.innerHTML = `<p class="error">Please enter valid numbers!</p>`;
        return;
    }

    let result;
    let operationSymbol;

    switch (operation) {
        case "+":
            result = num1 + num2;
            operationSymbol = "+";
            break;
        case "-":
            result = num1 - num2;
            operationSymbol = "-";
            break;
        case "*":
            result = num1 * num2;
            operationSymbol = "×";
            break;
        case "/":
            if (num2 === 0) {
                output.innerHTML = `<p class="error">Cannot divide by zero!</p>`;
                return;
            }
            result = num1 / num2;
            operationSymbol = "÷";
            break;
        default:
            output.innerHTML = `<p class="error">Invalid operation!</p>`;
            return;
    }

    output.innerHTML = `
        <p><strong>Calculation:</strong> ${num1} ${operationSymbol} ${num2} = ${result}</p>
        <p><strong>Result:</strong> <span class="success">${result}</span></p>
    `;
}

// Dynamic Content Creation - Todo List
let todoCounter = 0;

function addTodo() {
    let todoInput = document.getElementById("todoInput");
    let todoText = todoInput.value.trim();
    let todoList = document.getElementById("todoList");

    if (todoText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create new list item
    todoCounter++;
    let listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${todoCounter}. ${todoText}</span>
        <button onclick="removeTodo(this)" style="float: right; padding: 0.25rem 0.5rem; font-size: 0.8rem;">❌</button>
    `;
    listItem.classList.add("slide-in");

    // Add click event to mark as completed
    listItem.addEventListener("click", function (e) {
        if (e.target.tagName !== "BUTTON") {
            this.style.textDecoration = this.style.textDecoration === "line-through" ? "none" : "line-through";
            this.style.opacity = this.style.opacity === "0.6" ? "1" : "0.6";
        }
    });

    todoList.appendChild(listItem);
    todoInput.value = "";
}

function removeTodo(button) {
    let listItem = button.parentElement;
    listItem.style.animation = "slideIn 0.3s reverse";
    setTimeout(() => {
        listItem.remove();
    }, 300);
}

function clearTodos() {
    let todoList = document.getElementById("todoList");
    if (todoList.children.length === 0) {
        alert("No tasks to clear!");
        return;
    }

    if (confirm("Are you sure you want to clear all tasks?")) {
        todoList.innerHTML = "";
        todoCounter = 0;
    }
}

// Date and Time functions
function showCurrentTime() {
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    let output = document.getElementById("dateTimeOutput");

    output.innerHTML = `
        <p><strong>Current Time:</strong> ${timeString} ⏰</p>
        <p><strong>Hours:</strong> ${now.getHours()}</p>
        <p><strong>Minutes:</strong> ${now.getMinutes()}</p>
        <p><strong>Seconds:</strong> ${now.getSeconds()}</p>
    `;
}

function showCurrentDate() {
    let now = new Date();
    let dateString = now.toLocaleDateString();
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    let output = document.getElementById("dateTimeOutput");

    output.innerHTML = `
        <p><strong>Current Date:</strong> ${dateString} 📅</p>
        <p><strong>Day:</strong> ${dayNames[now.getDay()]}</p>
        <p><strong>Month:</strong> ${monthNames[now.getMonth()]}</p>
        <p><strong>Year:</strong> ${now.getFullYear()}</p>
        <p><strong>Day of Month:</strong> ${now.getDate()}</p>
    `;
}

// Random Number Generator
function generateRandomNumber() {
    let minInput = document.getElementById("minNum");
    let maxInput = document.getElementById("maxNum");
    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);
    let output = document.getElementById("randomOutput");

    if (isNaN(min) || isNaN(max)) {
        output.innerHTML = `<p class="error">Please enter valid numbers!</p>`;
        return;
    }

    if (min >= max) {
        output.innerHTML = `<p class="error">Minimum should be less than maximum!</p>`;
        return;
    }

    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    output.innerHTML = `
        <p><strong>Random Number:</strong> <span class="success" style="font-size: 1.5rem;">${randomNum}</span> 🎲</p>
        <p><strong>Range:</strong> ${min} to ${max}</p>
        <p><strong>Generated at:</strong> ${new Date().toLocaleTimeString()}</p>
    `;
}

// Console and Debugging
function logToConsole() {
    console.log("Hello from JavaScript! 👋");
    console.log("Current time:", new Date());
    console.log("Random number:", Math.random());

    // Different types of console messages
    console.info("This is an info message ℹ️");
    console.warn("This is a warning message ⚠️");
    console.error("This is an error message ❌");

    // Log an object
    let sampleObject = {
        name: "JavaScript",
        type: "Programming Language",
        year: 1995,
        features: ["Dynamic", "Interpreted", "Object-Oriented"]
    };
    console.log("Sample object:", sampleObject);

    alert("Check the console! (Press F12 to open Developer Tools)");
}

// Allow Enter key for input fields
document.addEventListener("DOMContentLoaded", function () {
    // Name input
    document.getElementById("nameInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") greetUser();
    });

    // Age input
    document.getElementById("ageInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") checkAge();
    });

    // Todo input
    document.getElementById("todoInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") addTodo();
    });

    // Calculator inputs
    document.getElementById("num1").addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculate();
    });

    document.getElementById("num2").addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculate();
    });
});

// Show a welcome message when the page loads
window.addEventListener("load", function () {
    console.log("🎉 JavaScript Basics page loaded successfully!");
    console.log("💡 Try interacting with the elements on the page!");
    console.log("🔧 Don't forget to check the console for debugging messages!");
});
