const { Markup } = require("telegraf");
const { getUserData, setUserData } = require("../data/users");
const t = require("../utils/translate");
const showMainMenu = require("../commands/mainMenu");

function handleTimeSelection(bot) {
  const services = [
    "SERVICE_MANICURE",
    "SERVICE_PEDICURE",
    "SERVICE_REMOVAL",
    "SERVICE_STRENGTHEN",
  ];

  // Обробка вибору послуги
  services.forEach((serviceKey) => {
    bot.action(serviceKey, async (ctx) => {
      try {
        const chatId = ctx.chat.id;
        const userData = getUserData(chatId);
        const langCode = userData?.language || "uk";
        const lang = t[langCode];

        const selectedService = serviceKey
          .replace("SERVICE_", "")
          .toLowerCase();
        setUserData(chatId, { service: selectedService });

        await ctx.editMessageText(lang.chooseTime || "Оберіть час:", {
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.button.callback("9:00", "TIME_9"),
              Markup.button.callback("12:00", "TIME_12"),
            ],
            [
              Markup.button.callback("15:00", "TIME_15"),
              Markup.button.callback("18:00", "TIME_18"),
            ],
            [
              Markup.button.callback(
                lang.mainMenu || "⬅️ Головне меню",
                "RETURN_MAIN_MENU"
              ),
            ],
          ]).reply_markup,
        });
      } catch (error) {
        console.error("Error in service selection:", error);
      }
    });
  });

  // Обробка вибору години
  ["TIME_9", "TIME_12", "TIME_15", "TIME_18"].forEach((timeKey) => {
    bot.action(timeKey, async (ctx) => {
      try {
        const chatId = ctx.chat.id;
        const userData = getUserData(chatId);
        const langCode = userData?.language || "uk";
        const lang = t[langCode];
        const time = timeKey.replace("TIME_", "").replace("_", ":");

        setUserData(chatId, { time });

        await ctx.editMessageText(
          `${lang.thanks || "Дякуємо!"} ${
            lang.book || "Ви записані на"
          } ${time}`
        );
      } catch (error) {
        console.error("Error in time selection:", error);
      }
    });
  });

  // Обробка кнопки повернення до головного меню
  bot.action("RETURN_MAIN_MENU", async (ctx) => {
    try {
      const chatId = ctx.chat.id;
      const userData = getUserData(chatId);
      const langCode = userData?.language || "uk";

      await showMainMenu(ctx, langCode);
    } catch (error) {
      console.error("Error returning to main menu:", error);
    }
  });
}

module.exports = handleTimeSelection;
