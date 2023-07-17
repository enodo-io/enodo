class ACommand {
  constructor(args, help = true) {
    if (this.constructor === ACommand) {
      throw new TypeError('Abstract class "ACommand" cannot be instantiated directly');
    }

    this.args = args;
    this.args._ = this.args._.slice(1);
    if (help && (this.args.h || this.args.help)) {
      this.help();
      process.exit(0);
    }
    this.exec();
  }

  async exec() {
    throw new Error('Exec function not implemented');
  }

  help() {
    throw new Error('Help function not implemented');
  }

  usage() {
    throw new Error('Usage function not implemented');
  }
}

export default ACommand;
