#!/usr/bin/env node
const fs = require('fs');
const extract = require('extract-zip');
let targetMarkdown = process.argv[2];

const content = fs.readFileSync(targetMarkdown, 'utf-8');
const prefix = `---\n<div id="zip-data" style="display: none">`
const suffix = `</div>`
const idx = content.indexOf(prefix);
// console.log(idx + prefix.length);
const base64Part = content.substring(idx + prefix.length, content.length - suffix.length);
// console.log(base64Part);

async function extractZipFromBase64(base64Data) {
    fs.writeFileSync("out.zip", base64Data, 'base64');
    await extract("out.zip", { dir: process.cwd() });
    fs.unlinkSync('out.zip');
}

extractZipFromBase64(base64Part);
