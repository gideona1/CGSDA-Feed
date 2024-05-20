import React from 'react';
import { gql, useQuery } from '@apollo/client';
// import { AuthStack } from '../../navigation/AuthStack';
import { MainStack } from '../../navigation/MainStack';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { View } from 'react-native';
import { AuthStack } from '../../navigation/AuthStack';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <View style={{ flex: 1 }}>
      {data.isLoggedIn ? (
        <View
          style={{
            flex: 1,
          }}>
          <MainStack />
        </View>
      ) : null}
      {!data.isLoggedIn ? (
        <View
          style={{
            flex: 1,
          }}>
          <AuthStack />
        </View>
      ) : null}
    </View>
  );
};

export default IsLoggedIn;
