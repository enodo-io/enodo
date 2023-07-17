import path from 'path';
import os from 'os';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import config from '../../configs/iam.js';
import ACommand from '../ACommand.js';
import getOrRefreshTokens from './getOrRefreshTokens.js';
import cmdError from '../../helpers/cmdError.js';

const dotfile = path.resolve(os.homedir(), '.enodo');
dotenv.config({ path: dotfile })

class GetAccessToken extends ACommand {
  async exec() {
    const accessToken = process.env.ACCESS_TOKEN;
    const refreshToken = process.env.REFRESH_TOKEN;

    if (!refreshToken || !accessToken) {
      cmdError(null, 'Must identify with \'npx enodo iam identify\'')
      process.exit(1);
    }
    try {
      jwt.verify(accessToken, config.publicKey);
      console.log(accessToken);
      process.exit(0);
    } catch (e) {
      try {
        const res = await getOrRefreshTokens({}, refreshToken);
        console.log(res.access_token);
        process.exit(0);
      } catch (err) {
        cmdError(err);
      }
    }
  }

  help() {
    console.log('Usage: npx enodo iam getAccessToken');
    process.exit(0);
  }

  usage() {
    console.error('usage: npx enodo iam getAccessToken');
    process.exit(1);
  }

}

export default GetAccessToken;
