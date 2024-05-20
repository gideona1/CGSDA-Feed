import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useThemeAwareObject } from '../../../hooks';
import { useTheme } from '../../../config/theme/Theme.context';
import { createDefaultStyles } from '../../../config/defaults/defaultStyles';
import { LKText } from '../../General';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpFromBracket, faRetweet, } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../../../config/theme/Theme.interface';
import React, { useState } from 'react';
import { Post } from '../../../types';
import { formatDateSince } from '../../../services/methods/FormatDateSince';
import { MutLikePost } from '../../../services/mutations';
import { ApolloQueryResult } from '@apollo/client';

export const TTPost: React.FC<{ post: Post, refetch?: (variables?: Partial<any>) => Promise<ApolloQueryResult<any>> }> = ({ post, refetch }) => {
    const createStyles = (theme: Theme) => {
        return StyleSheet.create({
            postContainer: {
                paddingVertical: theme.spacing.base,
                borderBottomWidth: 1,
                borderBottomColor: theme.color.olColor,
            },

            postAvatar: {
                width: 44,
                height: 44,
                backgroundColor: theme.color.olColor,
                borderRadius: 64,
            },

            postActionButton: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
        });
    };

    const Styles = useThemeAwareObject(createStyles);
    const defaultStyles = createDefaultStyles();
    const { theme } = useTheme();

    const [requestingLike, setRequestingLike] = useState<boolean>(false);
    const { likePost } = MutLikePost(
        post.id,
        () => {
            setRequestingLike(false);
            refetch ? refetch() : null;
        },
        (error) => {
            setRequestingLike(false);
            Alert.alert("Dang, we couldn't like that g.", error.message)
            refetch ? refetch() : null;
        }
    )

    return (
        <View style={Styles.postContainer}>
            <View style={[defaultStyles.rowStyle, { alignItems: 'flex-start' }]}>
                {/* Post Content */}
                <View style={[Styles.postAvatar, defaultStyles.center]}>
                    <LKText style={{ opacity: 0.6 }} size={18} weight="bold">{post.owner.name.slice(0, 2)}</LKText>
                </View>

                <View style={{ marginLeft: theme.spacing.separator, flex: 1 }}>
                    {/* Post Content */}
                    <View style={[defaultStyles.rowStyle, { flex: 1 }]}>
                        <LKText weight="bold" style={[{ flex: 1, }]}>{post.owner.name}</LKText>
                        <LKText weight="medium" style={defaultStyles.lowOpacity}>{formatDateSince(post.createdAt)}</LKText>
                    </View>

                    <View style={{ marginTop: 4 }}>
                        <LKText>{post.content}</LKText>
                    </View>

                    {/* Post Actions */}
                    <View style={[defaultStyles.rowStyle, defaultStyles.lowOpacity, { marginTop: 16 }]}>
                        <TouchableOpacity disabled={requestingLike} onPress={() => { setRequestingLike(true); likePost() }} style={Styles.postActionButton}>
                            {requestingLike ?
                                <ActivityIndicator size={14} /> :
                                <>
                                    <FontAwesomeIcon icon={post.isLiking ? faHeartFilled : faHeart} color={post.isLiking ? theme.color.accentP : theme.color.textColor} />
                                    <LKText style={{ marginLeft: 4 }} weight={post.isLiking ? 'bold' : undefined} color={post.isLiking ? theme.color.accentP : theme.color.textColor}>{post.likes.length}</LKText>
                                </>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.postActionButton}>
                            <FontAwesomeIcon icon={faRetweet} color={theme.color.textColor} />
                            <LKText style={{ marginLeft: 4 }}>0</LKText>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.postActionButton}>
                            <FontAwesomeIcon icon={faComment} color={theme.color.textColor} />
                            <LKText style={{ marginLeft: 4 }}>{post.comments.length}</LKText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Styles.postActionButton, { justifyContent: 'flex-end' }]}>
                            <FontAwesomeIcon size={14} icon={faArrowUpFromBracket} color={theme.color.textColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}