const users = [
  { id: 1, name: "Anna", age: 22, city: "Moscow", isActive: true },
  { id: 2, name: "Oleg", age: 17, city: "Kazan", isActive: false },
  { id: 3, name: "Ivan", age: 30, city: "Moscow", isActive: true },
  { id: 4, name: "Maria", age: 25, city: "Sochi", isActive: false }
];

// Задание 1. Фильтрация пользователей
function getActiveUsers(usersArray) {
  return usersArray.filter(user => user.isActive === true);
}

// Задание 2. Получение имён пользователей
const getUserNames = (usersArray) => {
  return usersArray.map(user => user.name);
};

// Задание 3. Поиск пользователя
function findUserById(usersArray, id) {
  const foundUser = usersArray.find(user => user.id === id);
  return foundUser !== undefined ? foundUser : null;
}

// Задание 4. Подсчёт статистики
function getUsersStatistics(usersArray) {
  const activeUsers = usersArray.filter(user => user.isActive).length;
  const inactiveUsers = usersArray.filter(user => !user.isActive).length;
  
  return {
    total: usersArray.length,
    active: activeUsers,
    inactive: inactiveUsers
  };
}

// Задание 5. Средний возраст
function getAverageAge(usersArray) {
  if (usersArray.length === 0) return 0;
  
  const totalAge = usersArray.reduce((sum, user) => sum + user.age, 0);
  return totalAge / usersArray.length;
}

// Задание 6. Дополнительный функционал программы
function groupUsersByCity(usersArray) {
  return usersArray.reduce((result, user) => {
    if (!result[user.city]) {
      result[user.city] = [];
    }
    result[user.city].push(user);
    return result;
  }, {});
}

console.log("Задание 1 - Активные пользователи:");
console.log(getActiveUsers(users));

console.log("\nЗадание 2 - Имена пользователей:");
console.log(getUserNames(users));

console.log("\nЗадание 3 - Поиск пользователя с id=3:");
console.log(findUserById(users, 3));
console.log("Поиск пользователя с id=5:");
console.log(findUserById(users, 5));

console.log("\nЗадание 4 - Статистика пользователей:");
console.log(getUsersStatistics(users));

console.log("\nЗадание 5 - Средний возраст:");
console.log(getAverageAge(users));

console.log("\nЗадание 6 - Группировка по городу:");
console.log(groupUsersByCity(users));