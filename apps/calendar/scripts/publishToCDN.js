/* eslint-disable */
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const pkg = require('../package.json');

const LOCAL_DIST_PATH = path.join(__dirname, '../dist');
const STORAGE_API_URL = 'https://api-storage.cloud.toast.com/v1';
const IDENTITY_API_URL = 'https://api-identity.infrastructure.cloud.toast.com/v2.0';

const TOAST_CLOUD_TENANTID = process.env.TOAST_CLOUD_TENANTID;
const TOAST_CLOUD_STORAGEID = process.env.TOAST_CLOUD_STORAGEID;
const TOAST_CLOUD_USERNAME = process.env.TOAST_CLOUD_USERNAME;
const TOAST_CLOUD_PASSWORD = process.env.TOAST_CLOUD_PASSWORD;

async function getTOASTCloudContainer(token) {
  const response = await fetch(`${STORAGE_API_URL}/${TOAST_CLOUD_STORAGEID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token,
    },
  });
  const container = await response.text();

  return `${container.trim()}/calendar`;
}

async function getTOASTCloudToken() {
  const data = {
    auth: {
      tenantId: TOAST_CLOUD_TENANTID,
      passwordCredentials: {
        username: TOAST_CLOUD_USERNAME,
        password: TOAST_CLOUD_PASSWORD,
      },
    },
  };

  const response = await fetch(`${IDENTITY_API_URL}/tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result.access.token.id;
}

function publishToCdn(token, localPath, cdnPath) {
  const files = fs.readdirSync(localPath);

  files.forEach((fileName) => {
    const objectPath = `${cdnPath}/${fileName}`;

    if (fileName.match(/.(js|css|svg)$/)) {
      const readStream = fs.createReadStream(`${localPath}/${fileName}`);
      const contentType = /css$/.test(fileName)
        ? 'text/css'
        : /js$/.test(fileName)
        ? 'text/javascript'
        : 'image/svg+xml';

      fetch(`${STORAGE_API_URL}/${objectPath}`, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
          'X-Auth-Token': token,
        },
        body: readStream,
      });
    } else {
      publishToCdn(token, `${localPath}/${fileName}`, objectPath);
    }
  });
}

async function publish() {
  const token = await getTOASTCloudToken();
  const container = await getTOASTCloudContainer(token);
  const cdnPath = `${TOAST_CLOUD_STORAGEID}/${container}`;

  [`v${pkg.version}`, 'latest'].forEach((dir) => {
    publishToCdn(token, LOCAL_DIST_PATH, `${cdnPath}/${dir}`);
  });
}

publish();
