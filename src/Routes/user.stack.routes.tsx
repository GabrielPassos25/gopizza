// Libs
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import { Product } from '../screens/Product';
import { Home } from '../screens/Home';
import { Order } from '../screens/Order';
import { useAuth } from '../hooks/auth';
import { UserTabRoutes } from './user.tab.routes';

// Constants
const { Navigator, Screen, Group } = createNativeStackNavigator();

// Renderer
export function UserStackRoutes() {
    const { user } = useAuth();
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            {
                user?.isAdmin ? (
                    <Group>
                        <Screen name="Home" component={Home} />
                        <Screen name="Product" component={Product} />
                    </Group>
                ) : (
                    <Group>
                        <Screen name="UserTabRoutes" component={UserTabRoutes} />
                        <Screen name="Order" component={Order} />
                    </Group>
                )
            }
        </Navigator>
    );
}