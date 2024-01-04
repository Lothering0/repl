[What is REPL and how to use it](https://nodejs.org/en/learn/command-line/how-to-use-the-nodejs-repl)

[REPL Docs](https://nodejs.org/api/repl.html)

Customized Node.js Read-Eval-Print-Loop (REPL). With Vim support, extra colorful icons, [Day.js](https://github.com/iamkun/dayjs) and custom pack of functional programming utils

# Installation and start
## Requirements
* [Node.js](https://nodejs.org/en/download/current)
* [Nerd Font](https://www.nerdfonts.com/) with ligatures
## How to install
```sh
git clone https://github.com/Lothering0/repl
cd repl
npm i
```
## How to run
```sh
# in repl directory
node index.js
```
# Alias as `js`
In your `.bashrc` or `.zshrc` add:
```sh
alias js="node <path-to-repl-dir>/index.js"
```
And then you can start a REPL session with command `js`:
```sh
js
```
