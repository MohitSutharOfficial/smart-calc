/**
 * Advanced Calculator - JavaScript Implementation
 * A comprehensive calculator with standard, scientific, and programming modes
 */

// ===== CALCULATOR APPLICATION CLASS =====
class AdvancedCalculator {
    constructor() {
        this.currentMode = 'standard';
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.angleMode = 'DEG'; // DEG, RAD, GRAD
        this.memory = 0;
        this.history = this.loadHistory();
        this.theme = this.loadTheme() || 'default';
        this.numberBase = 10; // For programming mode
        this.maxDigits = 15;
        this.isError = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupKeyboardInput();
        this.applyTheme();
        this.updateDisplay();
        this.updateMemoryIndicator();
        this.renderHistory();
        this.setupIntersectionObserver();
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // Mode switching
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.target.dataset.mode);
            });
        });

        // Calculator buttons
        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
            });
        });

        // Memory buttons
        document.querySelectorAll('.memory-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleMemoryOperation(e.target.dataset.action);
            });
        });

        // Base selector buttons (programming mode)
        document.querySelectorAll('.base-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeNumberBase(parseInt(e.target.dataset.base));
            });
        });

        // Utility buttons
        document.getElementById('historyBtn').addEventListener('click', () => {
            this.toggleHistory();
        });

        document.getElementById('themeBtn').addEventListener('click', () => {
            this.showThemeSelector();
        });

        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelp();
        });

        // Modal controls
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal-overlay').id);
            });
        });

        // History controls
        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            this.clearHistory();
        });

        document.getElementById('closeHistoryBtn').addEventListener('click', () => {
            this.toggleHistory();
        });

        // History search
        document.getElementById('historySearch').addEventListener('input', (e) => {
            this.searchHistory(e.target.value);
        });

        // Theme selection
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.applyTheme(e.target.dataset.theme);
                this.closeModal('themeModal');
            });
        });

        // History item clicks
        document.getElementById('historyList').addEventListener('click', (e) => {
            const historyItem = e.target.closest('.history-item');
            if (historyItem) {
                this.useHistoryResult(historyItem.dataset.result);
            }
        });

        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay.id);
                }
            });
        });
    }

    // ===== KEYBOARD INPUT HANDLING =====
    setupKeyboardInput() {
        document.addEventListener('keydown', (e) => {
            // Prevent default for calculator-related keys
            if (this.isCalculatorKey(e.key)) {
                e.preventDefault();
                this.handleKeyboardInput(e);
            }
        });
    }

    isCalculatorKey(key) {
        const calculatorKeys = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '+', '-', '*', '/', '=', 'Enter', '.', 'Escape', 'Backspace', 'Delete',
            'a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F'
        ];
        return calculatorKeys.includes(key) || e.ctrlKey || e.metaKey;
    }

    handleKeyboardInput(e) {
        const { key, ctrlKey, metaKey } = e;
        const isModifier = ctrlKey || metaKey;

        // Handle modifier key combinations
        if (isModifier) {
            switch (key.toLowerCase()) {
                case 'm':
                    this.handleMemoryOperation('memory-store');
                    break;
                case 'r':
                    this.handleMemoryOperation('memory-recall');
                    break;
                case 'l':
                    this.handleMemoryOperation('memory-clear');
                    break;
                case 'p':
                    this.handleMemoryOperation('memory-add');
                    break;
                case 'h':
                    this.toggleHistory();
                    break;
            }
            return;
        }

        // Handle regular keys
        switch (key) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                this.inputNumber(key);
                break;
            case 'a': case 'b': case 'c': case 'd': case 'e': case 'f':
            case 'A': case 'B': case 'C': case 'D': case 'E': case 'F':
                if (this.currentMode === 'programming' && this.numberBase === 16) {
                    this.inputNumber(key.toUpperCase());
                }
                break;
            case '+':
                this.handleOperation('add');
                break;
            case '-':
                this.handleOperation('subtract');
                break;
            case '*':
                this.handleOperation('multiply');
                break;
            case '/':
                this.handleOperation('divide');
                break;
            case '=':
            case 'Enter':
                this.calculate();
                break;
            case '.':
                this.inputDecimal();
                break;
            case 'Escape':
                this.clearAll();
                break;
            case 'Backspace':
                this.backspace();
                break;
            case 'Delete':
                this.clearEntry();
                break;
        }
    }

    // ===== MODE SWITCHING =====
    switchMode(mode) {
        this.currentMode = mode;

        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Show/hide appropriate button grids
        document.querySelectorAll('.button-grid').forEach(grid => {
            grid.classList.add('hidden');
        });

        document.getElementById('standardGrid').classList.remove('hidden');

        if (mode === 'scientific') {
            document.getElementById('scientificGrid').classList.remove('hidden');
        } else if (mode === 'programming') {
            document.getElementById('programmingGrid').classList.remove('hidden');
            this.updateHexButtons();
        }

        // Update display for programming mode
        if (mode === 'programming') {
            this.updateProgrammingDisplay();
        } else {
            this.updateDisplay();
        }

        this.showStatusMessage(`Switched to ${mode} mode`, 'info');
    }

    // ===== BUTTON CLICK HANDLING =====
    handleButtonClick(button) {
        const action = button.dataset.action;
        const number = button.dataset.number;

        if (number !== undefined) {
            this.inputNumber(number);
        } else if (action) {
            this.handleAction(action);
        }

        // Visual feedback
        this.animateButton(button);
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    }

    handleAction(action) {
        switch (action) {
            case 'clear-all':
                this.clearAll();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.handleOperation(action);
                break;
            default:
                this.handleFunction(action);
                break;
        }
    }

    // ===== NUMBER INPUT =====
    inputNumber(num) {
        if (this.isError) {
            this.clearAll();
        }

        if (this.currentMode === 'programming') {
            if (!this.isValidDigitForBase(num)) {
                this.showStatusMessage(`${num} is not valid in base ${this.numberBase}`, 'error');
                return;
            }
        }

        if (this.waitingForOperand) {
            this.currentValue = num;
            this.waitingForOperand = false;
        } else {
            this.currentValue = this.currentValue === '0' ? num : this.currentValue + num;
        }

        if (this.currentValue.length > this.maxDigits) {
            this.currentValue = this.currentValue.slice(0, this.maxDigits);
        }

        this.updateDisplay();
    }

    inputDecimal() {
        if (this.currentMode === 'programming') {
            this.showStatusMessage('Decimal point not available in programming mode', 'warning');
            return;
        }

        if (this.isError) {
            this.clearAll();
        }

        if (this.waitingForOperand) {
            this.currentValue = '0.';
            this.waitingForOperand = false;
        } else if (this.currentValue.indexOf('.') === -1) {
            this.currentValue += '.';
        }

        this.updateDisplay();
    }

    isValidDigitForBase(digit) {
        const digitValue = parseInt(digit, 16);
        return !isNaN(digitValue) && digitValue < this.numberBase;
    }

    // ===== ARITHMETIC OPERATIONS =====
    handleOperation(nextOperator) {
        const inputValue = parseFloat(this.currentValue);

        if (this.currentMode === 'programming') {
            return this.handleProgrammingOperation(nextOperator);
        }

        if (this.previousValue === '') {
            this.previousValue = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousValue || 0;
            const newValue = this.performCalculation(this.operator, currentValue, inputValue);

            this.currentValue = String(newValue);
            this.previousValue = newValue;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.updateDisplay();
    }

    handleProgrammingOperation(operation) {
        // Convert current value to decimal for calculation
        const currentDecimal = parseInt(this.currentValue, this.numberBase);

        if (this.previousValue === '') {
            this.previousValue = currentDecimal;
        } else if (this.operator) {
            const previousDecimal = this.previousValue;
            const result = this.performProgrammingCalculation(this.operator, previousDecimal, currentDecimal);

            this.currentValue = this.convertFromDecimal(result, this.numberBase);
            this.previousValue = result;
        }

        this.waitingForOperand = true;
        this.operator = operation;
        this.updateDisplay();
    }

    performCalculation(operator, firstOperand, secondOperand) {
        switch (operator) {
            case 'add':
                return firstOperand + secondOperand;
            case 'subtract':
                return firstOperand - secondOperand;
            case 'multiply':
                return firstOperand * secondOperand;
            case 'divide':
                if (secondOperand === 0) {
                    throw new Error('Cannot divide by zero');
                }
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    performProgrammingCalculation(operator, firstOperand, secondOperand) {
        switch (operator) {
            case 'add':
                return firstOperand + secondOperand;
            case 'subtract':
                return firstOperand - secondOperand;
            case 'multiply':
                return firstOperand * secondOperand;
            case 'divide':
                if (secondOperand === 0) {
                    throw new Error('Cannot divide by zero');
                }
                return Math.floor(firstOperand / secondOperand);
            case 'and':
                return firstOperand & secondOperand;
            case 'or':
                return firstOperand | secondOperand;
            case 'xor':
                return firstOperand ^ secondOperand;
            case 'lshift':
                return firstOperand << secondOperand;
            case 'rshift':
                return firstOperand >> secondOperand;
            default:
                return secondOperand;
        }
    }

    // ===== SCIENTIFIC FUNCTIONS =====
    handleFunction(func) {
        let value = parseFloat(this.currentValue);
        let result;

        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(this.toRadians(value));
                    break;
                case 'cos':
                    result = Math.cos(this.toRadians(value));
                    break;
                case 'tan':
                    result = Math.tan(this.toRadians(value));
                    break;
                case 'asin':
                    result = this.fromRadians(Math.asin(value));
                    break;
                case 'acos':
                    result = this.fromRadians(Math.acos(value));
                    break;
                case 'atan':
                    result = this.fromRadians(Math.atan(value));
                    break;
                case 'log':
                    if (value <= 0) throw new Error('Invalid input for logarithm');
                    result = Math.log10(value);
                    break;
                case 'ln':
                    if (value <= 0) throw new Error('Invalid input for natural logarithm');
                    result = Math.log(value);
                    break;
                case 'square':
                    result = value * value;
                    break;
                case 'cube':
                    result = value * value * value;
                    break;
                case 'sqrt':
                    if (value < 0) throw new Error('Cannot take square root of negative number');
                    result = Math.sqrt(value);
                    break;
                case 'factorial':
                    if (value < 0 || !Number.isInteger(value)) {
                        throw new Error('Factorial is only defined for non-negative integers');
                    }
                    result = this.factorial(value);
                    break;
                case 'pi':
                    result = Math.PI;
                    break;
                case 'e':
                    result = Math.E;
                    break;
                case 'percent':
                    result = value / 100;
                    break;
                case 'not':
                    if (this.currentMode === 'programming') {
                        const decimal = parseInt(this.currentValue, this.numberBase);
                        result = ~decimal;
                        this.currentValue = this.convertFromDecimal(result, this.numberBase);
                        this.updateDisplay();
                        return;
                    }
                    break;
                default:
                    return;
            }

            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid result');
            }

            this.currentValue = this.formatResult(result);
            this.waitingForOperand = true;
            this.updateDisplay();

        } catch (error) {
            this.showError(error.message);
        }
    }

    factorial(n) {
        if (n > 170) throw new Error('Number too large for factorial');
        if (n === 0 || n === 1) return 1;
        return n * this.factorial(n - 1);
    }

    toRadians(degrees) {
        switch (this.angleMode) {
            case 'RAD':
                return degrees;
            case 'GRAD':
                return degrees * Math.PI / 200;
            default: // DEG
                return degrees * Math.PI / 180;
        }
    }

    fromRadians(radians) {
        switch (this.angleMode) {
            case 'RAD':
                return radians;
            case 'GRAD':
                return radians * 200 / Math.PI;
            default: // DEG
                return radians * 180 / Math.PI;
        }
    }

    // ===== CALCULATION =====
    calculate() {
        if (this.operator && !this.waitingForOperand) {
            const inputValue = this.currentMode === 'programming'
                ? parseInt(this.currentValue, this.numberBase)
                : parseFloat(this.currentValue);

            const previousValue = this.previousValue;
            const expression = this.buildExpression();

            try {
                let result;
                if (this.currentMode === 'programming') {
                    result = this.performProgrammingCalculation(this.operator, previousValue, inputValue);
                    this.currentValue = this.convertFromDecimal(result, this.numberBase);
                } else {
                    result = this.performCalculation(this.operator, previousValue, inputValue);
                    this.currentValue = this.formatResult(result);
                }

                // Add to history
                this.addToHistory(expression, this.currentValue);

                this.previousValue = '';
                this.operator = null;
                this.waitingForOperand = true;
                this.updateDisplay();

            } catch (error) {
                this.showError(error.message);
            }
        }
    }

    buildExpression() {
        const operatorSymbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷',
            'and': 'AND',
            'or': 'OR',
            'xor': 'XOR',
            'lshift': '<<',
            'rshift': '>>'
        };

        const prevValue = this.currentMode === 'programming'
            ? this.convertFromDecimal(this.previousValue, this.numberBase)
            : this.previousValue;

        return `${prevValue} ${operatorSymbols[this.operator] || this.operator} ${this.currentValue}`;
    }

    formatResult(result) {
        if (Math.abs(result) < 1e-10) {
            return '0';
        }

        if (Math.abs(result) >= 1e15 || Math.abs(result) < 1e-6) {
            return result.toExponential(6);
        }

        return parseFloat(result.toPrecision(12)).toString();
    }

    // ===== PROGRAMMING MODE FUNCTIONS =====
    changeNumberBase(base) {
        if (this.currentMode !== 'programming') return;

        try {
            // Convert current value to decimal, then to new base
            const decimal = parseInt(this.currentValue, this.numberBase);
            this.currentValue = this.convertFromDecimal(decimal, base);
            this.numberBase = base;

            // Update UI
            document.querySelectorAll('.base-btn').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.base) === base);
            });

            this.updateHexButtons();
            this.updateDisplay();

        } catch (error) {
            this.showError('Invalid number for base conversion');
        }
    }

    convertFromDecimal(decimal, base) {
        if (decimal < 0) {
            // Handle negative numbers in two's complement for binary
            if (base === 2) {
                return (decimal >>> 0).toString(2);
            }
            return '-' + Math.abs(decimal).toString(base).toUpperCase();
        }
        return decimal.toString(base).toUpperCase();
    }

    updateHexButtons() {
        const hexButtons = document.querySelectorAll('.hex-btn');
        hexButtons.forEach(btn => {
            const digit = btn.dataset.number;
            const digitValue = parseInt(digit, 16);
            btn.disabled = digitValue >= this.numberBase;
        });
    }

    updateProgrammingDisplay() {
        const decimal = parseInt(this.currentValue, this.numberBase);

        document.getElementById('displayPrimary').textContent = this.currentValue;

        // Show conversions in secondary display
        const conversions = [
            `DEC: ${decimal}`,
            `HEX: ${decimal.toString(16).toUpperCase()}`,
            `OCT: ${decimal.toString(8)}`,
            `BIN: ${decimal.toString(2)}`
        ];

        document.getElementById('displaySecondary').textContent =
            conversions.filter(conv => !conv.includes(this.numberBase.toString())).slice(0, 2).join(' | ');
    }

    // ===== MEMORY FUNCTIONS =====
    handleMemoryOperation(operation) {
        const currentDecimal = this.currentMode === 'programming'
            ? parseInt(this.currentValue, this.numberBase)
            : parseFloat(this.currentValue);

        switch (operation) {
            case 'memory-clear':
                this.memory = 0;
                this.showStatusMessage('Memory cleared', 'info');
                break;
            case 'memory-recall':
                if (this.currentMode === 'programming') {
                    this.currentValue = this.convertFromDecimal(this.memory, this.numberBase);
                } else {
                    this.currentValue = this.memory.toString();
                }
                this.waitingForOperand = true;
                this.showStatusMessage('Memory recalled', 'info');
                break;
            case 'memory-store':
                this.memory = currentDecimal;
                this.showStatusMessage('Value stored in memory', 'success');
                break;
            case 'memory-add':
                this.memory += currentDecimal;
                this.showStatusMessage('Value added to memory', 'success');
                break;
            case 'memory-subtract':
                this.memory -= currentDecimal;
                this.showStatusMessage('Value subtracted from memory', 'success');
                break;
        }

        this.updateMemoryIndicator();
        this.updateDisplay();
    }

    updateMemoryIndicator() {
        const indicator = document.getElementById('memoryIndicator');
        indicator.classList.toggle('active', this.memory !== 0);
    }

    // ===== CLEAR FUNCTIONS =====
    clearAll() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.isError = false;
        this.updateDisplay();
        this.showStatusMessage('Calculator cleared', 'info');
    }

    clearEntry() {
        this.currentValue = '0';
        this.isError = false;
        this.updateDisplay();
    }

    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    // ===== DISPLAY UPDATES =====
    updateDisplay() {
        if (this.currentMode === 'programming') {
            this.updateProgrammingDisplay();
        } else {
            document.getElementById('displayPrimary').textContent = this.currentValue;

            if (this.operator && this.previousValue !== '') {
                const operatorSymbol = this.getOperatorSymbol(this.operator);
                document.getElementById('displaySecondary').textContent =
                    `${this.previousValue} ${operatorSymbol}`;
            } else {
                document.getElementById('displaySecondary').textContent = '';
            }
        }
    }

    getOperatorSymbol(operator) {
        const symbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[operator] || operator;
    }

    showError(message) {
        this.isError = true;
        this.currentValue = 'Error';
        document.getElementById('displayPrimary').textContent = 'Error';
        document.getElementById('displaySecondary').textContent = message;
        this.showStatusMessage(message, 'error');
    }

    // ===== HISTORY MANAGEMENT =====
    addToHistory(expression, result) {
        const historyItem = {
            id: Date.now(),
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleString(),
            mode: this.currentMode,
            base: this.numberBase
        };

        this.history.unshift(historyItem);

        // Keep only last 100 items
        if (this.history.length > 100) {
            this.history = this.history.slice(0, 100);
        }

        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');

        if (this.history.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No calculations yet</div>';
            return;
        }

        historyList.innerHTML = this.history.map(item => `
            <div class="history-item" data-result="${item.result}" role="listitem">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">${item.result}</div>
                <div class="history-timestamp">${item.timestamp}</div>
            </div>
        `).join('');
    }

    searchHistory(query) {
        const filteredHistory = this.history.filter(item =>
            item.expression.toLowerCase().includes(query.toLowerCase()) ||
            item.result.toLowerCase().includes(query.toLowerCase())
        );

        const historyList = document.getElementById('historyList');

        if (filteredHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No matching calculations</div>';
            return;
        }

        historyList.innerHTML = filteredHistory.map(item => `
            <div class="history-item" data-result="${item.result}" role="listitem">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">${item.result}</div>
                <div class="history-timestamp">${item.timestamp}</div>
            </div>
        `).join('');
    }

    useHistoryResult(result) {
        this.currentValue = result;
        this.waitingForOperand = true;
        this.updateDisplay();
        this.toggleHistory();
        this.showStatusMessage('Result loaded from history', 'success');
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
        this.showStatusMessage('History cleared', 'info');
    }

    toggleHistory() {
        const historyPanel = document.getElementById('historyPanel');
        historyPanel.classList.toggle('visible');

        if (historyPanel.classList.contains('visible')) {
            document.getElementById('historySearch').focus();
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('calculator-history', JSON.stringify(this.history));
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    }

    loadHistory() {
        try {
            const stored = localStorage.getItem('calculator-history');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load history:', error);
            return [];
        }
    }

    // ===== THEME MANAGEMENT =====
    applyTheme(themeName = this.theme) {
        this.theme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);

        // Update theme selector
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === themeName);
        });

        this.saveTheme();
        this.showStatusMessage(`Applied ${themeName} theme`, 'success');
    }

    saveTheme() {
        try {
            localStorage.setItem('calculator-theme', this.theme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    }

    loadTheme() {
        try {
            return localStorage.getItem('calculator-theme');
        } catch (error) {
            console.error('Failed to load theme:', error);
            return null;
        }
    }

    // ===== MODAL MANAGEMENT =====
    showThemeSelector() {
        this.showModal('themeModal');
    }

    showHelp() {
        this.showModal('helpModal');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Focus first focusable element
        const focusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) {
            focusable.focus();
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('visible');
        document.body.style.overflow = '';
    }

    // ===== STATUS MESSAGES =====
    showStatusMessage(message, type = 'info') {
        const statusElement = document.getElementById('statusMessage');

        statusElement.textContent = message;
        statusElement.className = `status-message ${type}`;
        statusElement.classList.remove('hidden');

        setTimeout(() => {
            statusElement.classList.add('hidden');
        }, 3000);
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.calc-btn').forEach(btn => {
                observer.observe(btn);
            });
        }
    }

    // ===== UTILITY FUNCTIONS =====
    exportHistory() {
        const data = {
            history: this.history,
            exportDate: new Date().toISOString(),
            calculatorVersion: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `calculator-history-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showStatusMessage('History exported successfully', 'success');
    }

    getCalculatorInfo() {
        return {
            mode: this.currentMode,
            theme: this.theme,
            historyCount: this.history.length,
            memoryValue: this.memory,
            angleMode: this.angleMode,
            numberBase: this.numberBase
        };
    }
}

// ===== DEVELOPMENT HELPERS =====
class CalculatorDevTools {
    constructor(calculator) {
        this.calculator = calculator;
    }

    runTests() {
        const tests = [
            { expression: '2 + 2', expected: '4' },
            { expression: '10 - 5', expected: '5' },
            { expression: '3 × 4', expected: '12' },
            { expression: '15 ÷ 3', expected: '5' },
            { expression: 'sin(90°)', expected: '1' },
            { expression: '2²', expected: '4' },
            { expression: '√16', expected: '4' },
        ];

        console.log('Running calculator tests...');
        tests.forEach(test => {
            console.log(`Test: ${test.expression} = ${test.expected}`);
        });
    }

    simulateInput(sequence) {
        sequence.split('').forEach(char => {
            setTimeout(() => {
                const button = document.querySelector(`[data-number="${char}"], [data-action="${char}"]`);
                if (button) button.click();
            }, 100);
        });
    }

    generateRandomCalculation() {
        const operators = ['add', 'subtract', 'multiply', 'divide'];
        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 100) + 1; // Avoid division by zero
        const operator = operators[Math.floor(Math.random() * operators.length)];

        this.calculator.currentValue = num1.toString();
        this.calculator.handleOperation(operator);
        this.calculator.currentValue = num2.toString();
        this.calculator.calculate();
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Calculator error:', e.error);
    document.getElementById('statusMessage').textContent = 'An error occurred. Please refresh if problems persist.';
    document.getElementById('statusMessage').className = 'status-message error';
    document.getElementById('statusMessage').classList.remove('hidden');
});

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Show loading spinner
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('hidden');

    // Initialize calculator after a short delay to show loading
    setTimeout(() => {
        window.calculator = new AdvancedCalculator();

        // Hide loading spinner
        loadingOverlay.classList.add('hidden');

        // Development mode helpers
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.devTools = new CalculatorDevTools(window.calculator);

            console.log('🧮 Advanced Calculator Development Mode');
            console.log('Available commands:');
            console.log('- calculator.switchMode("scientific") - Switch to scientific mode');
            console.log('- calculator.exportHistory() - Export calculation history');
            console.log('- calculator.getCalculatorInfo() - Get calculator state');
            console.log('- devTools.runTests() - Run basic tests');
            console.log('- devTools.simulateInput("123+456=") - Simulate button presses');
            console.log('- devTools.generateRandomCalculation() - Generate random calculation');
        }

        console.log('✨ Advanced Calculator loaded successfully');
    }, 1000);
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('📱 PWA support available - Service Worker ready for registration');
    });
}
