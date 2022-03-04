// Libs
import React from 'react';

// Styles
import { Image, Placeholder, PlaceholderTitle } from './styles';

// Types
type Props = {
    uri?: string | null;
}

// Renderer
export function Photo({ uri }: Props) {
    return (
        uri ?
            <Image source={{ uri }} />
            :
            <Placeholder>
                <PlaceholderTitle>
                    Nenhuma foto{'\n'} carregada
                </PlaceholderTitle>
            </Placeholder>
    )
}