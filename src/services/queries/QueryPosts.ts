import {useQuery, gql} from '@apollo/client';
import {Post} from '../../types';

export interface getPostsData {
  getPosts: Post[];
}

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
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
`;

export const QueryPosts = (
  onError?: (error: Error) => void,
  onComplete?: (data: getPostsData) => void,
) => {
  const {loading, data, error, refetch} = useQuery<getPostsData>(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
    onError: error => (onError ? onError(error) : null),
    onCompleted: data => {
      onComplete ? onComplete(data) : null;
    },
  });

  return {loading, data, error, refetch};
};
