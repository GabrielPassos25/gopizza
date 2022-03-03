// Libs
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';

// Constants
import auth from '../config/firebase';

// Types
type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    isLogging: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

// Functions
function AuthProvider({ children }: AuthProviderProps) {
    const [isLogging, setIsLogging] = useState(false);
    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe o e-mail e a senha.');
        }
        setIsLogging(true);
        auth.signInWithEmailAndPassword(email, password)
            .then(account => { console.log(account) })
            .catch(error => {
                const { code } = error;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    Alert.alert('Login', 'E-mail e/ou senha incorretos.');
                }
                else {
                    Alert.alert('Login', 'Erro ao fazer login. Tente novamente!');
                }
            })
            .finally(() => setIsLogging(false));
    }
    return (
        <AuthContext.Provider value={{ signIn, isLogging }} >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

// Exports

export const AuthContext = createContext({} as AuthContextData);
export { AuthProvider, useAuth };