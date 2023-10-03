#!/usr/bin/env node

import { setTimeout } from 'timers/promises';
import clipboardy from 'clipboardy';

const CLIPBOARD_OPTION = "--clipboard";

async function main () {


  const args = process.argv.slice(2);
  const shouldCopyToClipboard = args.includes(CLIPBOARD_OPTION);
  const labels = args.filter((arg)=>arg !== CLIPBOARD_OPTION );

  function run () {
    const remainLabels = labels.slice();
    const randomLabels = [];
    while (remainLabels.length > 0) {
      const index = Math.floor(Math.random() * remainLabels.length);
      randomLabels.push(remainLabels[index]);
      remainLabels.splice(index, 1);
    }
    return randomLabels;
  }

  let randomLabels;

  const runCount = 100;
  for (let i = 0; i < runCount; i += 1) {
    await setTimeout(10);
    randomLabels = run();
    process.stdout.write('\r');
    process.stdout.clearLine();
    process.stdout.write(randomLabels.join(' => '));
  }

  process.stdout.write('\n');

  if (shouldCopyToClipboard) {
    const randomLabelsMarkdown = randomLabels
        .map((name) => `* ${name}`)
        .join('\n');
    clipboardy.writeSync(randomLabelsMarkdown);
  }

}

main();
