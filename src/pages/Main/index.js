import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { Formik } from 'formik';

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
  TextError,
} from './styles';

const validationForm = Yup.object().shape({
  user: Yup.string().required('Campo obrigatório').min(3),
});

export default function Main() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  // const [user, setUser] = useState('');

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

  async function handleAddUser(values, { resetForm }) {
    setLoading(true);
    try {
      const response = await api.get(`users/${values.user}`);
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      setUsers([...users, data]);

      resetForm({});
    } catch (error) {
      Alert.alert(
        'Usuário Git',
        `Error: ${error}`,
        [{ text: 'OK', onPress: () => {} }],
        {
          cancelable: false,
        }
      );
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
      <Formik
        initialValues={{
          user: '',
        }}
        onSubmit={handleAddUser}
        validationSchema={validationForm}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <>
            <Form>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Adicionar usuário"
                value={values.user}
                onChangeText={handleChange('user')}
                returnKeyType="send"
                onSubmitEditing={handleAddUser}
                testID="main-input-add-user"
              />
              {errors.user && (
                <TextError testID="main-text-error-user">
                  {errors.user}
                </TextError>
              )}
              <SubmitButton
                testID="main-button-add-user"
                loading={loading}
                disabled={loading}
                onPress={handleSubmit}
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
          </>
        )}
      </Formik>

      <List
        testID="main-list-user"
        data={users}
        keyExtractor={(userItem) => userItem.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton
              testID="main-button-profile-user"
              onPress={() => handleNavigation(item)}
            >
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
