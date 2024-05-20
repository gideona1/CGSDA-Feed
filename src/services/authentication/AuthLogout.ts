import {ApolloClient} from '@apollo/client';
import {storage} from '../../../App';
import {isLoggedInVar} from '../../config/defaults/cache';

export const AuthLogout = async (
  client: ApolloClient<object>,
  onCompleted?: () => void,
) => {
  // client.cache.evict({fieldName: 'me'});
  client.cache.gc();
  client.resetStore();

  // await client.clearStore();
  // await client.resetStore();

  // storage.delete('authToken');
  storage.delete('authRefreshToken');
  storage.delete('authAccessToken');
  storage.delete('userProfile');

  storage.clearAll();

  onCompleted ? onCompleted() : null;
  isLoggedInVar(false);
};
