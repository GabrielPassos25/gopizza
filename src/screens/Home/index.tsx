// Libs
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

// Styles
import { Container, Header, Greetings, GreetingsEmoji, GreetingsText } from './styles';

// Components
import happyEmoji from '../../assets/happy.png';

// Renderer
export function Home() {
    const { COLORS } = useTheme();
    return (
        <Container>
            <Header>
                <Greetings>
                    <GreetingsEmoji source={happyEmoji} />
                    <GreetingsText>
                        Olá, Admin
                    </GreetingsText>
                </Greetings>
                <TouchableOpacity>
                    <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
                </TouchableOpacity>
            </Header>
        </Container>
    );
}