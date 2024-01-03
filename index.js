const repl = require("repl");
const dayjs = require("dayjs");

const local = repl.start(" >=> ");
local.context.dayjs = dayjs;
