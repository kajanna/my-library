import { createContext } from 'react';
import useAuth  from '../hooks/useAuth';

interface AuthContextProviderProps {
    children: JSX.Element | JSX.Element[],
}
const AuthContext = createContext<{} | null | undefined>(null);

export function AuthProvider({ children }: AuthContextProviderProps) {
    const { user } = useAuth();
    return (
        <AuthContext.Provider value={user}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContext;