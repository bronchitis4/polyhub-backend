import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});


const driveService = google.drive({ version: 'v3', auth });

export async function uploadToDrive(fileObject, folderId = null) {
  const { originalname, buffer, mimetype } = fileObject;

  const fileMetadata = {
    name: originalname,
    ...(folderId && { parents: [folderId] }),
  };

  const media = {
    mimeType: mimetype,
    body: Buffer.from(buffer),
  };

  const response = await driveService.files.create({
    resource: fileMetadata,
    media: {
      mimeType: mimetype,
      body: Buffer.from(buffer),
    },
    fields: 'id, webViewLink',
  });

  const fileId = response.data.id;

  // Робимо файл публічним
  await driveService.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  const file = await driveService.files.get({
    fileId,
    fields: 'id, name, webViewLink',
  });

  return file.data; // Повертає id, name, webViewLink
}
