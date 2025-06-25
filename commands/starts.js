const fs = require("fs");
const t = require("../utils/translate");

function startCommand(bot) {
  bot.start((ctx) => {
    ctx.replyWithPhoto(
      { source: fs.createReadStream("./img/unnamed.png") },
      {
        caption: "👋 Ласкаво Просимо до NailTime A&Y / Witamy w NailTime A&Y",
        reply_markup: {
          keyboard: [[{ text: "🇺🇦 Українська" }, { text: "🇵🇱 Polska" }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
  });
}
module.exports = startCommand;
