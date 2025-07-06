/**
 * Todo List App - JavaScript Implementation
 * A comprehensive todo application demonstrating modern JavaScript practices
 */

// ===== APPLICATION STATE =====
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateControls();
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // Form submission
        document.getElementById('todoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Character counter
        document.getElementById('todoInput').addEventListener('input', (e) => {
            this.updateCharCounter(e.target.value.length);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed button
        document.getElementById('clearCompleted').addEventListener('click', () => {
            this.clearCompleted();
        });

        // Todo list event delegation
        document.getElementById('todoList').addEventListener('click', (e) => {
            this.handleTodoClick(e);
        });

        // Double-click to edit
        document.getElementById('todoList').addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('todo-text')) {
                const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
                this.startEdit(todoId);
            }
        });

        // Edit modal events
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.cancelEdit();
        });

        // Confirmation modal events
        document.getElementById('cancelConfirm').addEventListener('click', () => {
            this.hideModal('confirmModal');
        });

        document.getElementById('confirmAction').addEventListener('click', () => {
            this.confirmedAction();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });

        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hideModal(overlay.id);
                }
            });
        });
    }

    // ===== TODO MANAGEMENT =====
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        this.updateControls();

        // Clear input and show success
        input.value = '';
        this.updateCharCounter(0);
        this.showNotification('Todo added successfully!', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
            this.updateControls();

            const action = todo.completed ? 'completed' : 'marked as active';
            this.showNotification(`Todo ${action}!`, 'success');
        }
    }

    deleteTodo(id) {
        this.pendingAction = () => {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.render();
            this.updateControls();
            this.showNotification('Todo deleted!', 'success');
            this.hideModal('confirmModal');
        };

        this.showConfirmation('Are you sure you want to delete this todo?');
    }

    startEdit(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        this.editingId = id;
        const editInput = document.getElementById('editInput');
        editInput.value = todo.text;
        this.showModal('editModal');
        editInput.focus();
        editInput.select();
    }

    saveEdit() {
        const editInput = document.getElementById('editInput');
        const newText = editInput.value.trim();

        if (!newText) {
            this.showNotification('Todo text cannot be empty!', 'error');
            return;
        }

        const todo = this.todos.find(t => t.id === this.editingId);
        if (todo) {
            todo.text = newText;
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
            this.showNotification('Todo updated!', 'success');
        }

        this.cancelEdit();
    }

    cancelEdit() {
        this.editingId = null;
        this.hideModal('editModal');
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;

        if (completedCount === 0) {
            this.showNotification('No completed todos to clear!', 'info');
            return;
        }

        this.pendingAction = () => {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
            this.updateControls();
            this.showNotification(`${completedCount} completed todos cleared!`, 'success');
            this.hideModal('confirmModal');
        };

        this.showConfirmation(`Are you sure you want to clear ${completedCount} completed todo${completedCount > 1 ? 's' : ''}?`);
    }

    // ===== FILTERING =====
    setFilter(filter) {
        this.currentFilter = filter;

        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    // ===== RENDERING =====
    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        // Clear current todos
        todoList.innerHTML = '';

        // Show/hide empty state
        if (this.todos.length === 0) {
            emptyState.classList.add('visible');
            return;
        } else {
            emptyState.classList.remove('visible');
        }

        // Render filtered todos
        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <li class="todo-item">
                    <div class="empty-filter">
                        <p>No ${this.currentFilter} todos found.</p>
                    </div>
                </li>
            `;
            return;
        }

        filteredTodos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            todoList.appendChild(todoElement);
        });
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        li.setAttribute('role', 'listitem');

        li.innerHTML = `
            <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" 
                 role="checkbox" 
                 aria-checked="${todo.completed}"
                 aria-label="Mark todo as ${todo.completed ? 'incomplete' : 'complete'}"
                 tabindex="0">
            </div>
            <span class="todo-text" title="Double-click to edit">${this.escapeHtml(todo.text)}</span>
            <div class="todo-actions">
                <button class="action-btn edit-btn" data-action="edit" aria-label="Edit todo">
                    Edit
                </button>
                <button class="action-btn delete-btn" data-action="delete" aria-label="Delete todo">
                    Delete
                </button>
            </div>
        `;

        return li;
    }

    // ===== EVENT HANDLERS =====
    handleTodoClick(e) {
        const todoItem = e.target.closest('.todo-item');
        if (!todoItem) return;

        const todoId = parseInt(todoItem.dataset.id);
        const action = e.target.dataset.action;

        if (e.target.classList.contains('todo-checkbox') || e.target.classList.contains('todo-text')) {
            this.toggleTodo(todoId);
        } else if (action === 'edit') {
            this.startEdit(todoId);
        } else if (action === 'delete') {
            this.deleteTodo(todoId);
        }
    }

    handleKeyDown(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            if (document.getElementById('editModal').classList.contains('visible')) {
                this.cancelEdit();
            } else if (document.getElementById('confirmModal').classList.contains('visible')) {
                this.hideModal('confirmModal');
            }
        }

        // Handle checkbox navigation with Enter/Space
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('todo-checkbox')) {
            e.preventDefault();
            const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
            this.toggleTodo(todoId);
        }
    }

    // ===== UI UPDATES =====
    updateControls() {
        const activeCount = this.todos.filter(t => !t.completed).length;
        const completedCount = this.todos.filter(t => t.completed).length;

        // Update counter
        document.getElementById('todoCount').textContent =
            `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

        // Update clear button
        const clearBtn = document.getElementById('clearCompleted');
        clearBtn.disabled = completedCount === 0;
        clearBtn.textContent = `Clear Completed (${completedCount})`;

        // Show/hide controls
        const controls = document.getElementById('todoControls');
        controls.style.display = this.todos.length > 0 ? 'flex' : 'none';
    }

    updateCharCounter(length) {
        const counter = document.getElementById('charCounter');
        counter.textContent = `${length}/100 characters`;
        counter.style.color = length > 90 ? 'var(--danger-color)' : 'var(--gray-500)';
    }

    // ===== MODAL MANAGEMENT =====
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('visible');
        document.body.style.overflow = '';
    }

    showConfirmation(message) {
        document.getElementById('confirmMessage').textContent = message;
        this.showModal('confirmModal');
    }

    confirmedAction() {
        if (this.pendingAction) {
            this.pendingAction();
            this.pendingAction = null;
        }
    }

    // ===== NOTIFICATIONS =====
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' :
                type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
            color: white;
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        notification.textContent = message;

        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
                if (style.parentNode) {
                    style.remove();
                }
            }, 300);
        }, 3000);
    }

    // ===== DATA PERSISTENCE =====
    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Failed to save todos:', error);
            this.showNotification('Failed to save todos. Storage may be full.', 'error');
        }
    }

    loadTodos() {
        try {
            const stored = localStorage.getItem('todos');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load todos:', error);
            this.showNotification('Failed to load saved todos.', 'error');
            return [];
        }
    }

    // ===== UTILITY FUNCTIONS =====
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ===== EXPORT DATA =====
    exportTodos() {
        const data = {
            todos: this.todos,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Todos exported successfully!', 'success');
    }

    // ===== STATISTICS =====
    getStatistics() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            total,
            completed,
            active,
            completionRate
        };
    }
}

// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            renderTime: [],
            actionTime: []
        };
    }

    startTimer(operation) {
        this.startTime = performance.now();
        this.currentOperation = operation;
    }

    endTimer() {
        if (this.startTime && this.currentOperation) {
            const duration = performance.now() - this.startTime;
            this.metrics[this.currentOperation].push(duration);

            // Keep only last 50 measurements
            if (this.metrics[this.currentOperation].length > 50) {
                this.metrics[this.currentOperation].shift();
            }

            console.log(`${this.currentOperation}: ${duration.toFixed(2)}ms`);
        }
    }

    getAverageTime(operation) {
        const times = this.metrics[operation];
        return times.length > 0
            ? times.reduce((a, b) => a + b) / times.length
            : 0;
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);

    // Show user-friendly error message
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--danger-color);
        color: white;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        max-width: 300px;
    `;
    notification.textContent = 'An error occurred. Please refresh the page.';
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 5000);
});

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize performance monitor
    window.performanceMonitor = new PerformanceMonitor();

    // Initialize todo app
    window.todoApp = new TodoApp();

    // Add keyboard shortcuts info
    console.log(`
        🎯 Todo List App Keyboard Shortcuts:
        • Escape: Close modals
        • Enter/Space: Toggle todo (when focused on checkbox)
        • Double-click: Edit todo
        
        💡 Performance Monitoring:
        • Use window.performanceMonitor.getAverageTime('renderTime') for metrics
        • Use window.todoApp.getStatistics() for todo statistics
        • Use window.todoApp.exportTodos() to export data
    `);

    // Add development helpers
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🛠️ Development mode detected');

        // Add sample todos for testing
        window.addSampleTodos = () => {
            const samples = [
                'Learn HTML fundamentals',
                'Master CSS Grid and Flexbox',
                'Build interactive JavaScript applications',
                'Create responsive web designs',
                'Deploy projects to production'
            ];

            samples.forEach((text, index) => {
                const todo = {
                    id: Date.now() + index,
                    text,
                    completed: index % 2 === 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                window.todoApp.todos.push(todo);
            });

            window.todoApp.saveTodos();
            window.todoApp.render();
            window.todoApp.updateControls();
        };

        console.log('📝 Use addSampleTodos() to add test data');
    }
});

// ===== SERVICE WORKER REGISTRATION (FOR FUTURE PWA SUPPORT) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here for PWA functionality
        console.log('📱 PWA support available - Service Worker registration ready');
    });
}
