const { setUserData } = require("../data/users");
const t = require("../utils/translate");

const userStates = {};

function getUserName(bot) {
  bot.hears(["🇺🇦 Українська", "🇵🇱 Polska"], (ctx) => {
    const chatId = ctx.chat.id;
    const text = ctx.message.text;
    const langCode = text === "🇺🇦 Українська" ? "uk" : "pl";
    const lang = t[langCode];

    setUserData(chatId, { language: langCode });

    ctx.reply(lang.askName); // Наприклад: "Введіть своє ім’я та прізвище"

    userStates[chatId] = "waitingForName";
  });

  bot.on("text", (ctx) => {
    const chatId = ctx.chat.id;
    const messageText = ctx.message.text;
    const langCode = messageText === "🇺🇦 Українська" ? "uk" : "pl";
    const lang = t[langCode];
    if (userStates[chatId] === "waitingForName") {
      setUserData(chatId, { fullName: messageText });
      ctx.reply(lang.nameSaved);
      delete userStates[chatId];
    }
  });
}

module.exports = getUserName;
