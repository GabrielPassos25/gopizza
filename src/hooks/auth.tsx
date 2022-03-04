// Libs
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import firebase from '../config/firebase';

// Types
type User = {
    id: string;
    name: string;
    isAdmin: boolean;
};

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    isLogging: boolean;
    user: User | null;
};

type AuthProviderProps = {
    children: ReactNode;
};

// Constants
const USER_COLLECTION = '@gopizza:users';

// Functions
function AuthProvider({ children }: AuthProviderProps) {
    const [isLogging, setIsLogging] = useState(false);
    const [user, setUser] = useState<User | null>(null)
    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe o e-mail e a senha.');
        }
        setIsLogging(true);
        firebase.auth.signInWithEmailAndPassword(email, password)
            .then(account => {
                firebase.firestore.collection('users').doc(account.user.uid).get().then(async profile => {
                    const { name, isAdmin } = profile.data() as User;
                    if (profile.exists) {
                        const userData = {
                            id: account.user.uid,
                            name,
                            isAdmin
                        };
                        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
                        setUser(userData);
                    }
                })
                    .catch(() => {
                        Alert.alert('Login', 'Erro ao buscar o perfil do usuário.');
                    })
            })
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
    async function signOut() {
        await firebase.auth.signOut();
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null);
    }
    async function loadUserStorageData() {
        setIsLogging(true);
        const storagedUser = await AsyncStorage.getItem(USER_COLLECTION);
        if (storagedUser) {
            const userData = JSON.parse(storagedUser) as User;
            setUser(userData);
        }
        setIsLogging(false);
    }
    async function forgotPassword(email: string) {
        if (!email) {
            return Alert.alert('Redefinir Senha', 'Informe o e-mail.');
        }
        firebase.auth.sendPasswordResetEmail(email)
            .then(() => Alert.alert('Redefinir Senha', 'E-mail para redefinição enviado com sucesso.'))
            .catch(() => Alert.alert('Redefinir Senha', 'Erro ao enviar e-mail para redefinição de senha.'));
    }
    useEffect(() => {
        loadUserStorageData();
    }, []);
    return (
        <AuthContext.Provider value={{ signIn, isLogging, user, signOut, forgotPassword }} >
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