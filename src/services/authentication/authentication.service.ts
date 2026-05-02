import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const loginRequest = (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> =>
  auth().signInWithEmailAndPassword(email, password);

export const registerRequest = (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> =>
  auth().createUserWithEmailAndPassword(email, password);
