// Libs
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Components
import { Orders } from '../screens/Orders';
import { Home } from '../screens/Home';
import { BottomMenu } from '../components/BottomMenu';
import firebase from '../config/firebase';

// Constants
const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
    const { COLORS } = useTheme();
    const [notifications, setNotifications] = useState('0');
    useEffect(() => {
        const subscribe = firebase.firestore.collection('orders')
            .where('status', '==', 'Pronto')
            .onSnapshot(querySnapshot => {
                setNotifications(String(querySnapshot.docs.length));
            });
        return () => subscribe();
    }, [])
    return (
        <Navigator screenOptions={{
            tabBarActiveTintColor: COLORS.SECONDARY_900,
            tabBarInactiveTintColor: COLORS.SECONDARY_400,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 80,
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            }
        }}>
            <Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => (
                    <BottomMenu title="Cardápio" color={color} />
                )
            }} />
            <Screen name="Orders" component={Orders} options={{
                tabBarIcon: ({ color }) => (
                    <BottomMenu title="Pedidos" color={color} notifications={notifications} />
                )
            }} />
        </Navigator>
    );
}