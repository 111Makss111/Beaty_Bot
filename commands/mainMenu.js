const { Markup } = require("telegraf");
const { setUserData, getUserData } = require("../data/users");
const t = require("../utils/translate");
function showMainMenu(ctx, langCode) {
  const lang = t[langCode];
  ctx.reply(
    lang.title,
    Markup.keyboard([
      [lang.profile, lang.book],
      [lang.cancel, lang.portfolio],
    ])
      .oneTime()
      .resize()
  );
}

module.exports = showMainMenu;
