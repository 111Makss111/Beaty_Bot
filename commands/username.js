const { Markup } = require("telegraf");
const { setUserData, getUserData } = require("../data/users");
const t = require("../utils/translate");
const { showMainMenu, showAdminMainMenu } = require("./mainMenu.js");
const userStates = {};

function getUserName(bot) {
  bot.hears(["🇺🇦 Українська", "🇵🇱 Polska"], (ctx) => {
    const chatId = ctx.chat.id;
    const text = ctx.message.text;
    const langCode = text === "🇺🇦 Українська" ? "uk" : "pl";
    const lang = t[langCode];
    if (String(chatId) === process.env.ADMIN_ID) {
      showAdminMainMenu(ctx, langCode);
      return;
    }
    setUserData(chatId, { language: langCode });

    ctx.reply(lang.askName);
    userStates[chatId] = "waitingForName";
  });

  bot.on("text", (ctx, next) => {
    const chatId = ctx.chat.id;
    const messageText = ctx.message.text;
    const userData = getUserData(chatId);

    if (!userData || !userData.language) {
      return next();
    }

    const langCode = userData.language;
    const lang = t[langCode];

    if (userStates[chatId] === "waitingForName") {
      setUserData(chatId, { fullName: messageText });
      userStates[chatId] = "waitingForPhone";
      ctx.reply(
        lang.phoneSaved,
        Markup.keyboard([[lang.miss]])
          .oneTime()
          .resize()
      );
      return;
    }

    if (userStates[chatId] === "waitingForPhone") {
      let phone;

      if (messageText === lang.miss) {
        phone = lang.notPhone;
      } else {
        if (langCode === "pl" && /^\d{9}$/.test(messageText)) {
          phone = "+48" + messageText;
        } else if (langCode === "uk" && /^\d{10}$/.test(messageText)) {
          phone = "+38" + messageText;
        } else {
          phone = messageText;
        }
      }
      setUserData(chatId, { phone });
      delete userStates[chatId];
      ctx.reply(lang.thanks).then(() => {
        showMainMenu(ctx, langCode);
      });
      return;
    }

    return next(); // дуже важливо!
  });
}

module.exports = getUserName;
