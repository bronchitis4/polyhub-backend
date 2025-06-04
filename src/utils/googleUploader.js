import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: 'polyhub-a0552ac28054.json', // файл із Google Cloud Console
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
