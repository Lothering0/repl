const repl = require("repl");
const util = require("util");
const path = require("path");

const package = require("./package.json");
const dayjs = require("dayjs");

require("@colors/colors");
require("./fp.js");

const icons = {
  js: "",
  prompt: ">=>",
  output: "->",
  node: "",
};

console.log("");
const nodeVersion = "".green + (" " + icons.node + "  " + process.version + " ").brightWhite.bgGreen + "".green;
console.log(nodeVersion + "  " + package.version);

const prompt = icons.js.yellow + " " + icons.prompt.green + " ";

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

// local.displayPrompt(true);

local.context.dayjs = dayjs;
