import React, { Component } from 'react';
import api from '../services/api';
import { Container, Header, Avatarperfil, Nameperfil, Bioperfil, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';
import { ImageBackground } from 'react-native';
const image = {uri: 'https://i.pinimg.com/originals/30/88/80/308880d6b87c33b9452fa064a332b359.jpg'}
export default class Caracter extends Component {
    // state = {
    //     caracter: [],
    // };

    async componentDidMount(id) {
        const { route } = this.props;
        const { caracterId }  = route.params;
        const response = await api.get(`/caracter/${caracterId}`);

        this.setState({ caracter: response.data });
    }

    render() {
        const { route } = this.props;
        const { caracter } = route.params;
        //const { caracter } = this.state;

        return (
            <Container>
                <ImageBackground source={image} resizeMode="cover" style={{flex: 1,
                justifyContent: 'center'}}>

                <Header>
                    <Avatarperfil source={{ uri: caracter.avatar }} />
                    <Nameperfil>{caracter.name}</Nameperfil>
                    <Bioperfil>{caracter.gender}</Bioperfil>
                    <Bioperfil>{caracter.species}</Bioperfil>
                    <Bioperfil>{caracter.type}</Bioperfil>
                </Header>

                {/* <Stars
                    data={stars}
                    //keyExtractor={(star) => String(star.id)}
                    renderItem={({ item }) => (
                        <Starred>
                            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                />   */}
                </ImageBackground>
            </Container>
        );
    }
}