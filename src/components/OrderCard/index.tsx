// Libs
import React from 'react';
import { ActivityIndicator, TouchableOpacityProps, View } from 'react-native';

// Styles
import { Container, Description, Image, Name, StatusContainer, StatusLabel, StatusTypesProps } from './styles';

// Types
export type OrderProps = {
    id: string;
    pizza: string;
    image: string;
    status: StatusTypesProps;
    table_number: string;
    quantity: string;
}

type Props = TouchableOpacityProps & {
    index: number;
    data: OrderProps;
}

// Renderer
export function OrderCard({ index, data, ...rest }: Props) {
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <Container index={index} {...rest}>
            <Image style={{ display: isLoading ? 'none' : 'flex' }} source={{ uri: data.image }} onLoadStart={() => setIsLoading(true)} onLoadEnd={() => setIsLoading(false)} />
            {
                isLoading &&
                <View style={{ width: 104, height: 104, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            }
            <Name>
                {data.pizza}
            </Name>
            <Description>
                Mesa {data.table_number} ⚬ Qnt: {data.quantity}
            </Description>
            <StatusContainer status={data.status}>
                <StatusLabel status={data.status}>
                    {data.status}
                </StatusLabel>
            </StatusContainer>
        </Container>
    );
}