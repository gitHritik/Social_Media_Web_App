import Post from './Post';
import { makeRequest } from './../axios';
import { useQuery } from '@tanstack/react-query'

const Posts = () => {
  //react query
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      makeRequest().get('/posts').then((res) => {
        return res.data;
      }),
  })


  return <div className="flex flex-col gap-[50px]">
    {error ? "Something went wrong" : isPending ? "loading" :
      data.map(post => (
        <Post post={post} key={post.id} />
      ))}
  </div>;
};

export default Posts;