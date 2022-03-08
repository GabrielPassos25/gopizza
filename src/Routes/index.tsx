// Libs
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Components
import { SignIn } from '../screens/SignIn';
import { useAuth } from '../hooks/auth';
import { UserStackRoutes } from './user.stack.routes';

// Renderer
export function Routes() {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {
                user ? <UserStackRoutes /> : <SignIn />
            }
        </NavigationContainer>
    );
}