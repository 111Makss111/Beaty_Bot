const { Markup } = require("telegraf");
const { getUserData } = require("../data/users");
const t = require("../utils/translate");

function handlersBook(bot) {
  bot.hears([t.uk.book, t.pl.book], (ctx) => {
    const chatId = ctx.chat.id;
    const userData = getUserData(chatId);
    const langCode = userData?.language || "uk";
    const lang = t[langCode];

    ctx.reply(
      lang.chooseService,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(lang.manicure, "SERVICE_MANICURE"),
          Markup.button.callback(lang.pedicure, "SERVICE_PEDICURE"),
        ],
        [
          Markup.button.callback(lang.removal, "SERVICE_REMOVAL"),
          Markup.button.callback(lang.strengthen, "SERVICE_STRENGTHEN"),
        ],
        [Markup.button.callback(lang.mainMenu, "MAIN_MENU")],
      ])
    );
  });
}

module.exports = handlersBook;
