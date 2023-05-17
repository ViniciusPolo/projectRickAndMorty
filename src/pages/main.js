import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, ImageBackground, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
const image = {uri: 'https://i.pinimg.com/564x/f9/1b/2a/f91b2a49e67e3c1be9e71e822f9144a4.jpg'};
import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, Description, ProfileButton, ProfileButtonDelete, ProfileButtonText } from './styles';

export default class Main extends Component {

  state = {
    newCard: '',
    cards: [],
    loading: false,
  };

  async componentDidMount() {
    const cards = await AsyncStorage.getItem('cards');
    
    if (cards) {
      this.setState({ cards: JSON.parse(cards) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { cards } = this.state;

    if (prevState.cards !== cards) {
      await AsyncStorage.setItem('cards', JSON.stringify(cards));
    }
  }

  removeCard = async (id) => {
    const { cards } = this.state;
    cards.splice(id,1)
    this.setState({cards: cards})
  }

  handleAddCard = async () => {
    const { cards, newCard } = this.state;

    this.setState({ loading: true });

    try {
      const response = await api.get(`https://rickandmortyapi.com/api/character/?name=${newCard}`);
      this.setState({ loading: false });
      for (let i = 0; i <= response.data.info.count; i++){
        if (!response.data.results[i]?.name && response.data.info.next){
          //response = await api.get(response.data.info.next);
          //console.log('entrou', response.data.info)
          continue
        } 
        const episode = await api.get(response.data.results[i].episode[0]);
        const location = await api.get(response.data.results[i].location.url);
        const data = {
          id: response.data.results[i].id,
          name: response.data.results[i].name,
          species: response.data.results[i].species,
          avatar: response.data.results[i].image,
          status: response.data.results[i].status,
          episode: episode.data.name,
          location: location.data.name
        };
        cards.push(data)
      }
        
        this.setState({
          cards: cards,
          loading: false,
        });
  } catch (error) {
    this.setState({ loading: false });
  }

    Keyboard.dismiss();

  };

  

  render() {
    const { cards, newCard, loading } = this.state;

    return (
      <Container>
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1,
        justifyContent: 'center'}}>

        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Procure um esquisitão'
            value={newCard}
            onChangeText={text => this.setState({ newCard: text })}
            returnKeyType='send'
            onSubmitEditing={this.handleAddCard}
          />
          <SubmitButton loading={loading} onPress={this.handleAddCard}>
            {loading ? (<ActivityIndicator color='black' />) : (<Icon name='add' size={20} color='black' />)}
          </SubmitButton>
        </Form>
        <List
          showVerticalScrollIndicator={false}
          data={cards}
          keyExtractor={card => card.id}
          renderItem={( {item} ) => (
            <User>
                
              <View style={{flexDirection: "row"}}>
              <Avatar source={{ uri: item.avatar }} />
              <View style={{marginLeft: 10}}>
              <Name>{item.name}</Name>
              <Bio>{item.species} - {item.status}</Bio>
              <Description>Visto por último em:</Description>
              <Bio>{item.episode}</Bio>
              <Description>Apareceu primeiro no episódio:</Description>
              <Bio>{item.location}</Bio>
              </View>
              </View>

              <ProfileButton onPress={() => {
                this.props.navigation.navigate('caracter', {caracter: item});
              }}>
                <ProfileButtonText>Mostre para o Morty</ProfileButtonText>
              </ProfileButton>

              <ProfileButtonDelete onPress={() => { 
                this.removeCard(cards.indexOf(item))
              }}
              style={{backgroundColor: '#e6e381'}}
              >
                <ProfileButtonText><Icon name='delete' size={20} /></ProfileButtonText>
              </ProfileButtonDelete>


            </User>
          )}
          />
          </ImageBackground>
      </Container>
    );
  }
}