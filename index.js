const repl = require("repl");
const util = require("util");
const path = require("path");

const package = require("./package.json");
const readlineVim = require("readline-vim");
const dayjs = require("dayjs");

require("@colors/colors");
require("./fp.js");

class Item {
  /**
   * @param {string} icon
   * @param {keyof import("@colors/colors").Color} color
   */
  constructor(icon, color) {
    this.icon = icon;
    this.color = color;
  }

  /** @returns {typeof this.icon} */
  get coloredIcon() {
    return this.icon[this.color];
  }
}

/** @constant */
const items = {
  js: new Item("", "yellow"),
  prompt: {
    insert: new Item(">=>", "green"),
    normal: new Item("<=<", "cyan"),
  },
  error: new Item("", "red"),
  output: new Item("->", "blue"),
  node: new Item("", "green"),
  welcomeBar: {
    leftCorner: new Item("", "green"),
    rightCorner: new Item("", "green"),
  },
};

const logEmptyLine = () => console.log("");
const logWelcome = () => {
  const {
    welcomeBar: { leftCorner, rightCorner },
  } = items;
  const nodeVersion = process.version;
  const content = ` ${items.node.icon}  ${nodeVersion} `.brightWhite.bgGreen;
  const bar = leftCorner.coloredIcon + content + rightCorner.coloredIcon;
  console.log(`${bar}  ${package.version}`);
};

logEmptyLine();
logWelcome();

/**
 * @param {keyof typeof items["prompt"]} mode
 * @returns {string}
 */
const getPrompt = (mode) => {
  const { js, prompt } = items;
  const promptMode = prompt[mode];
  return `${js.coloredIcon} ${promptMode.coloredIcon} `;
};

const prompt = getPrompt("insert");

const writeOutput = (output) => {
  const inspectedOutput = util.inspect(output, { colors: true, depth: 20 });
  return `${items.output.coloredIcon} ${inspectedOutput}\n`;
};

const writeError = (output) => `${items.error.coloredIcon}  ${output.toString().red}\n\n`;

const isOutputError = (output) => {
  if (!output?.toString || typeof output !== "object") return false;
  return new RegExp(/\w*Error:?/).test(output.toString());
};

const writer = (output) => (isOutputError(output) ? writeError(output) : writeOutput(output));

const replServer = repl.start({
  prompt,
  useColors: true,
  replMode: repl.REPL_MODE_STRICT,
  writer,
});

replServer.setupHistory(path.resolve(__dirname, "./history.txt"), (error) => {
  if (error) throw error;
});

replServer.context.dayjs = dayjs;

const vim = readlineVim(replServer);

vim.events.on("normal", () => {
  replServer.setPrompt(getPrompt("normal"));
});

vim.events.on("insert", () => {
  replServer.setPrompt(getPrompt("insert"));
});

// FIXME: make normal mode when pressing "shift-space"
// vim.map.insert("meta-space", "esc");
// vim.map.insert("shift-space", "esc");
// vim.map.insert("space", "esc");
vim.map.insert("ctrl-space", "esc");
vim.map.insert("ctrl-c", "esc");
// console.log(vim.map);

/* process.stdin.on("keypress", (ch, key) => {
  console.log('got "keypress"', ch, key);
  // if (!key || !key.ctrl || key.name !== 'c') return;
  // process.stdin.pause();
}); */

// TODO: https://stackoverflow.com/questions/62323316/how-to-modify-cursor-line-in-node-js-readline
// make syntax highlighting
