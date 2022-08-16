#!/usr/bin/env node

const program = require("commander");
const scan = require("./react");
const pick = require("./pick");
const exportJson = require("./exportJson");

program.parse(process.argv);

const command = program.args[0] || ".";

if (command === "scan") {
  console.log("---- start scan ----");
  scan.run();
}

if (command === "pick") {
  console.log("---- start pick ----");
  pick();
}

if (command === "exportJson") {
  console.log("---- start exportJson ----");
  exportJson();
}
