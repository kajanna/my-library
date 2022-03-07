import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

interface FirebaseAuthError {
  code: string;
}

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>();

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const usersRef = collection(db, "users");

  //util function - provides custom Error messages
  function setErrorMessage(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "this email is already in use, please use another email or try to login.";
      case "auth/invalid-email":
        return "email address is incorrect";
      case "auth/weak-password":
        return "password should be at least 8 characters long";
      case "auth/user-disabled":
        return "this user has been disabled";
      case "auth/user-not-found":
        return "no user found, check your email address";
      case "auth/wrong-password":
        return "wrong password provided for that user";
      default:
        return "something went wrong, please try again";
    }
  }

  async function register(email: string, password: string, name: string) {
    setLoading(true);
    let uid: string | null = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      uid = userCredential.user.uid;
      await setDoc(doc(usersRef, uid), {
        name: name,
      });
      setLoading(false);
      return uid;
    } catch (error) {
      const err = error as FirebaseAuthError;
      const errorMessage = setErrorMessage(err.code);
      setAuthError(errorMessage);
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return user;
    } catch (error) {
      const err = error as FirebaseAuthError;
      const errorMessage = setErrorMessage(err.code);
      setAuthError(errorMessage);
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
    } catch (error) {
      const err = error as FirebaseAuthError;
      const errorMessage = setErrorMessage(err.code);
      setAuthError(errorMessage);
      setLoading(false);
    }
  }

  function clearAuthError() {
    setAuthError(null);
  }

  return { loading, authError, register, login, logout, clearAuthError };
}

export default useAuth;
