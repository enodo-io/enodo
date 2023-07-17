import path from 'path';
import os from 'os';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import forEach from 'lodash/forEach.js';
import map from 'lodash/map.js';
import config from '../../configs/iam.js';
import ACommand from '../ACommand.js';
import getOrRefreshTokens from '../Iam/getOrRefreshTokens.js';
import cmdError from '../../helpers/cmdError.js';
import uploadFile from '../../helpers/uploadFile.js';

const dotfile = path.resolve(os.homedir(), '.enodo');
dotenv.config({ path: dotfile })

class Upload extends ACommand {
  async exec() {
    if (this.args._.length < 1) {
      console.error('Error: Must specify a file');
      this.usage();
    }

    const files = this.args._;
    const accessToken = process.env.ACCESS_TOKEN;
    const refreshToken = process.env.REFRESH_TOKEN;
    const createdFrom = this.args.createdFrom || null;
    let token = this.args.t || this.args.token || accessToken;

    try {
      jwt.verify(token, config.publicKey);
    } catch (e) {
      if (this.args.t || this.args.token) {
        cmdError(e);
      }
      if (!refreshToken) {
        cmdError(null, 'Must identify with \'npx enodo iam identify\'')
      }
      try {
        const res = await getOrRefreshTokens({}, refreshToken);
        token = res.access_token;
      } catch (err) {
        cmdError(err);
      }
    }

    try {
      const calls = [];
      forEach(files, (file) => {
        calls.push(uploadFile(token, file, createdFrom));
      });

      const results = map(await Promise.all(calls), (r) => r.data);

      forEach(results, (result, idx) => {
        console.log(`Uploaded '${files[idx]}' with new documentId '${result.id}'`);
        console.log(`Uploaded '${files[idx]}' with new documentId '${result.attributes.name}'`);
      });
    } catch (e) {
      cmdError(e);
    }
  }

  help() {
    console.log(
      'Usage: npx enodo fs upload [options] file ...\n' +
        '\n' +
        'Options:\n' +
        '  -t, --token\t\tUse token instead of the one stored in ~/.enodo',
        '  --createdFrom\t\tSpecify tool used to create this file',
    );
    process.exit(0);
  }

  usage() {
    console.error('usage: npx enodo fs upload [options] file ...');
    process.exit(1);
  }

}

export default Upload;
