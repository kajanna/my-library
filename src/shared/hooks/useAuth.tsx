import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";


function useAuth() {
    const [ user, setUser ] = useState<{} | null>();
    const [ loading, setLoading ] = useState(false);
    const [ authError, setAuthError ] = useState<string | null>();

    const navigate = useNavigate();
    const auth = getAuth();

    async function register (email:string, password:string, name: string) {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(name);
            setUser(user);
            setLoading(false);
            navigate("/my-library");
          })
          .catch((err) => {
            const autError = err.message;
            setAuthError(autError);
            setLoading(false);
          });
    }

    async function login (email: string, password:string) {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            setLoading(false);
            navigate("/my-library");
        })
        .catch((err) => {
            const autError = err.message;
            setAuthError(autError);
            setLoading(false);
        });
    }
    function logout () {
        setUser(null);
        navigate("/auth");
    }

    async function authCheck() {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              setLoading(false);
            } else {
                logout();
                setLoading(false);
            }
          });
    }

    
    return { user, loading, authError, register, login, logout, authCheck }
}

export default useAuth;