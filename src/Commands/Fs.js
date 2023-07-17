import ACommand from './ACommand.js';
import Upload from './Fs/Upload.js';

class Fs extends ACommand {
  constructor(args) {
    super(args, false);
  }

  async exec() {
    const commands = {
      upload: Upload,
    };

    if (!this.args._.length && (this.args.h || this.args.help)) {
      this.help();
    }
    if (!this.args._.length) {
      this.usage();
    }
    if (!(this.args._[0] in commands)) {
      console.error('npx enodo fs: command not found\n');
      this.usage();
    }

    await new commands[this.args._[0]](this.args);
  }

  help() {
    console.log(
      'Usage: npx enodo fs <command> [options]\n' +
        '\n' +
        'Commands:\n' +
        '\n' +
        '  upload file\t\tUpload a new file\n' +
        '    -t, --token\t\tUse token instead of the stored one in ~/.enodo',
    );
    process.exit(0);
  }

  usage() {
    console.error(
      'usage: npx enodo fs <command> [options]\n' +
        '\n' +
        'npx enodo fs -h, --help\t\tall available commands and options\n' +
        'npx enodo fs <command> -h\thelp on a specific command',
    );
    process.exit(1);
  }
}

export default Fs;
