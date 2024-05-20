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

const LOGIN = gql`
  mutation LoginUser($password: String!, $username: String) {
    loginUser(password: $password, username: $username) {
      accessToken
      refreshToken
    }
  }
`;

export const AuthLogin = (
  username: string,
  password: string,
  client: any,
  onFinishLoad?: (data: Tokens) => void,
  onError?: (error: Error) => void,
) => {
  const [loginUser, {error}] = useMutation<{
    loginUser: Tokens;
  }>(LOGIN, {
    variables: {username, password},
    onCompleted: async data => {
      try {
        // Reset Store
        client.resetStore();

        storage.set('authAccessToken', data.loginUser.accessToken);
        storage.set('authRefreshToken', data.loginUser.refreshToken);
        console.log(
          storage.getString('authAccessToken'),
          storage.getString('authRefreshToken'),
        );
        isLoggedInVar(true);
        onFinishLoad ? onFinishLoad(data.loginUser) : null;
      } catch (error: any) {
        onError ? onError(error) : null;
      }
    },
    onError: error => (onError ? onError(error) : null),
  });

  return {error, loginUser};
};
