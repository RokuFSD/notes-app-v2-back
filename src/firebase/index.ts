import admin from 'firebase-admin';
import config from '../config';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.projectID,
    clientEmail: config.clientEmail,
    privateKey: config.privateKey
  })
});

const auth = admin.auth();

export { auth };
