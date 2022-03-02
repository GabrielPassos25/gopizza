// Libs
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

// Styles
import { Container, ButtonProps, Load, Title } from './styles';

// Types
type Props = RectButtonProps & {
    title: string;
    type?: ButtonProps;
    isLoading?: boolean;
}

export function Button({ title, type = 'primary', isLoading = false, ...rest }: Props) {
    return (
        <Container type={type} enabled={!isLoading} {...rest}>
            {isLoading ? <Load /> : <Title>{title}</Title>}
        </Container>
    );
}