#!/usr/bin/env node

import minimist from 'minimist';
import Iam from './src/Commands/Iam.js';
import Fs from './src/Commands/Fs.js';

const args = minimist(process.argv.slice(2));

if (args.v || args.V || args.version) {
  console.log(process.env.npm_package_version);
  process.exit(0);
}
if (args._.length < 1) {
  if (args.h || args.help) {
    console.log(
      'Usage: npx enodo <command> [options]\n' +
        '\n' +
        'Options:\n' +
        '\n' +
        '  -v, -V, --version\toutput the version number\n' +
        '  -h, --help\t\toutput usage information\n' +
        '\n' +
        'Commands:\n' +
        '\n' +
        '  iam identify\t\tCreate a new Enodo session\n' +
        '  iam getAccessToken\tGet access token and refresh if necessary\n' +
        '  iam readAccessToken\tRead JSON Content of access_token stored in ~/.enodo\n' +
        '\n' +
        '  fs upload\t\tUpload a new file',
    );
    process.exit(0);
  }
  console.error(
    'usage: npx enodo <command> [options]\n' +
      '\n' +
      'npx enodo -h, --help\tall available commands and options\n' +
      'npx enodo <command> -h\thelp on a specific command',
  );
  process.exit(1);
}

const commands = {
  iam: Iam,
  fs: Fs,
};

if (!(args._[0] in commands)) {
  console.error(
    'npx enodo: command not found\n' +
      'usage: npx enodo <command> [options]\n' +
      '\n' +
      'npx enodo -h, --help\tall available commands and options\n' +
      'npx enodo <command> -h\thelp on a specific command',
  );
  process.exit(1);
}

new commands[args._[0]](args);
