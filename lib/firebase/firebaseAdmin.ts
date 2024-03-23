import "server-only";
import admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}
function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);
  if (admin.apps.length > 0) return admin.app();

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
  });
}

export async function initAdmin() {
  const projectId = process.env.PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (projectId && clientEmail && privateKey) {
    const params: FirebaseAdminAppParams = {
      projectId: projectId,
      clientEmail: clientEmail,
      privateKey: privateKey,
    };
    return createFirebaseAdminApp(params);
  } else throw new Error("No .env variables | error");
}
