import { SafeAreaView, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { LKBackButton, LKBackButtonSingle, LKButton, LKContainer, LKInputField, LKText } from '../../components/General';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useApolloClient } from '@apollo/client';
import { AuthCreateUser } from '../../services/authentication';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenProp } from '../../navigation/props/AuthScreenProps';

const Signup = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();

  const navigation = useNavigation<AuthScreenProp>();
  const client = useApolloClient();

  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);

  const { createUser } = AuthCreateUser(
    username,
    name,
    password,
    client,
    token => {
      setLoadingCreation(false);
      navigation.navigate('Auth/Initial');
    },
    error => {
      Alert.alert("Wait a minute...something ain't right.", error.message);
      setLoadingCreation(false);
    },
  )


  return (
    <SafeAreaView style={defaultStyles.screen}>
      <LKBackButton customBorderColor={theme.color.bgColor}>Back</LKBackButton>
      <ScrollView>
        <LKContainer>
          <LKText
            weight="bold"
            color={theme.color.accentP}
            size={24}>
            Welcome to the gossip
          </LKText>
          <LKText weight={"medium"} style={[defaultStyles.lowOpacity, { marginTop: 6 }]}>
            Let's hear all about it.
          </LKText>
        </LKContainer>

        <LKContainer>
          <LKInputField
            placeholder='joemensah'
            label='Username'
            onChangeText={text => setUsername(text)}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect={true}
            textContentType="username"
          />
          <LKInputField
            placeholder='Uncle Joe. Mensah'
            onChangeText={text => setName(text)}
            label='Name'
            spellCheck={false}
            textContentType='name'
          />
          <LKInputField
            onSubmitEditing={() => {
              setLoadingCreation(true);
              createUser();
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
            disabled={
              username == '' || password == '' || name == '' || loadingCreation
            }
            icon={faArrowRight}
            loading={loadingCreation}
            onPress={() => {
              setLoadingCreation(true);
              createUser();
            }}
          >Sign up</LKButton>
        </LKContainer>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Signup