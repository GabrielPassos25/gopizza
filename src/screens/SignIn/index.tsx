// Libs
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { KeyboardAvoidingView, Platform } from 'react-native';

// Components
import { Input } from '../../components/Input';
import brandImg from '../../assets/brand.png';
import { useAuth } from '../../hooks/auth';

// Styles
import { Container, Content, Title, Brand, ForgotPasswordButton, ForgotPasswordLabel } from './styles';

// Renderer
export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLogging } = useAuth();
    function handleSignIn() {
        signIn(email, password);
    }
    return (
        <Container>
            {/* Android já sabe lidar com o padding do teclado */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Content>
                    <Brand source={brandImg} />
                    <Title>
                        Login
                    </Title>
                    <Input type="secondary" placeholder="E-mail" autoCorrect={false} autoCapitalize="none" onChangeText={setEmail} />
                    <Input type="secondary" placeholder="Senha" secureTextEntry onChangeText={setPassword} />
                    <ForgotPasswordButton>
                        <ForgotPasswordLabel>
                            Esqueci minha senha
                        </ForgotPasswordLabel>
                    </ForgotPasswordButton>
                    <Button title="Entrar" type="secondary" onPress={handleSignIn} isLoading={isLogging} />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}