const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const fs = require("fs");
const startCommand = require("./commands/starts");
const userName = require("./commands/username.js");
const bot = new Telegraf(process.env.BOT_TOKEN);
startCommand(bot);
userName(bot);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
