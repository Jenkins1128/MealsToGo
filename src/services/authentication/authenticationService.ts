import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
} from "@react-native-firebase/auth";

const auth = getAuth();

export const loginRequest = (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const registerRequest = (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> => createUserWithEmailAndPassword(auth, email, password);
