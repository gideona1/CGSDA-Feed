import {InMemoryCache, Reference, makeVar} from '@apollo/client';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        userProfile: {
          read() {
            return userProfile();
          },
        },
      },
    },
  },
});

export const isLoggedInVar = makeVar(!!storage.getString('authAccessToken'));

export interface IUserProfile {
  avatar: string | undefined | null;
  name: string | undefined | null;
}
export const userProfile = makeVar<IUserProfile>({
  avatar: storage.getString('userProfileAvatar'),
  name: storage.getString('userProfileName'),
});

export const userProfileState = (
  avatar: string | undefined | null,
  name: string | undefined,
) => {
  console.log(avatar, name);
  // Update Local Stoarge
  avatar
    ? storage.set('userProfileAvatar', avatar)
    : storage.delete('userProfileAvatar');
  name
    ? storage.set('userProfileName', name)
    : storage.delete('userProfileName');

  console.log('Getting local');
  console.log({
    avatar: storage.getString('userProfileAvatar'),
    name: storage.getString('userProfileName'),
  });

  // Update State Management
  userProfile({
    avatar: storage.getString('userProfileAvatar') || null,
    name: storage.getString('userProfileName') || null,
  });
};
