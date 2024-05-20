import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native';
import React, { useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { LKTopHeader } from '../../components/General/LKTopHeader/LKTopHeader';
import { LKButton, LKContainer, LKText } from '../../components/General';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faDownload, faPenToSquare, faRetweet, faRightFromBracket, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { TTPost } from '../../components/Home';
import { QueryPosts, QueryUserProfile } from '../../services/queries';
import { useSharedValue } from 'react-native-reanimated';
import { useApolloClient } from '@apollo/client';
import { AuthLogout } from '../../services/authentication';

const Profile = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();
  const scrollPosition = useSharedValue<number>(0);
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { data, error, loading, refetch } = QueryUserProfile(
    (error) => {
      Alert.alert('Cannot get posts. Sorry I guess', error.message);
      setRefreshing(false);
    },
    () => {
      setRefreshing(false);
    }
  );

  return (
    <SafeAreaView style={defaultStyles.screen}>
      <LKTopHeader
        currentScrollViewPosition={scrollPosition}
        toggleHeaderPosition={20}
      >
        {data?.getUser.username}
      </LKTopHeader>

      <ScrollView
        onScroll={event => {
          scrollPosition.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={160}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            refetch();
          }} />
        }
        style={{ flex: 1 }}>
        <LKContainer>
          <LKText weight={"bold"} size={20}>{data?.getUser.name}</LKText>
          <LKText style={defaultStyles.lowOpacity} size={14}>{data?.getUser.username}</LKText>
          <LKButton onPress={() => AuthLogout(client)} weight='bold' icon={faRightFromBracket} style={{ marginTop: theme.spacing.base }}>Log out</LKButton>
        </LKContainer>

        <LKContainer>
          <LKText preset='subheading' size={14}>Your Posts</LKText>
          <FlatList
            data={data?.getUser.posts}
            renderItem={({ item }) => <TTPost post={item} refetch={refetch} />}
            ListEmptyComponent={(
              <LKText weight="bold" style={[{ textAlign: 'center', marginTop: theme.spacing.base, opacity: 0.5 }]}>Welp...</LKText>
            )}
          />
        </LKContainer>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Profile