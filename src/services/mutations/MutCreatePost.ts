import {gql, useMutation} from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
    }
  }
`;

export const MutCreatePost = (
  content?: string,
  onFinishLoad?: () => void,
  onError?: (error: Error) => void,
) => {
  const [createPost, {error, data}] = useMutation(CREATE_POST, {
    variables: {content},
    onCompleted: () => (onFinishLoad ? onFinishLoad() : null),
    onError: error => (onError ? onError(error) : null),
  });

  return {error, data, createPost};
};
