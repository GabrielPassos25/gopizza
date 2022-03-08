// Libs
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

// Styles
import { Container, Radio, Selected, RadioButtonProps, Title } from './styles';

type Props = TouchableOpacityProps & RadioButtonProps & {
    title: string;
}

// Renderer
export function RadioButton({ title, selected = false, ...rest }: Props) {
    return (
        <Container selected={selected} {...rest}>
            <Radio>
                {selected && <Selected />}
            </Radio>
            <Title>
                {title}
            </Title>
        </Container>
    );
}