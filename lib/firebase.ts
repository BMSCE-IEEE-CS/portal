import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FIREBASE_DEV_API_KEY
      : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FIREBASE_DEV_AUTH_DOMAIN
      : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FIREBASE_DEV_PROJECT_ID
      : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FIREBASE_DEV_STORAGE_BUCKET
      : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FIREBASE_DEV_MESSAGING_SENDER_ID
      : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FIREBASE_DEV_APP_ID
      : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FIREBASE_DEV_MEASUREMENT_ID
      : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
