import { SafeAreaView, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { LKBackButton, LKBackButtonSingle, LKButton, LKContainer, LKInputField, LKText } from '../../components/General';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthLogin } from '../../services/authentication/AuthLoginUser';
import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenProp } from '../../navigation/props/AuthScreenProps';

const Login = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();

  const navigation = useNavigation<AuthScreenProp>();
  const client = useApolloClient();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);

  const { loginUser } = AuthLogin(
    username,
    password,
    client,
    token => {
      setLoadingCreation(false);
      navigation.navigate('Auth/Initial');
    },
    error => {
      Alert.alert('Error', error.message);
      setLoadingCreation(false);
    },
  );

  return (
    <SafeAreaView style={defaultStyles.screen}>
      <LKBackButton customBorderColor={theme.color.bgColor}>Back</LKBackButton>
      <ScrollView>
        <LKContainer>
          <LKText
            weight="bold"
            color={theme.color.accentP}
            size={24}>
            Back to gossip?
          </LKText>
          <LKText weight={"medium"} style={[defaultStyles.lowOpacity, { marginTop: 6 }]}>
            Let's get back to sharing your CGSDA drama by logging in.
          </LKText>
        </LKContainer>

        <LKContainer>
          <LKInputField
            placeholder='maameama'
            label="Username"
            onChangeText={text => setUsername(text)}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="username"
          />
          <LKInputField
            onSubmitEditing={() => {
              setLoadingCreation(true);
              loginUser();
            }}
            returnKeyType="go"
            onChangeText={text => setPassword(text)}
            label="Password"
            secureTextEntry />
        </LKContainer>

        <LKContainer>
          <LKButton
            background={theme.color.accentP}
            weight='bold'
            color='#fff'
            icon={faArrowRight}
            disabled={
              username == '' || password == '' || loadingCreation
            }
            loading={loadingCreation}
            onPress={() => {
              setLoadingCreation(true);
              loginUser();
            }}
          >Log in</LKButton>
        </LKContainer>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Login