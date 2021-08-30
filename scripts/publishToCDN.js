const fs = require('fs');
const fsP = require('fs/promises');
const path = require('path');
const got = require('got');
const pkg = require('../package.json');

const LOCAL_DIST_PATH = path.join(__dirname, '../dist');
const CDN_FOLDER_PATH = pkg.name
const STORAGE_API_URL = 'https://api-storage.cloud.toast.com/v1';
const IDENTITY_API_URL = 'https://api-identity.infrastructure.cloud.toast.com/v2.0';

const TENANT_ID = process.env.TOAST_CLOUD_TENENTID;
const STORAGE_ID = process.env.TOAST_CLOUD_STORAGEID;
const TOAST_CLOUD_USERNAME = process.env.TOAST_CLOUD_USERNAME;
const TOAST_CLOUD_PASSWORD = process.env.TOAST_CLOUD_PASSWORD;

async function getCDNToken() {
  const payload = {
    auth: {
      tenantId: TENANT_ID,
      passwordCredentials: {
        username: TOAST_CLOUD_USERNAME,
        password: TOAST_CLOUD_PASSWORD,
      },
    },
  };
  const res = await got
    .post(`${IDENTITY_API_URL}/tokens`, {
      json: payload,
    })
    .json();

  return res.access.token.id;
}

async function getCDNContainer(token) {
  const res = await got(`${STORAGE_API_URL}/${STORAGE_ID}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token,
    },
  }).text();

  return `${res.trim()}/${CDN_FOLDER_PATH}`;
}

async function uploadToCDN(token, localPath, cdnPath) {
  const files = await fsP.readdir(localPath);
  files.forEach((filename) => {
    const objPath = `${cdnPath}/${filename}`;
    if (filename.match(/(js|css)$/)) {
      const readStream = fs.createReadStream(`${localPath}/${filename}`);
      const contentType = filename.endsWith('css') ? 'text/css' : 'text/javascript';

      got.put(`${STORAGE_API_URL}/${objPath}`, {
        headers: {
          'Content-Type': contentType,
          'X-Auth-Token': token,
        },
        body: readStream,
      });
    }
  });
}

async function publish() {
  const token = await getCDNToken();
  const container = await getCDNContainer(token);
  const cdnPath = `${STORAGE_ID}/${container}`;

  [`v${pkg.version}`, 'latest'].forEach((dir) => {
    uploadToCDN(token, LOCAL_DIST_PATH, `${cdnPath}/${dir}`).catch((e) =>
      console.error(`Uploading to ${dir} is failed: `, e)
    );
  });
}

publish().then(() => console.log('Publishing job is done.'));
