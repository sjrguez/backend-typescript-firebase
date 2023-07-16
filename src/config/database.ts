import * as admin from 'firebase-admin';
import * as _firestore from '@google-cloud/firestore';
import * as serviceAccount from './firebaseInfo.json'

export const DataBase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
    });
    
    
  return admin.firestore()
};

export type dataBaseCollection = _firestore.Firestore