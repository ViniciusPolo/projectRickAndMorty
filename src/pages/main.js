import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, ImageBackground, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
const image = {uri: 'https://i.pinimg.com/564x/ca/f8/9e/caf89ec7174e6533afd8ee7b5acd8a7c.jpg'};
import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles';

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

  componentDidUpdate(_, prevState) {
    const { cards } = this.state;

    if (prevState.cards !== cards) {
      AsyncStorage.setItem('cards', JSON.stringify(cards));
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

    const response = await api.get(`https://rickandmortyapi.com/api/character/?name=${newCard}`);
    for (let i = 0; i <= response.data.info.count; i++){
      if (!response.data.results[i]?.name && response.data.info.next){
        //response = await api.get(response.data.info.next);
        //console.log('entrou', response.data.info)
        continue
      } 
      const data = {
        id: response.data.results[i].id,
        name: response.data.results[i].name,
        species: response.data.results[i].species,
        gender: response.data.results[i].gender,
        avatar: response.data.results[i].image,
        type: response.data.results[i].type,
        episode: response.data.results[i].episode
      };
      cards.push(data)
    }
    //const response = await api.get(`api/character/?name=${newCard}`);
    // const data = {
    //   name: name,
    //   species: response.data.species,
    //   gender: response.data.gender,
    //   avatar: img,
    //   type: response.data.type,
    //   episode: response.data.episode
    // };

    this.setState({
      cards: cards,
      newCard: '',
      loading: false,
    });

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
              <Bio>{item.species}</Bio>
              <Bio>{item.gender}</Bio>
              <Bio>{item.type}</Bio>
              </View>
              </View>

              <ProfileButton onPress={() => {
                this.props.navigation.navigate('caracter', {caracter: item});
              }}>
                <ProfileButtonText>Mostra esse inútil</ProfileButtonText>
              </ProfileButton>

              <ProfileButton onPress={() => { 
                this.removeCard(cards.indexOf(item))
              }}
              style={{backgroundColor: '#e6e381'}}
              >
                <ProfileButtonText>Desintegre Isso</ProfileButtonText>
              </ProfileButton>


            </User>
          )}
          />
          </ImageBackground>
      </Container>
    );
  }
}