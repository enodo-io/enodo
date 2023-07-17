import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import config from '../configs/fs.js';

async function uploadFile(token, filepath, createdFrom = null) {
  const form = new FormData();
  const filename = filepath.replace(/^.*[\\/]/, '');
  const file = fs.readFileSync(filepath);
  form.append('file', file, filename);

  const params = createdFrom ? `?createdFrom=${createdFrom}` : '';
  const result = await axios.post(`${config.url}/documents/${params}`, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
}

export default uploadFile;
