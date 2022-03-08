// Libs
import React, { useEffect } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

// Styles
import { Container, Content, Description, Details, Image, Line, Name, Identification } from './styles';
import { useTheme } from 'styled-components';
import { ActivityIndicator, View } from 'react-native';

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
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <Container>
            <Content {...rest}>
                <Image style={{ display: isLoading ? 'none' : 'flex' }} source={{ uri: data.photo_url }} onLoadStart={() => setIsLoading(true)} onLoadEnd={() => setIsLoading(false)} />
                {
                    isLoading &&
                    <View style={{ width: 104, height: 104, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator />
                    </View>
                }
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