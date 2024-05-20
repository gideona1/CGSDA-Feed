import {gql, useMutation} from '@apollo/client';

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId)
  }
`;

export const MutLikePost = (
  postId: string | undefined,
  onFinishLoad?: () => void,
  onError?: (error: Error) => void,
) => {
  const [likePost, {error, data}] = useMutation(LIKE_POST, {
    variables: {postId},
    onCompleted: () => (onFinishLoad ? onFinishLoad() : null),
    onError: error => (onError ? onError(error) : null),
  });

  return {error, data, likePost};
};
