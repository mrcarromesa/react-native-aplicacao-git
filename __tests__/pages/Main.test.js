import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MockAdapter from 'axios-mock-adapter';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';
import Main from '~/pages/Main';
/*
jest.mock('react-native-gesture-handler', () => {
  const { Button } = require('react-native');
  const RectButton = (props) => {
    return <Button {...props} />;
  };
  RectButton.displayName = 'TouchableOpacity';

  return RectButton;
}); */

const apiMock = new MockAdapter(api);

// https://github.com/testing-library/native-testing-library/issues/113#issuecomment-607796505
jest.mock('react-native-gesture-handler', () => ({
  RectButton: (props) => {
    const { Button } = require('react-native');
    return <Button {...props} />;
  },
}));

// jest.useFakeTimers();

jest.useFakeTimers();

beforeEach(() => {
  cleanup();
  // console.log('clear');
});

jest.mock('@react-navigation/native');

describe('Main', () => {
  it('should alert error', async () => {
    Alert.alert = jest.fn().mockReturnValue('OK');
    // alert
    const user = 'gitlogin';
    const { getByText, getByTestId, debug, unmount } = render(<Main />);
    fireEvent.changeText(getByTestId('main-input-add-user'), user);
    // debug();
    fireEvent.press(getByTestId('main-button-add-user'));
    apiMock.onGet(`users/${user}`).reply(500);
    // debug();

    await wait(() => {
      process.nextTick(() => {
        expect(Alert.alert).toHaveBeenCalled();
        // unmount();
      });
    });
  });

  it('should be able validate', async () => {
    const { getByTestId } = render(<Main />);
    fireEvent.press(getByTestId('main-button-add-user'));

    await wait(() => {
      process.nextTick(() => {
        expect(getByTestId('main-text-error-user')).toBeTruthy();
      });
    });
  });

  it('shoud be able to add new user git', async () => {
    const user = 'gitlogin';
    const { getByText, getByTestId, debug, unmount } = render(<Main />);
    fireEvent.changeText(getByTestId('main-input-add-user'), user);
    // debug();
    fireEvent.press(getByTestId('main-button-add-user'));
    apiMock.onGet(`users/${user}`).reply(200, {
      avatar: 'https://avatar',
      avatar_url: 'https://avatar',
      bio: 'Git Bio ...',
      login: 'gitlogin',
      name: 'Git Name',
    });
    // debug();

    const navigation = {};
    navigation.navigate = jest.fn();

    useNavigation.mockReturnValue(navigation);

    await wait(() => {
      process.nextTick(() => {
        // debug();
        expect(getByTestId('main-input-add-user')).toHaveProp('value', '');
        expect(getByTestId('main-button-add-user')).toHaveProp(
          'loading',
          false
        );
        expect(getByTestId('main-button-profile-user')).toBeTruthy();
        fireEvent.press(getByTestId('main-button-profile-user'));
        console.log(navigation.navigate.mock.calls);
        expect(navigation.navigate).toHaveBeenCalled();
        // unmount();
      });
    });
  });

  it('shoud be able save async storage', async () => {
    /**
     *
     * keyExtractor={(userItem) => userItem.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

     *
     */

    const data = [
      {
        login: 'gitlogin',
        avatar: 'https://avatar',
        name: 'Git Name',
        bio: 'Git Bio ...',
      },
    ];

    // debug();
    await AsyncStorage.setItem('users', JSON.stringify(data));
    const { getByText, getByTestId, debug, unmount } = render(<Main />);

    // unmount();
    // ({ getByText, getByTestId, debug } = render(<Main />));
    // jest.runAllTimers();
    // debug();

    // https://github.com/facebook/react/issues/14769#issuecomment-461896777

    await wait(() => {
      process.nextTick(() => {
        // debug();
        expect(getByText('Git Name')).toBeTruthy();
      });
    });

    // await waitForElement(() => debug());
    // const a = await AsyncStorage.getItem('users');

    // console.log(a);

    // debug();
  });
});
