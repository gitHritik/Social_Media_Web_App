import Post from './Post';
import { makeRequest } from './../axios';
import { useQuery } from '@tanstack/react-query'

const Posts = ({ userId }) => {
  //react query
  console.log(userId)
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest().get(`/posts?userId=${userId}`).then((res) => {
        return res.data;
      }),
  })


  return <div className="flex flex-col gap-[50px]">
    {error ? "Something went wrong" : isPending ? "loading" :
      data.map((post) => <Post post={post} key={post.id} />)}
  </div>;
};

export default Posts;