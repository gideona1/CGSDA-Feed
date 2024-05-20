import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native';
import React, { useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { LKTopHeader } from '../../components/General/LKTopHeader/LKTopHeader';
import { LKButton, LKContainer, LKText } from '../../components/General';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faDownload, faPenToSquare, faRetweet, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { TTPost } from '../../components/Home';
import { QueryPosts } from '../../services/queries';

const Home = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { data, error, loading, refetch } = QueryPosts(
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
      <LKTopHeader>
        CGSDA Feed
      </LKTopHeader>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            refetch();
          }} />
        }
        style={{ flex: 1 }}>
        <LKContainer>
          <LKText style={{ marginBottom: theme.spacing.separator }} weight={"bold"} size={20}>The gossip...</LKText>

          <FlatList
            data={data?.getPosts}
            ListEmptyComponent={(
              <LKText weight="bold" style={[{ textAlign: 'center', marginTop: theme.spacing.base, opacity: 0.5 }]}>Welp...</LKText>
            )}
            renderItem={({ item }) => <TTPost refetch={refetch} post={item} />}
          />
        </LKContainer>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Home