// Libs
import React from 'react';

// Styles
import { Container, Notification, Quantity, Title } from './styles';

// Types
type Props = {
    title: string;
    color: string;
    notifications?: string | undefined;
}

// Renderer
export function BottomMenu({ title, color, notifications }: Props) {
    const noNotifications = notifications === '0';
    return (
        <Container>
            <Title color={color}>
                {title}
            </Title>
            {
                notifications && (
                    <Notification noNotification={noNotifications}>
                        <Quantity noNotification={noNotifications}>
                            {notifications}
                        </Quantity>
                    </Notification>
                )
            }
        </Container>
    );
}