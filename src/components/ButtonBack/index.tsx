// Libs
import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

// Styles
import { Container } from './styles';

// Renderer
export function ButtonBack({ ...rest }: TouchableOpacityProps) {
    const { COLORS } = useTheme();
    return (
        <Container {...rest}>
            <MaterialIcons name='chevron-left' size={18} color={COLORS.TITLE} />
        </Container>
    );
}