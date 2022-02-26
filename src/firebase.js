import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOH2guguihKHWw6O9hva6RKj0FKt_qsig",
  authDomain: "dino-run-b2fa1.firebaseapp.com",
  projectId: "dino-run-b2fa1",
  storageBucket: "dino-run-b2fa1.appspot.com",
  messagingSenderId: "487118341497",
  appId: "1:487118341497:web:765114805007544b1ddba8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

  return auth.signInWithPopup(provider);
};

export default firebaseApp;
