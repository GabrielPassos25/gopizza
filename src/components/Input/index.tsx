// Libs
import React from 'react';
import { TextInputProps } from 'react-native';

// Styles
import { Container, InputProps } from './styles';

// Types
type Props = TextInputProps & {
    type?: InputProps;
}

// Renderer
export function Input({ type = 'primary', ...rest }: Props) {
    return (
        <Container type={type} {...rest}>

        </Container>
    );
}