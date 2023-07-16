import * as admin from 'firebase-admin';
import * as _firestore from '@google-cloud/firestore';
const serviceAccount = require("./firebaseInfo");

export const DataBase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    
    
  return admin.firestore()
};

export type dataBaseCollection = _firestore.Firestore