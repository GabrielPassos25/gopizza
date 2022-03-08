// Libs
import React, { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Styles
import { Container, Header, Greetings, GreetingsEmoji, GreetingsText, MenuHeader, MenuItemsNumber, Title, NewProductButton } from './styles';

// Components
import happyEmoji from '../../assets/happy.png';
import { Search } from '../../components/Search';
import { ProductCard, ProductProps } from '../../components/ProductCard';
import firebase from '../../config/firebase';
import { useAuth } from '../../hooks/auth';

// Renderer
export function Home() {
    const { COLORS } = useTheme();
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const { signOut, user } = useAuth();
    function fetchPizzas(value: string) {
        const formatedValue = value.toLowerCase().trim();
        console.log(formatedValue);
        firebase.firestore.collection('pizzas')
            .orderBy('name_insensitive')
            .startAfter(formatedValue)
            .endAt(`${formatedValue}\uf8ff`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }) as ProductProps[];
                setPizzas(data);
            })
            .catch(() => {
                Alert.alert('Consulta', 'Não foi possível realizar a consulta');
            });
    }
    function handleSearch() {
        fetchPizzas(search);
    }
    function handleSearchClear() {
        setSearch('');
        fetchPizzas('');
    }
    function handleOpen(id: string) {
        const route = user?.isAdmin ? 'Product' : 'Order';
        navigation.navigate(route, { id });
    }
    function handleAdd() {
        navigation.navigate('Product', {});
    }

    useFocusEffect(useCallback(() => {
        fetchPizzas('');
    }, []));
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
                    <MaterialIcons name="logout" color={COLORS.TITLE} size={24} onPress={signOut} />
                </TouchableOpacity>
            </Header>
            <Search onSearch={handleSearch} onClear={handleSearchClear} onChangeText={setSearch} value={search} />
            <MenuHeader>
                <Title>
                    Cardápio
                </Title>
                <MenuItemsNumber>
                    {pizzas.length} pizzas
                </MenuItemsNumber>
            </MenuHeader>
            <FlatList
                data={pizzas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard data={item} onPress={() => handleOpen(item.id)} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24

                }}
            />
            {
                user?.isAdmin && (
                    <NewProductButton title="Cadastrar Pizza" type="secondary" onPress={handleAdd} />
                )
            }
        </Container>
    );
}