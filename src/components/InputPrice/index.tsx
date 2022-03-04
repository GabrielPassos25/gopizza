// Libs
import React from 'react';
import { TextInputProps } from 'react-native';

// Styles
import { Container, Input, Label, Size } from './styles';

// Types
type Props = TextInputProps & {
    size: string;
}

// Renderer
export function InputPrice({ size, ...rest }: Props) {
    return (
        <Container>
            <Size>
                <Label>
                    {size}
                </Label>
            </Size>
            <Label>
                R$
            </Label>
            <Input keyboardType='numeric' {...rest} />
        </Container>
    );
}