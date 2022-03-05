// Libs
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';

// Styles
import { Container, Header, Greetings, GreetingsEmoji, GreetingsText, MenuHeader, MenuItemsNumber, Title } from './styles';

// Components
import happyEmoji from '../../assets/happy.png';
import { Search } from '../../components/Search';
import { ProductCard, ProductProps } from '../../components/ProductCard';
import firebase from '../../config/firebase';

// Renderer
export function Home() {
    const { COLORS } = useTheme();
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');
    function fetchPizzas(value: string) {
        const formatedValue = value.toLowerCase().trim();
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
    useEffect(() => {
        fetchPizzas('');
    }, [])
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
                    <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
                </TouchableOpacity>
            </Header>
            <Search onSearch={handleSearch} onClear={handleSearchClear} onChangeText={setSearch} value={search} />
            <MenuHeader>
                <Title>
                    Cardápio
                </Title>
                <MenuItemsNumber>
                    10 pizzas
                </MenuItemsNumber>
            </MenuHeader>
            <FlatList
                data={pizzas}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <ProductCard data={item} />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24

                }}
            />
        </Container>
    );
}