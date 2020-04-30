import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MockAdapter from 'axios-mock-adapter';
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

describe('Main', () => {
  it('shoud be able to add new user git', async () => {
    const { getByText, getByTestId, debug, unmount } = render(<Main />);
    fireEvent.changeText(getByTestId('main-input-add-user'), 'gitlogin');
    // debug();
    fireEvent.press(getByTestId('main-button-add-user'));
    apiMock.onGet('users/gitlogin').reply(200, {
      login: 'gitlogin',
      avatar: 'https://avatar',
      name: 'Git Name',
      bio: 'Git Bio ...',
    });
    // debug();

    process.nextTick(() => {
      debug();
      expect(getByTestId('main-input-add-user')).toHaveProp('value', '');
      expect(getByTestId('main-button-add-user')).toHaveProp('loading', false);
      // unmount();
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
    process.nextTick(() => {
      // debug();
      expect(getByText('Git Name')).toBeTruthy();
    });

    // await waitForElement(() => debug());
    // const a = await AsyncStorage.getItem('users');

    // console.log(a);

    // debug();
  });
});
