#!/usr/bin/env node

import { setTimeout } from 'timers/promises';
import clipboardy from 'clipboardy';
import { spawn } from 'child_process';

const CLIPBOARD_OPTION = "--clipboard";

async function main () {

  const args = process.argv.slice(2);
  const shouldCopyToClipboard = args.includes(CLIPBOARD_OPTION);
  const labels = args.filter((arg) => arg !== CLIPBOARD_OPTION);
  const isWayland = process.env.XDG_SESSION_TYPE === 'wayland';

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
      .map((name) => `- ${name}`)
      .join('\n');

    clipboardy.write(randomLabelsMarkdown)
      .catch((error) => {
        if (!error.message.includes("Couldn't find the `xsel` binary and fallback didn't work.") || !isWayland) {
          console.error(error);
        }
      });

    // workaround because `clipboardy` does not support Wayland (https://github.com/sindresorhus/clipboardy/issues/38)
    // we silence errors because gnome users may not need/have wl-copy even on wayland, gnome makes xclip / xsel work anyway
    if (isWayland) {
      // `--` is used so that "- toto\n-tata" is not interpreted as an option
      spawn("wl-copy", ["--", randomLabelsMarkdown], { stdio: "ignore" }).on(
        "error",
        () => {},
      );
    }
  }
}

main();
