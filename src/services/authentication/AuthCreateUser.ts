import {
  ApolloClient,
  ApolloError,
  gql,
  useApolloClient,
  useMutation,
} from '@apollo/client';
import {storage} from '../../../App';

import {isLoggedInVar} from '../../config/defaults/cache';
import {Tokens} from '../../types';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $name: String!, $password: String!) {
    createUser(username: $username, name: $name, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const AuthCreateUser = (
  username: string,
  name: string,
  password: string,
  client: any,
  onFinishLoad?: (data: Tokens) => void,
  onError?: (error: Error) => void,
) => {
  const [createUser, {error}] = useMutation<{
    createUser: Tokens;
  }>(CREATE_USER, {
    variables: {username, name, password},
    onCompleted: async data => {
      try {
        // Reset Store
        client.resetStore();

        storage.set('authAccessToken', data.createUser.accessToken);
        storage.set('authRefreshToken', data.createUser.refreshToken);
        console.log(
          storage.getString('authAccessToken'),
          storage.getString('authRefreshToken'),
        );
        isLoggedInVar(true);
        onFinishLoad ? onFinishLoad(data.createUser) : null;
      } catch (error: any) {
        console.log('Here error: ', error);
        onError ? onError(error) : null;
      }
    },
    onError: error => (onError ? onError(error) : null),
  });

  return {error, createUser};
};
