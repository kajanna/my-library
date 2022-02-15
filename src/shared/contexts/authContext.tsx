import { createContext, useEffect, useState } from 'react';

import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { User } from '../shared_interfaces';

interface AuthContextProviderProps {
    children: JSX.Element | JSX.Element[],
}
const AuthContext = createContext<User | null | undefined>(null);

export function AuthProvider({ children }: AuthContextProviderProps) {
    const auth = getAuth();
    const db = getFirestore();

    const [ user, setUser ] = useState<User | null | undefined>(null);
    
    async function getFullUserData(uid: string) {
        const loggedUserRef = doc(db, "users", uid);
        getDoc(loggedUserRef)
         .then((docSnap) => {
          if (docSnap.exists()) {
            setUser({
              name: docSnap.data().name,
              id: uid
            });
          } else {
            setUser(null);
          }
        });
      }
    useEffect(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                 getFullUserData(user.uid);
                 
                } else {
                 setUser(null);
                }
              });

    }, [])
    
    return (
        
        <AuthContext.Provider value={user}>
            {console.log(user)}
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContext;

  
  
