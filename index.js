const repl = require("repl");
const util = require("util");
const path = require("path");

const package = require("./package.json");
const readlineVim = require("readline-vim");
const dayjs = require("dayjs");

require("@colors/colors");
require("./fp.js");

/** @constant */
const icons = {
  js: "",
  prompt: {
    insert: ">=>",
    normal: "<=<",
  },
  output: "->",
  node: "",
};

/** @constant */
const colors = {
  prompt: {
    insert: "green",
    normal: "cyan",
  },
};

console.log("");
const nodeVersion = "".green + (" " + icons.node + "  " + process.version + " ").brightWhite.bgGreen + "".green;
console.log(nodeVersion + "  " + package.version);

/**
 * @param {keyof typeof icons["prompt"]} mode
 * @returns {string}
 */
const getPrompt = (mode) => {
  const promptColor = colors.prompt[mode];
  return icons.js.yellow + " " + icons.prompt[mode][promptColor] + " ";
};

const prompt = getPrompt("insert");

const local = repl.start({
  prompt,
  useColors: true,
  replMode: repl.REPL_MODE_STRICT,
  writer(output) {
    return icons.output.cyan + " " + util.inspect(output, { colors: true, depth: 20 }) + "\n";
  },
});

local.setupHistory(path.resolve(__dirname, "./history.txt"), (error) => {
  if (error) throw error;
});

local.context.dayjs = dayjs;

const vim = readlineVim(local);

vim.events.on("normal", () => {
  local.setPrompt(getPrompt("normal"));
});

vim.events.on("insert", () => {
  local.setPrompt(getPrompt("insert"));
});

// TODO: https://stackoverflow.com/questions/62323316/how-to-modify-cursor-line-in-node-js-readline
