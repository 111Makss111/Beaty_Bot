const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
// Читання всіх користувачів
function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

// Запис всіх користувачів у файл
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

// Отримати всі дані конкретного користувача
function getUserData(chatId) {
  const users = readUsers();
  return users[chatId] || null;
}

// Оновити або створити користувача з новими полями
function setUserData(chatId, newData) {
  const users = readUsers();

  users[chatId] = {
    ...users[chatId], // зберігаємо старі дані, якщо вони є
    ...newData, // додаємо/оновлюємо нові
  };

  writeUsers(users);
}

// Видалити користувача з бази
function deleteUser(chatId) {
  const users = readUsers();
  if (users[chatId]) {
    delete users[chatId];
    writeUsers(users);
  }
}

// Отримати всі записи (усіх користувачів)
function getAllUsers() {
  return readUsers();
}

module.exports = {
  readUsers,
  writeUsers,
  getUserData,
  setUserData,
  deleteUser,
  getAllUsers,
};
