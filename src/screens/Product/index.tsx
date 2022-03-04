// Libs
import React, { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Components
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import { InputPrice } from '../../components/InputPrice';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import firebase from '../../config/firebase';

// Styles
import { Container, Header, Title, DeleteLabel, PickImageButton, Upload, Form, InputGroup, InputGroupHeader, Label, MaxCharacters } from './styles';

// Renderer
export function Product() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    async function handlePickerImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });
            if (!result.cancelled) {
                setImage(result.uri);
            }
        }
    }
    async function handleAdd() {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });
        if (!name.trim()) {
            return Alert.alert('Cadastro', 'Preencha o nome do produto');
        }
        if (!description.trim()) {
            return Alert.alert('Cadastro', 'Preencha o descrição do produto');
        }
        if (!image) {
            return Alert.alert('Cadastro', 'Selecione a imagem do produto');
        }
        if (!priceSizeP || !priceSizeM || !priceSizeG) {
            return Alert.alert('Cadastro', 'Preencha o preço de todos os tamanhos do produto');
        }
        setIsLoading(true);
        const fileName = new Date().getTime();
        const reference = firebase.storage.ref(`pizzas/${fileName}.png`);
        await reference.put(blob);
        const photo_url = await reference.getDownloadURL();
        blob.close();

        firebase.firestore.collection('pizzas').add({
            name,
            name_insensitive: name.toLowerCase().trim(),
            description,
            priceSizes: {
                p: priceSizeP,
                m: priceSizeM,
                g: priceSizeG
            },
            photo_url,
            photo_path: reference.fullPath
        })
            .then(() => {
                Alert.alert('Cadastro', 'Produto cadastrado com sucesso');
            })
            .catch(() => {
                Alert.alert('Cadastro', 'Erro ao cadastrar produto. Tente Novamente!');
            })
        setIsLoading(false);
    }
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Header>
                <ButtonBack />
                <Title>
                    Cadastrar
                </Title>
                <TouchableOpacity>
                    <DeleteLabel>
                        Deletar
                    </DeleteLabel>
                </TouchableOpacity>
            </Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Upload>
                    <Photo uri={image} />
                    <PickImageButton title="Carregar" type="secondary" onPress={handlePickerImage} />
                </Upload>
                <Form>
                    <InputGroup>
                        <Label>
                            Nome
                        </Label>
                        <Input onChangeText={setName} value={name} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupHeader>
                            <Label>
                                Descrição
                            </Label>
                            <MaxCharacters>
                                (0 de 60 caracteres)
                            </MaxCharacters>
                        </InputGroupHeader>
                        <Input multiline maxLength={60} style={{ height: 80 }} onChangeText={setDescription} value={description} />
                    </InputGroup>
                    <InputGroup>
                        <Label>
                            Tamanhos e preços
                        </Label>
                        <InputPrice size="P" onChangeText={setPriceSizeP} value={priceSizeP} />
                        <InputPrice size="M" onChangeText={setPriceSizeM} value={priceSizeM} />
                        <InputPrice size="G" onChangeText={setPriceSizeG} value={priceSizeG} />
                    </InputGroup>
                    <Button title='Cadastrar pizza' isLoading={isLoading} onPress={handleAdd} />
                </Form>
            </ScrollView>
        </Container>
    );
}