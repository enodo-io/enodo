import path from 'path';
import os from 'os';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import config from '../../configs/iam.js';
import ACommand from '../ACommand.js';
import cmdError from '../../helpers/cmdError.js';

const dotfile = path.resolve(os.homedir(), '.enodo');
dotenv.config({ path: dotfile })

class ReadAccessToken extends ACommand {
  async exec() {
    const accessToken = process.env.ACCESS_TOKEN;
    const refreshToken = process.env.REFRESH_TOKEN;

    if (!refreshToken || !accessToken) {
      cmdError('Must identify with \'npx enodo iam identify\'')
      process.exit(1);
    }
    try {
      const decoded = jwt.verify(accessToken, config.publicKey);
      console.log(decoded);
      process.exit(0);
    } catch (e) {
      cmdError(e);
      process.exit(1);
    }
  }

  help() {
    console.log('Usage: npx enodo iam readAccessToken');
    process.exit(0);
  }

  usage() {
    console.error('usage: npx enodo iam readAccessToken');
    process.exit(1);
  }

}

export default ReadAccessToken;
