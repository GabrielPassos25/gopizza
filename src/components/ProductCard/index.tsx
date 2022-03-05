// Libs
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

// Styles
import { Container, Content, Description, Details, Image, Line, Name, Identification } from './styles';
import { useTheme } from 'styled-components';

// Types
export type ProductProps = {
    id: string;
    photo_url: string;
    name: string;
    description: string;
}

type Props = RectButtonProps & {
    data: ProductProps;
}

// Renderer
export function ProductCard({ data, ...rest }: Props) {
    const { COLORS } = useTheme();
    return (
        <Container>
            <Content {...rest}>
                <Image source={{ uri: data.photo_url }} />
                <Details>
                    <Identification>
                        <Name>
                            {data.name}
                        </Name>
                        <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
                    </Identification>
                    <Description>
                        {data.description}
                    </Description>
                </Details>
            </Content>
            <Line />
        </Container>
    );
}