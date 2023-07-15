import * as admin from 'firebase-admin';


export const DataBase = ({config}: any): admin.firestore.Firestore => {
    const { 
        apiKey, authDomain ,projectId, storageBucket, messagingSenderId, appId
    } = config;

    const serviceAccount = {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    
    
  return admin.firestore()
};