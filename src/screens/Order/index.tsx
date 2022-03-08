// Libs
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Platform, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Components
import { ButtonBack } from '../../components/ButtonBack';
import { RadioButton } from '../../components/RadioButton';
import { PIZZA_TYPES } from '../../../utils/pizzaTypes';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import firebase from '../../config/firebase';
import { OrderNavigationProps } from '../../@types/navigation';
import { ProductProps } from '../../components/ProductCard';
import { useAuth } from '../../hooks/auth';

// Styles
import { Container, Header, Photo, Sizes, Form, FormRow, InputGroup, Label, Price, Title, ContentScroll } from './styles';

// Types
type PizzaResponse = ProductProps & {
    priceSizes: {
        [key: string]: number;
    }
}

// Renderer
export function Order() {
    const [size, setSize] = useState('');
    const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
    const [isLoading, setIsLoading] = React.useState(false);
    const [quantity, setQuantity] = useState(0);
    const [tableNumber, setTableNumber] = useState('');
    const [sendingOrder, setSendingOrder] = useState(false);
    const amount = size ? pizza.priceSizes[size] * quantity : '0,00';
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as OrderNavigationProps;
    const { user } = useAuth();
    function handleGoBack() {
        navigation.goBack();
    }
    function handleOrder() {
        if (!size) {
            Alert.alert('Pedido', 'Escolha um tamanho da pizza.');
            return;
        }
        if (!tableNumber) {
            Alert.alert('Pedido', 'Escolha um numero de mesa.');
            return;
        }
        if (!quantity) {
            Alert.alert('Pedido', 'Escolha uma quantidade de pizzas.');
            return;
        }
        setSendingOrder(true);
        firebase.firestore.collection('orders')
            .add({
                pizza: pizza.name,
                size,
                quantity,
                amount,
                table_number: tableNumber,
                status: 'Preparando',
                waiter_id: user?.id,
                image: pizza.photo_url
            })
            .then(() => {
                navigation.navigate('Home');
            })
            .catch(() => {
                Alert.alert('Pedido', 'Não foi possível realizar o pedido.');
                setSendingOrder(false);
            })

    }
    useEffect(() => {
        if (id) {
            firebase.firestore.collection('pizzas')
                .doc(id)
                .get()
                .then(response => setPizza(response.data() as PizzaResponse))
                .catch(() => Alert.alert('Erro', 'Não foi possível carregar a pizza'));
        }
    }, [id])
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ContentScroll showsVerticalScrollIndicator={false} bounces={false}>
                <Header>
                    <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
                </Header>

                <Photo style={{ display: isLoading ? 'none' : 'flex' }} source={{ uri: pizza.photo_url }} onLoadStart={() => setIsLoading(true)} onLoadEnd={() => setIsLoading(false)} />
                {
                    isLoading &&
                    <View style={{ width: 240, height: 240, alignItems: 'center', justifyContent: 'center', borderRadius: 120, alignSelf: 'center', position: 'relative' }}>
                        <ActivityIndicator />
                    </View>
                }
                <Form>
                    <Title>
                        {pizza.name}
                    </Title>
                    <Label>
                        Selecione um tamanho
                    </Label>
                    <Sizes>
                        {
                            PIZZA_TYPES.map(pizza => (
                                <RadioButton title={pizza.name} selected={size === pizza.id} key={pizza.id} onPress={() => setSize(pizza.id)} />
                            ))
                        }
                    </Sizes>
                    <FormRow>
                        <InputGroup>
                            <Label>
                                Número da mesa
                            </Label>
                            <Input keyboardType='numeric' onChangeText={setTableNumber} />
                        </InputGroup>
                        <InputGroup>
                            <Label>
                                Quantidade
                            </Label>
                            <Input keyboardType='numeric' onChangeText={(value) => setQuantity(Number(value))} />
                        </InputGroup>
                    </FormRow>
                    <Price>
                        Valor de R$ {amount}
                    </Price>
                    <Button title='Confirmar Pedido' isLoading={sendingOrder} onPress={handleOrder} />
                </Form>
            </ContentScroll>
        </Container>
    );
}