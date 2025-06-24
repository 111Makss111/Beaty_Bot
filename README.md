# Beaty_Bot⬅️

bot.hears(["🇺🇦 Українська", "🇵🇱 Polska"], (ctx) => {
const text = ctx.message.text;
const chatId = ctx.chat.id;
const langCode = text === "🇺🇦 Українська" ? "uk" : "pl";
const lang = t[langCode];
setUserData(chatId, { language: langCode });
