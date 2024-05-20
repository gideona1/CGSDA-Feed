/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  Appearance,
  StyleSheet,
} from 'react-native';

import { MMKV } from 'react-native-mmkv';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  split,
} from '@apollo/client';
import { DEFAULT_DARK_THEME } from './src/config/theme/Dark.theme';
import { DEFAULT_LIGHT_THEME } from './src/config/theme/Light.theme';
import SetTheme from './src/config/theme/SetTheme';
import Routes from './src/navigation/Routes';
import { ThemeProvider } from './src/config/theme/Theme.context';

import { setContext } from '@apollo/client/link/context';
import { cache } from './src/config/defaults/cache';
import { createUploadLink } from 'apollo-upload-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const storage = new MMKV();

// Initialize Apollo Client
const authLink = setContext((_, { headers }) => {
  const token = storage.getString('authAccessToken') || '';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Apollo-Require-Preflight': 'true'
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink.concat(
      createUploadLink({
        uri: 'http://localhost:8080/graphql',
      }),
    ),
  ]),
  cache: cache,
});

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <ThemeProvider
          initial={
            Appearance.getColorScheme() === 'dark'
              ? DEFAULT_DARK_THEME
              : DEFAULT_LIGHT_THEME
            // DEFAULT_LIGHT_THEME
          }>
          <SetTheme>
            <Routes />
          </SetTheme>
        </ThemeProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
