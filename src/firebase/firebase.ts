import { app } from "./config";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FirebaseLogin } from "../../@types";

const auth = getAuth(app);

export const login = ({ email, password }: FirebaseLogin) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) =>
        resolve({
          user: true,
          userEmail: res.user.email,
        })
      )
      .catch((err) => reject(err));
  });
};

export const Authenticate = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return resolve({
          user: true,
          userEmail: user.email,
        });
      } else {
        resolve({
          user: false,
          userEmail: null,
        });
      }
    });
  });
};

export const Logout = () => {
  return signOut(auth);
};
