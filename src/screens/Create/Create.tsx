import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { LKTopHeader } from '../../components/General/LKTopHeader/LKTopHeader';
import { LKBackButton, LKButton, LKContainer, LKInputField, LKText } from '../../components/General';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faArrowUpFromBracket, faDownload, faPenToSquare, faRetweet, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { TTPost } from '../../components/Home';
import { QueryPosts } from '../../services/queries';
import { MutCreatePost } from '../../services/mutations';
import { useNavigation } from '@react-navigation/native';

const Create = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();

  const navigation = useNavigation();
  const [content, setContent] = useState<string>('');
  const [posting, setPosting] = useState<boolean>(false);

  const { createPost } = MutCreatePost(
    content,
    () => {
      setPosting(false)
      navigation.goBack();
      Alert.alert('Good job, you posted 🤷🏾‍♂️.')
    },
    (error) => {
      setPosting(false)
      Alert.alert("We couldn't post that for some reason.", error.message);
    }
  )

  return (
    <SafeAreaView style={defaultStyles.screen}>
      <LKBackButton onPress={() => navigation.goBack()} modal header={"Create Post"}>
        Close
      </LKBackButton>

      <ScrollView style={{ flex: 1 }}>
        <LKContainer style={{ marginTop: 24, marginBottom: 0 }}>
          <View style={[defaultStyles.rowStyle]}>
            <FontAwesomeIcon icon={faPenToSquare} size={24} color={theme.color.accentP} style={{ opacity: 0.8 }} />
            <LKText weight={"bold"} style={{ marginLeft: theme.spacing.separator }} size={20}>Create a Post</LKText>
          </View>
          <LKInputField value={content} onChangeText={(text) => setContent(text)} multiline placeholder="What's going on?" label='' />

          <LKButton onPress={() => { createPost(); setPosting(true) }} loading={posting} icon={faArrowRight} weight='bold' color='#ffffff' background={theme.color.accentP}>Post</LKButton>
        </LKContainer>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Create