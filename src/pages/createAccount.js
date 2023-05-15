import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";
const image = {uri: 'https://i.pinimg.com/564x/ca/f8/9e/caf89ec7174e6533afd8ee7b5acd8a7c.jpg'};

const CreateAccount = () => {
   const navigation = useNavigation(); 

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [password, setPassword  ] = useState('')

  const handleLogin = () => {
    if (!email || !password) alert('Email or Password Incorrect')
    else navigation.navigate('main')

  }
  
      return (
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1,
          justifyContent: 'center'}}>

        <View style={styles.container}>
          <TextInput
          style = {styles.input}
          placeholder = 'Nome'
          placeholderTextColor={'#e6e381'}
          value= {name}
          onChangeText={setName}
          />
           <TextInput
          style = {styles.input}
          placeholder = 'Fone'
          placeholderTextColor={'#e6e381'}
          secureTextEntry={true}
          value= {phone}
          onChangeText={setPhone}
          />
           <TextInput
          style = {styles.input}
          placeholder = 'CPF'
          placeholderTextColor={'#e6e381'}
          secureTextEntry={true}
          value= {document}
          onChangeText={setDocument}
          />
          <TextInput
          style = {styles.input}
          placeholder = 'E-mail'
          placeholderTextColor={'#e6e381'}
          value= {email}
          onChangeText={setEmail}
          />
          <TextInput
          style = {styles.input}
          placeholderTextColor={'#e6e381'}
          placeholder = 'Curso'
          value= {course}
          onChangeText={setCourse}
          />
           <TextInput
          style = {styles.input}
          placeholderTextColor={'#e6e381'}
          placeholder = 'Password'
          secureTextEntry={true}
          value= {password}
          onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
      </View>
          </ImageBackground>
      )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth: 2,
    borderColor: '#ccc',
    color: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#82db1b',
    borderRadius: 5,
    padding: 10,
    width:'80%',
    alignItems: 'center'
  },
  buttonText:{
    color: 'lack',
    fontWeight: 'bold'
  }
})

export default CreateAccount;