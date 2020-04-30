import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    async function getStorage() {
      // console.log('users');
      const userStorage = await AsyncStorage.getItem('users');
      if (userStorage && userStorage !== 'null') {
        // console.log(JSON.parse(userStorage));
        setUsers(JSON.parse(userStorage));
      }
    }

    getStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
    // console.log('users called');
    // console.log(users);
  }, [users]);

  async function handleAddUser() {
    // console.log('aqui111');
    setLoading(true);
    try {
      const response = await api.get(`users/${user}`);
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      // console.log(data);
      setUsers([...users, data]);

      setUser('');
    } catch (error) {
      // console.tron.log(error);
    }

    setLoading(false);
    Keyboard.dismiss();
  }

  function handleNavigation(userItem) {
    navigation.navigate('User', { user: userItem });
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          onChangeText={(text) => setUser(text)}
          value={user}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
          testID="main-input-add-user"
        />
        <SubmitButton
          testID="main-button-add-user"
          loading={loading}
          disabled={loading}
          onPress={handleAddUser}
        >
          {loading ? (
            <ActivityIndicator
              testID="main-activity-indicator-user"
              color="#fff"
            />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>

      <List
        testID="main-list-user"
        data={users}
        keyExtractor={(userItem) => userItem.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => handleNavigation(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
