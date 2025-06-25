const { Markup } = require("telegraf");
const t = require("../utils/translate");
const { getUserData } = require("../data/users");

function showMainMenu(ctx, langCode) {
  const lang = t[langCode];
  console.log(lang.book);
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
function showAdminMainMenu(ctx, langCode) {
  const lang = t[langCode];
  console.log(lang.book);
  ctx.reply(
    lang.adminTitle,
    Markup.keyboard([
      [lang.viewAllRecords, lang.blockDate],
      [lang.blockHours, lang.addPortfolio],
    ])
      .oneTime()
      .resize()
  );
}

module.exports = { showMainMenu, showAdminMainMenu };
