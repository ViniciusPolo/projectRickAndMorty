import React, { Component } from 'react';
import api from '../services/api';
import { Container, Header, Avatarperfil, Nameperfil, Bioperfil } from './styles';
import { ImageBackground } from 'react-native';
const image = {uri: 'https://i.pinimg.com/originals/30/88/80/308880d6b87c33b9452fa064a332b359.jpg'}

export default class Caracter extends Component {
    
    render() {
        const { route } = this.props;
        const { caracter } = route.params;

        return (
            <Container>
                <ImageBackground source={image} resizeMode="cover" style={{flex: 1,
                justifyContent: 'center'}}>

                <Header>
                    <Nameperfil>{caracter.name}</Nameperfil>
                    <Bioperfil>{caracter.species} - {caracter.status}</Bioperfil>
                    <Bioperfil>Location: {caracter.location}</Bioperfil>
                    <Bioperfil>Episode: {caracter.episode}</Bioperfil>
                    <Avatarperfil source={{ uri: caracter.avatar }} />
                </Header>
                <Header></Header>
                </ImageBackground>
            </Container>
        );
    }
}