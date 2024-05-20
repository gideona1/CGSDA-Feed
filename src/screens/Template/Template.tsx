import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';

const Template = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();


  return (
    <SafeAreaView style={defaultStyles.screen}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: 'white' }}>Prince is a fag</Text>
      </View>
    </SafeAreaView>
  );
});

export default Template