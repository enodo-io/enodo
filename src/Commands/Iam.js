import ACommand from './ACommand.js';
import Identify from './Iam/Identify.js';
import GetAccessToken from './Iam/GetAccessToken.js';
import ReadAccessToken from './Iam/ReadAccessToken.js';

class Iam extends ACommand {
  constructor(args) {
    super(args, false);
  }

  async exec() {
    const commands = {
      identify: Identify,
      getAccessToken: GetAccessToken,
      readAccessToken: ReadAccessToken,
    };

    if (!this.args._.length && (this.args.h || this.args.help)) {
      this.help();
    }
    if (!this.args._.length) {
      this.usage();
    }
    if (!(this.args._[0] in commands)) {
      console.error('npx enodo iam: command not found\n');
      this.usage();
    }

    await new commands[this.args._[0]](this.args);
  }

  help() {
    console.log(
      'Usage: npx enodo iam <command> [options]\n' +
        '\n' +
        'Commands:\n' +
        '\n' +
        '  identify\t\tCreate a new Enodo session\n' +
        '    -u, --username\tusername used to create session\n' +
        '    -p, --password\tpassword associated with username\n' +
        '\n' +
        '  getAccessToken\tGet access_token and refresh if necessary\n' +
        '\n' +
        '  readAccessToken\tRead JSON Content of access_token stored in ~/.enodo',
    );
    process.exit(0);
  }

  usage() {
    console.error(
      'usage: npx enodo iam <command> [options]\n' +
        '\n' +
        'npx enodo iam -h, --help\tall available commands and options\n' +
        'npx enodo iam <command> -h\thelp on a specific command',
    );
    process.exit(1);
  }
}

export default Iam;
