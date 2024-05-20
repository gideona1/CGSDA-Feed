import {useQuery, gql} from '@apollo/client';
import {storage} from '../../../App';
import {userProfile, userProfileState} from '../../config/defaults/cache';
import {UserProfileData} from '../../types';

export interface getUserData {
  getUser: UserProfileData;
}

export const GET_USER_PROFILE = gql`
  query GetUser {
    getUser {
      name
      username
      posts {
        isLiking
        id
        likes
        content
        comments {
          id
        }
        createdAt
        owner {
          id
          name
        }
      }
    }
  }
`;

export const QueryUserProfile = (
  onError?: (error: Error) => void,
  onComplete?: (data: getUserData) => void,
) => {
  const {loading, data, error, refetch} = useQuery<getUserData>(
    GET_USER_PROFILE,
    {
      notifyOnNetworkStatusChange: true,
      onError: error => (onError ? onError(error) : null),
      onCompleted: data => {
        onComplete ? onComplete(data) : null;
      },
    },
  );

  return {loading, data, error, refetch};
};
