import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBYxCQy8kcqq3GLAF8r5_mNu9Rsvuje26o',
	authDomain: 'politicalflashback.firebaseapp.com',
	projectId: 'politicalflashback',
	storageBucket: 'politicalflashback.firebasestorage.app',
	messagingSenderId: '681508714390',
	appId: '1:681508714390:web:e668c45aab5957ee988fb7',
	measurementId: 'G-3MM074N0T9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== 'undefined') {
	analytics = getAnalytics(app);
}

export { app, analytics, db };
