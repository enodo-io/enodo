import inquirer from 'inquirer';
import ACommand from '../ACommand.js';
import getOrRefreshTokens from './getOrRefreshTokens.js';
import cmdError from '../../helpers/cmdError.js';

class Identify extends ACommand {
  async exec() {
    const opt = {
      username: this.args.u || this.args.username,
      password: this.args.p || this.args.password,
    };

    const questions = [];

    if (!opt.username) {
      questions.push({
        type: "input",
        name: "username",
        message: "Enter username or email",
      });
    }
    if (!opt.password) {
      questions.push({
        type: "password",
        name: "password",
        message: "Enter password",
      });
    }

    const answers = await inquirer.prompt(questions);

    const username = opt.username || answers.username;
    const password = opt.password || answers.password;

    try {
      await getOrRefreshTokens({
        username,
        password
      });

      console.log('Successfully connected.')
      console.log('Use npx enodo iam getAccessToken to retrieve credential')
      process.exit(0);
    } catch (e) {
      cmdError(e)
    }
  }

  help() {
    console.log(
      'Usage: npx enodo iam identify [options]\n' +
        '\n' +
        'Options:\n' +
        '\n' +
        '  -u, --username\tusername used to create session\n'+
        '  -p, --password\tpassword associated with username',
    );
    process.exit(0);
  }

  usage() {
    console.error('usage: npx enodo iam identify [options]');
    process.exit(1);
  }

}

export default Identify;
