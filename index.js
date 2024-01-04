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
const vimMap = vim.map;

vim.events.on("normal", () => {
  local.setPrompt(getPrompt("normal"));
});

vim.events.on("insert", () => {
  local.setPrompt(getPrompt("insert"));
});

// FIXME: make normal mode when pressing "shift-space"
// vim.map.insert("meta-space", "esc");
// vim.map.insert("shift-space", "esc");
// vim.map.insert("space", "esc");
// vim.map.insert("ctrl-space", "esc");
// console.log(vim.map);

/* process.stdin.on("keypress", (ch, key) => {
  console.log('got "keypress"', ch, key);
  // if (!key || !key.ctrl || key.name !== 'c') return;
  // process.stdin.pause();
}); */

// TODO: https://stackoverflow.com/questions/62323316/how-to-modify-cursor-line-in-node-js-readline
// make syntax highlighting
