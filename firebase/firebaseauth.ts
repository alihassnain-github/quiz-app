import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { app } from "./firebaseconfig";

const auth = getAuth(app);

export function signupWithEmailPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
};

export function loginWithEmailPassword(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
};

export function logout() {
    return signOut(auth);
};

export function sendEmail() {
    const user = auth.currentUser;

    if (user)
        return sendEmailVerification(auth.currentUser);
}