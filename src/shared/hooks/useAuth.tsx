import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore, collection, setDoc, doc, } from 'firebase/firestore';



function useAuth() {
    const [ loading, setLoading ] = useState(false);
    const [ authError, setAuthError ] = useState<string | null>();

    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();
    const usersRef = collection(db, "users");
    

    async function register(email: string, password: string, name: string) {
      setLoading(true);
      let uid: string | null = null;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          uid = userCredential.user.uid
          setDoc(doc(usersRef, uid), {
            name: name,
          });
        })
        .then(()=> {
          setLoading(false);
          navigate("/my-library");
        })
        .catch((err) => {
          const autError = err.message;
          setLoading(false);
          setAuthError(autError);
        });
    }

    async function login(email: string, password: string) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoading(false);
          navigate("/my-library");
        })
        .catch((err) => {
          setAuthError(err.message);
          setLoading(false);
        });
    }

    function logout () {
      setLoading(true);
      signOut(auth).then(() => {
        setLoading(false);
        navigate("/auth");
      }).catch((err) => {
        setAuthError(err.message);
        setLoading(false);
      });
        
    }

    function clearAuthError () {
      setAuthError(null)
    }

    
    return { loading, authError, register, login, logout, clearAuthError }
}

export default useAuth;