// Массив для хранения расходов
let expenses = [];

// Вспомогательная функция для генерации ID
function generateId() {
    return expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
}

// 1. Добавление расхода
function addExpense(title, amount, category) {
    if (!title || !category || amount <= 0 || isNaN(amount)) {
        console.log('Ошибка: Неверные данные');
        return null;
    }

    const expense = {
        id: generateId(),
        title: title,
        amount: amount,
        category: category
    };
    
    expenses.push(expense);
    console.log('Расход добавлен:', title, amount, category);
    return expense;
}

// 2. Вывод всех расходов
function printAllExpenses() {
    if (expenses.length === 0) {
        console.log('Список расходов пуст');
        return;
    }

    console.log('\nВСЕ РАСХОДЫ:');
    expenses.forEach(expense => {
        console.log(expense.id + ' | ' + expense.title + ' | ' + expense.amount + ' руб. | ' + expense.category);
    });
    console.log('Всего записей:', expenses.length, '\n');
}

// 3. Подсчёт общего баланса
function getTotalAmount() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;
    }
    
    console.log('\nОБЩИЙ БАЛАНС:');
    console.log('Общая сумма:', total, 'руб.');
    console.log('Количество операций:', expenses.length, '\n');
    
    return total;
}

// 4. Фильтрация по категории
function getExpensesByCategory(category) {
    let result = [];
    let total = 0;
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].category === category) {
            result.push(expenses[i]);
            total = total + expenses[i].amount;
        }
    }
    
    console.log('\nКАТЕГОРИЯ:', category);
    if (result.length === 0) {
        console.log('Нет расходов');
    } else {
        for (let i = 0; i < result.length; i++) {
            console.log(result[i].title + ': ' + result[i].amount + ' руб.');
        }
        console.log('Всего потрачено:', total, 'руб.');
        console.log('Количество расходов:', result.length);
    }
    console.log('');
    
    return result;
}

// 5. Поиск расхода по названию
function findExpenseByTitle(searchString) {
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].title.toLowerCase().includes(searchString.toLowerCase())) {
            console.log('\nНайден расход:');
            console.log('ID:', expenses[i].id);
            console.log('Название:', expenses[i].title);
            console.log('Сумма:', expenses[i].amount, 'руб.');
            console.log('Категория:', expenses[i].category);
            return expenses[i];
        }
    }
    
    console.log('Расходы не найдены');
    return null;
}

// 6. Объект управления приложением
const expenseTracker = {
    expenses: expenses,
    
    addExpense: function(title, amount, category) {
        return addExpense(title, amount, category);
    },
    
    getTotalAmount: function() {
        return getTotalAmount();
    },
    
    getExpensesByCategory: function(category) {
        return getExpensesByCategory(category);
    },
    
    findExpenseByTitle: function(searchString) {
        return findExpenseByTitle(searchString);
    },
    
    // 7.1 Удаление расхода по id
    deleteExpense: function(id) {
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].id === id) {
                let deleted = this.expenses[i];
                this.expenses.splice(i, 1);
                console.log('Расход удален:', deleted.title);
                return true;
            }
        }
        
        console.log('Расход с ID', id, 'не найден');
        return false;
    },
    
    // 7.2 Статистика по категориям
    getCategoryStats: function() {
        let categories = {};
        
        for (let i = 0; i < this.expenses.length; i++) {
            let cat = this.expenses[i].category;
            let amount = this.expenses[i].amount;
            
            if (!categories[cat]) {
                categories[cat] = { count: 0, total: 0 };
            }
            
            categories[cat].count++;
            categories[cat].total = categories[cat].total + amount;
        }
        
        console.log('\nСТАТИСТИКА ПО КАТЕГОРИЯМ:');
        let grandTotal = 0;
        
        for (let cat in categories) {
            console.log(cat + ':');
            console.log('  Расходов:', categories[cat].count);
            console.log('  Сумма:', categories[cat].total, 'руб.');
            grandTotal = grandTotal + categories[cat].total;
        }
        
        console.log('ИТОГО:', grandTotal, 'руб.\n');
        
        return categories;
    }
};

// Демонстрация работы
console.log('ТРЕКЕР РАСХОДОВ\n');

// Добавляем тестовые данные
expenseTracker.addExpense('Кофе', 250, 'Еда');
expenseTracker.addExpense('Обед', 450, 'Еда');
expenseTracker.addExpense('Такси', 500, 'Транспорт');
expenseTracker.addExpense('Метро', 65, 'Транспорт');
expenseTracker.addExpense('Кино', 600, 'Развлечения');

// Показываем все расходы
printAllExpenses();

// Общий баланс
getTotalAmount();

// Фильтр по категории
getExpensesByCategory('Еда');

// Поиск
findExpenseByTitle('Кофе');

// Статистика
expenseTracker.getCategoryStats();

// Удаление
expenseTracker.deleteExpense(3);
printAllExpenses();