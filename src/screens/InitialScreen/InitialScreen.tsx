import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { LKButton, LKContainer, LKText } from '../../components/General';
import { faArrowRight, faPersonHarassing } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenProp } from '../../navigation/props/AuthScreenProps';

const InitialScreen = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();
  const navigation = useNavigation<AuthScreenProp>();


  return (
    <SafeAreaView style={[defaultStyles.screen, { backgroundColor: theme.color.accentP }]}>
      <LKContainer style={[defaultStyles.center, { flex: 1 }]}>
        <LKText weight="bold" color="#ffffff" style={{ marginBottom: theme.spacing.separator }} size={24}>CGSDA Feed</LKText>
        <LKText weight="bold" color="#ffffff" style={{ textAlign: 'center' }} size={14}>Twitter, but for the CGSDA gossip.</LKText>
        <LKButton onPress={() => navigation.navigate('Auth/Login')} background='#ffffff' color={theme.color.accentP} style={{ marginBottom: 0 }} containerStyle={{ width: '100%', marginTop: theme.spacing.double, marginBottom: 0 }} weight="bold" icon={faArrowRight}>Log in</LKButton>
        <LKButton onPress={() => navigation.navigate('Auth/Signup')} background='transparent' color={'#ffffff'} containerStyle={{ width: '100%', marginTop: 0 }} weight="bold" icon={faArrowRight}>I am new to the gossip</LKButton>
      </LKContainer>

      <FontAwesomeIcon icon={faPersonHarassing} color={"#ffffff"} style={{ position: 'absolute', bottom: 40, zIndex: -1, opacity: 0.5 }} size={325} />
    </SafeAreaView>
  );
});

export default InitialScreen