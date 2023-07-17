import path from 'path';
import fs from 'fs';
import os from 'os';
import axios from 'axios';
import dotenv from 'dotenv';
import config from '../../configs/iam.js';

const dotfile = path.resolve(os.homedir(), '.enodo');
dotenv.config({ path: dotfile })

async function getOrRefreshTokens(credentials = {}, refreshToken = null, write = true) {
  const headers = {
    'User-Agent': `enodo-cli/${process.env.npm_package_version}`,
    'Content-Type': 'application/json',
  };

  if (refreshToken) {
    headers.Authorization = `Bearer ${refreshToken}`;
  }

  const res = await axios.post(
    `${config.url}/jwt/`,
    credentials,
    { headers },
  );

  if (write) {
    fs.writeFileSync(
      dotfile,
      `REFRESH_TOKEN=${res.data.data.attributes.refresh_token || refreshToken}\n` +
        `ACCESS_TOKEN=${res.data.data.attributes.access_token}\n`,
    );
  }
  return res.data.data.attributes;
}

export default getOrRefreshTokens;
