import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage';
import { info, debug, warn, error } from 'firebase-functions/lib/logger'

import serviceAccount from '../firebase-admin.json';

const defaultApp = initializeApp({
    credential: cert(serviceAccount as any),
    databaseURL: 'https://noopeshop.firebaseio.com',
    storageBucket: 'noopeshop.appspot.com',
});

export const firestore = getFirestore(defaultApp);

export const auth = getAuth(defaultApp);

export const storage = getStorage(defaultApp);

export const logger = { info, debug, warn, error, }